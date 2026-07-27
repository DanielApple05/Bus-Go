const Route = require('../models/Route');

const getRoutes = async (req, res) => {
  try {
    const routes = await Route.find();
    res.json(routes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getCities = async (req, res) => {
  try {
    const routes = await Route.find();
    const cities = [...new Set(routes.flatMap((r) => [r.from, r.to]))].sort();
    res.json(cities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getRoutes, getCities };