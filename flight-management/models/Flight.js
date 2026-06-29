const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
  flightNumber: { type: String, required: true, unique: true },
  source: { type: String, required: true },
  destination: { type: String, required: true },
  departureTime: { type: Date, required: true },
  arrivalTime: { type: Date, required: true },
  seatCapacity: { type: Number, required: true },
  baseFare: { type: Number, required: true },
  status: { type: String, enum: ["scheduled", "delayed", "cancelled"], default: "scheduled" }
}, { timestamps: true });

module.exports = mongoose.model("Flight", flightSchema);
