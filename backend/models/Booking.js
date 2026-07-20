const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    tripType: {
      type: String,
      enum: ["one-way", "round-trip", "hire"],
      required: true,
    },
    route: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Route",
      required: true,
    },
    bus: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", required: true },
    
    travelDate: { type: Date, required: true },
    returnDate: { type: Date, default: null },
    seatNumbers: [{ type: String, required: true }],
    passenger: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
    },
    totalPrice: { type: Number, required: true },
    paymentRef: { type: String, default: null },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Booking", bookingSchema);
