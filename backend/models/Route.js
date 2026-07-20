const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  price: { type: Number, required: true },
  durationHours: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Route', routeSchema);