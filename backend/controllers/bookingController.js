const Bus = require("../models/Bus");
const Route = require("../models/Route");
const Booking = require("../models/Booking");
const User = require("../models/User");

const HOLD_DURATION_MS = 10 * 60 * 1000;

const getAvailability = async (req, res) => {
  try {
    const { from, to, date } = req.query;
    if (!from || !to || !date) {
      return res
        .status(400)
        .json({ message: "from, to, and date are required" });
    }

    const route = await Route.findOne({
      from: new RegExp(`^${from}$`, "i"),
      to: new RegExp(`^${to}$`, "i"),
    });
    if (!route)
      return res
        .status(404)
        .json({ message: "No route found for this from/to" });

    const [year, month, day] = date.split("-").map(Number);
    const startOfDay = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
    const endOfDay = new Date(Date.UTC(year, month - 1, day, 23, 59, 59, 999));

    const buses = await Bus.find({
      route: route._id,
      departureDate: { $gte: startOfDay, $lte: endOfDay },
    }).populate("route");

    const now = new Date();

    for (const bus of buses) {
      let changed = false;
      bus.seats.forEach((seat) => {
        if (seat.status === "held" && seat.heldUntil && seat.heldUntil < now) {
          seat.status = "available";
          seat.heldUntil = null;
          changed = true;
        }
      });
      if (changed) await bus.save();
    }

    const busesWithAvailability = buses.map((bus) => {
      const [hours, minutes] = bus.departureTime.split(":").map(Number);
      const departureDateTime = new Date(bus.departureDate);
      departureDateTime.setUTCHours(hours, minutes, 0, 0);

      return {
        ...bus.toObject(),
        isBookable: departureDateTime > now,
      };
    });

    res.json(busesWithAvailability);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createBooking = async (req, res) => {
  try {
    const { tripType, busId, travelDate, returnDate, seatNumbers, passenger } =
      req.body;

    if (
      !tripType ||
      !busId ||
      !travelDate ||
      !seatNumbers?.length ||
      !passenger
    ) {
      return res
        .status(400)
        .json({ message: "Missing required booking fields" });
    }

    const bus = await Bus.findById(busId).populate("route");
    if (!bus) return res.status(404).json({ message: "Bus not found" });

    const [hours, minutes] = bus.departureTime.split(":").map(Number);
    const departureDateTime = new Date(bus.departureDate);
    departureDateTime.setUTCHours(hours, minutes, 0, 0);

    if (departureDateTime <= new Date()) {
      return res.status(400).json({
        message: "This bus has already departed and can no longer be booked",
      });
    }

    const now = new Date();
    const unavailable = [];

    for (const seatNum of seatNumbers) {
      const seat = bus.seats.find((s) => s.seatNumber === seatNum);
      if (!seat) {
        unavailable.push(seatNum);
        continue;
      }
      const isHeldByOther =
        seat.status === "held" && seat.heldUntil && seat.heldUntil > now;
      if (seat.status === "booked" || isHeldByOther) unavailable.push(seatNum);
    }

    if (unavailable.length) {
      return res.status(409).json({
        message: "Some seats are no longer available",
        seats: unavailable,
      });
    }

    seatNumbers.forEach((seatNum) => {
      const seat = bus.seats.find((s) => s.seatNumber === seatNum);
      seat.status = "held";
      seat.heldUntil = new Date(Date.now() + HOLD_DURATION_MS);
    });
    await bus.save();

    const totalPrice = bus.price * seatNumbers.length;

    const booking = await Booking.create({
      tripType,
      route: bus.route._id,
      bus: bus._id,
      travelDate,
      returnDate: returnDate || null,
      seatNumbers,
      passenger,
      totalPrice,
      status: "pending",
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const confirmBooking = async (req, res) => {
  try {
    const { bookingId, paymentRef } = req.body;
    if (!bookingId || !paymentRef) {
      return res
        .status(400)
        .json({ message: "bookingId and paymentRef are required" });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    if (booking.status === "confirmed") {
      return res.status(400).json({ message: "Booking already confirmed" });
    }

    const verifyRes = await fetch(
      `https://api.paystack.co/transaction/verify/${paymentRef}`,
      {
        headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
      },
    );
    const verifyData = await verifyRes.json();

    if (!verifyData.status || verifyData.data.status !== "success") {
      return res.status(400).json({ message: "Payment could not be verified" });
    }

    // Extra safety: confirm the amount paid actually matches what we expected
    const expectedKobo = booking.totalPrice * 100;
    if (verifyData.data.amount !== expectedKobo) {
      return res.status(400).json({ message: "Payment amount mismatch" });
    }

    const bus = await Bus.findById(booking.bus);
    booking.seatNumbers.forEach((seatNum) => {
      const seat = bus.seats.find((s) => s.seatNumber === seatNum);
      if (seat) {
        seat.status = "booked";
        seat.heldUntil = null;
      }
    });
    await bus.save();

    booking.status = "confirmed";
    booking.paymentRef = paymentRef;
    await booking.save();

    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMyBookings = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const bookings = await Booking.find({ "passenger.email": user.email })
      .populate("route")
      .populate("bus")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAvailability,
  createBooking,
  confirmBooking,
  getMyBookings,
};
