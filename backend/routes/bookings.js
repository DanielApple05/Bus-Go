const express = require('express');
const router = express.Router();
const {
  getAvailability,
  createBooking,
  confirmBooking,
  getMyBookings
} = require('../controllers/bookingController');
const authMiddleware = require('../middleware/auth');

router.get('/availability', getAvailability);
router.post('/booking', createBooking);
router.post('/confirm-booking', confirmBooking);
router.get('/bookings/mine', authMiddleware, getMyBookings);

module.exports = router;
