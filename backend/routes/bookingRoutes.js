const express = require("express");
const Booking = require("../models/Booking");

const router = express.Router();

// CREATE booking
router.post("/", async (req, res, next) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json(booking);
  } catch (error) {
    next(error);
  }
});


// GET bookings (filter + sort + pagination)
router.get("/", async (req, res, next) => {
  try {
    const { source, destination, page = 1 } = req.query;

    const filter = {};
    if (source) filter.source = source;
    if (destination) filter.destination = destination;

    const limit = 5;
    const skip = (page - 1) * limit;

    const bookings = await Booking.find(filter)
      .sort({ journeyDate: 1 })
      .skip(skip)
      .limit(limit);

    res.json(bookings);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
