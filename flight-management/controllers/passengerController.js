const Passenger = require("../models/Passenger");

exports.createPassenger = async (req, res, next) => {
  try {
    const passenger = await Passenger.create(req.body);
    res.status(201).json(passenger);
  } catch (err) { next(err); }
};

exports.getPassengers = async (req, res, next) => {
  try {
    const passengers = await Passenger.find();
    res.json(passengers);
  } catch (err) { next(err); }
};

exports.getPassengerById = async (req, res, next) => {
  try {
    const passenger = await Passenger.findById(req.params.id);
    if (!passenger) return res.status(404).json({ message: "Passenger not found" });
    res.json(passenger);
  } catch (err) { next(err); }
};

exports.updatePassenger = async (req, res, next) => {
  try {
    const passenger = await Passenger.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!passenger) return res.status(404).json({ message: "Passenger not found" });
    res.json(passenger);
  } catch (err) { next(err); }
};

exports.deletePassenger = async (req, res, next) => {
  try {
    const passenger = await Passenger.findByIdAndDelete(req.params.id);
    if (!passenger) return res.status(404).json({ message: "Passenger not found" });
    res.json({ message: "Passenger deleted successfully" });
  } catch (err) { next(err); }
};
