const express = require('express');
const router = express.Router();
const { getRoutes, getCities } = require('../controllers/routesController');

router.get('/', getRoutes);
router.get('/cities', getCities);

module.exports = router;