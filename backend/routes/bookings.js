const express = require('express');
const router = express.Router();
const {
  getAvailability,
  createBooking,
  confirmBooking,
} = require('../controllers/bookingController');

router.get('/availability', getAvailability);
router.post('/booking', createBooking);
router.post('/confirm-booking', confirmBooking);

module.exports = router;
