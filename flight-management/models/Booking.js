const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  passenger: { type: mongoose.Schema.Types.ObjectId, ref: "Passenger", required: true },
  flight: { type: mongoose.Schema.Types.ObjectId, ref: "Flight", required: true },
  seatNumber: String,
  bookingDate: { type: Date, default: Date.now },
  totalFare: { type: Number, required: true },
  status: { type: String, enum: ["booked", "checked_in", "completed", "cancelled"], default: "booked" }
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
