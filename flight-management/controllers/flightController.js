const Flight = require("../models/Flight");

exports.createFlight = async (req, res, next) => {
  try {
    const flight = await Flight.create(req.body);
    res.status(201).json(flight);
  } catch (err) { next(err); }
};

exports.getFlights = async (req, res, next) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (err) { next(err); }
};

exports.getFlightById = async (req, res, next) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) return res.status(404).json({ message: "Flight not found" });
    res.json(flight);
  } catch (err) { next(err); }
};

exports.updateFlight = async (req, res, next) => {
  try {
    const flight = await Flight.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!flight) return res.status(404).json({ message: "Flight not found" });
    res.json(flight);
  } catch (err) { next(err); }
};

exports.deleteFlight = async (req, res, next) => {
  try {
    const flight = await Flight.findByIdAndDelete(req.params.id);
    if (!flight) return res.status(404).json({ message: "Flight not found" });
    res.json({ message: "Flight deleted successfully" });
  } catch (err) { next(err); }
};
