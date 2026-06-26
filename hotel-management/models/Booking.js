// models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  customerEmail: {
    type: String,
    required: true,
    match: /^\S+@\S+\.\S+$/
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  },
  checkIn: { type: Date, required: true },
  checkOut: {
    type: Date,
    required: true,
    validate: {
      validator: function(value) {
        // `this` is the document being saved
        return value > this.checkIn;
      },
      message: 'checkOut date must be after checkIn date'
    }
  },
  totalPrice: { type: Number, required: true, min: 0 },
  status: { type: String, enum: ['booked','checked_in','checked_out','cancelled'], default: 'booked' }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
