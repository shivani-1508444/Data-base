const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true, unique: true },
  type: { type: String, enum: ['single', 'double', 'suite'], required: true },
  price: { type: Number, required: true, min: 0 },
  pricePerNight: { type: Number, required: true, min: 0 },
  features: { type: [String], default: [] },
  isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);
