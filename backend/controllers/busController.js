const Bus = require('../models/Bus');

const getBuses = async (req, res) => {
  try {
    const buses = await Bus.find().populate('route');
    res.json(buses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getBuses };