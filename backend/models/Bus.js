const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema(
  {
    seatNumber: { type: String, required: true },
    status: {
      type: String,
      enum: ["available", "held", "booked"],
      default: "available",
    },
    heldUntil: { type: Date, default: null },
  },
  { _id: false },
);

const busSchema = new mongoose.Schema(
  {
    route: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Route",
      required: true,
    },
    busType: {
      type: String,
      enum: ["standard", "luxury", "hire"],
      default: "standard",
    },
    departureDate: { type: Date, required: true },
    departureTime: { type: String, required: true }, // e.g. "08:00"
    totalSeats: { type: Number, default: 32 },
    seats: [seatSchema],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Bus", busSchema);
