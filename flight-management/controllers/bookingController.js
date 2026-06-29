const Booking = require("../models/Booking");
const Flight = require("../models/Flight");
const Passenger = require("../models/Passenger");
const { calculateFare } = require("../utils/calculateFare");

exports.createBooking = async (req, res, next) => {
  try {
    const { passengerId, flightId, seatClass, seatNumber } = req.body;

    const flight = await Flight.findById(flightId);
    const passenger = await Passenger.findById(passengerId);

    if (!flight || !passenger) {
      return res.status(404).json({ message: "Flight or Passenger not found" });
    }

    const totalFare = calculateFare(flight.baseFare, seatClass);

    const booking = await Booking.create({
      passenger: passengerId,
      flight: flightId,
      seatNumber,
      totalFare
    });

    res.status(201).json(booking);
  } catch (err) { next(err); }
};

exports.getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find().populate("passenger flight");
    res.json(bookings);
  } catch (err) { next(err); }
};

exports.getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("passenger flight");
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json(booking);
  } catch (err) { next(err); }
};

exports.updateBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json(booking);
  } catch (err) { next(err); }
};

exports.deleteBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json({ message: "Booking cancelled successfully" });
  } catch (err) { next(err); }
};
