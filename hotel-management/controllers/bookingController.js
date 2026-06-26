// controllers/bookingController.js
const Booking = require('../models/Booking');
const Room = require('../models/Room');
const { calculatePrice } = require('../utils/calculatePrice');

// helper: check date overlap
function isOverlap(aStart, aEnd, bStart, bEnd) {
  return (aStart < bEnd) && (bStart < aEnd);
}

exports.createBooking = async (req, res, next) => {
  try {
    const { customerName, customerEmail, room: roomId, checkIn, checkOut } = req.body;

    // 1) Validate room exists
    const room = await Room.findById(roomId);
    if (!room) {
      const e = new Error('Room not found');
      e.status = 404;
      return next(e);
    }

    // 2) Check overlapping bookings for the same room (simplified)
    const existing = await Booking.find({ room: roomId, status: { $ne: 'cancelled' }});
    const newCheckIn = new Date(checkIn);
    const newCheckOut = new Date(checkOut);

    for (const b of existing) {
      if (isOverlap(newCheckIn, newCheckOut, b.checkIn, b.checkOut)) {
        const e = new Error('Room already booked for these dates');
        e.status = 400;
        return next(e);
      }
    }

    // 3) Calculate price
    const totalPrice = calculatePrice(room.pricePerNight, checkIn, checkOut);

    const booking = await Booking.create({
      customerName, customerEmail, room: roomId, checkIn, checkOut, totalPrice
    });

    // Optional: mark room unavailable (very simplified)
    room.isAvailable = false;
    await room.save();

    res.status(201).json(booking);
  } catch (err) {
    next(err);
  }
};

exports.getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find().populate('room');
    res.json(bookings);
  } catch (err) {
    next(err);
  }
};

exports.getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('room');
    if (!booking) {
      const e = new Error('Booking not found');
      e.status = 404;
      return next(e);
    }
    res.json(booking);
  } catch (err) {
    next(err);
  }
};

exports.updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true });
    if (!booking) {
      const e = new Error('Booking not found');
      e.status = 404;
      return next(e);
    }

    // If checked_out or cancelled, set room available (simplified)
    if (['checked_out', 'cancelled'].includes(status)) {
      await Room.findByIdAndUpdate(booking.room, { isAvailable: true });
    }

    res.json(booking);
  } catch (err) {
    next(err);
  }
};

exports.cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      const e = new Error('Booking not found');
      e.status = 404;
      return next(e);
    }

    booking.status = 'cancelled';
    await booking.save();
    await Room.findByIdAndUpdate(booking.room, { isAvailable: true });

    res.json({ message: 'Booking cancelled', booking });
  } catch (err) {
    next(err);
  }
};
