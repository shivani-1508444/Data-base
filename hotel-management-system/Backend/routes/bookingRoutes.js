const express = require("express");
const Booking = require("../models/Booking");

const router = express.Router();

// GET all bookings
router.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE a booking
router.post("/bookings", async (req, res) => {
  const booking = new Booking({
    name: req.body.name,
    email: req.body.email,
    roomType: req.body.roomType,
    checkInDate: req.body.checkInDate,
    checkOutDate: req.body.checkOutDate,
  });

  try {
    const newBooking = await booking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE a booking
router.put("/bookings/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.name = req.body.name;
    booking.email = req.body.email;
    booking.roomType = req.body.roomType;
    booking.checkInDate = req.body.checkInDate;
    booking.checkOutDate = req.body.checkOutDate;

    const updatedBooking = await booking.save();
    res.json(updatedBooking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a booking
router.delete("/bookings/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    await booking.deleteOne();
    res.json({ message: "Booking deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
