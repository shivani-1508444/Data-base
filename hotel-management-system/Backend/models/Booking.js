const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  roomType: { type: String, required: true },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
