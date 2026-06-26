// routes/bookings.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/bookingController');

router.post('/', controller.createBooking);                // create booking
router.get('/', controller.getBookings);                   // list bookings
router.get('/:id', controller.getBookingById);             // get booking
router.patch('/:id/status', controller.updateBookingStatus); // change status
router.delete('/:id', controller.cancelBooking);           // cancel (soft)

module.exports = router;
