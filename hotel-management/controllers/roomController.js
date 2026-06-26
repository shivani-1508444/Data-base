// controllers/roomController.js
const Room = require('../models/Room');

exports.createRoom = async (req, res, next) => {
  try {
    const room = await Room.create(req.body);
    res.status(201).json(room);
  } catch (err) {
    if (err.code === 11000) { // duplicate key
      err.status = 400;
      err.message = 'Room number already exists';
    }
    next(err);
  }
};

exports.getRooms = async (req, res, next) => {
  try {
    const { type, available } = req.query;
    const filter = {};
    if (type) filter.type = type;
    if (available !== undefined) filter.isAvailable = available === 'true';
    const rooms = await Room.find(filter);
    res.json(rooms);
  } catch (err) {
    next(err);
  }
};

exports.getRoomById = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      const e = new Error('Room not found');
      e.status = 404;
      return next(e);
    }
    res.json(room);
  } catch (err) {
    next(err);
  }
};

exports.updateRoom = async (req, res, next) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!room) {
      const e = new Error('Room not found');
      e.status = 404;
      return next(e);
    }
    res.json(room);
  } catch (err) {
    next(err);
  }
};

exports.deleteRoom = async (req, res, next) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) {
      const e = new Error('Room not found');
      e.status = 404;
      return next(e);
    }
    res.json({ message: 'Room deleted' });
  } catch (err) {
    next(err);
  }
};
