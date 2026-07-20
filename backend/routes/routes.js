const express = require('express');
const router = express.Router();
const { getRoutes } = require('../controllers/routesController');

router.get('/', getRoutes);

module.exports = router;