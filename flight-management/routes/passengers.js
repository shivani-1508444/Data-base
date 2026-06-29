const express = require("express");
const router = express.Router();
const { createPassenger, getPassengers, getPassengerById, updatePassenger, deletePassenger } = require("../controllers/passengerController");

router.post("/", createPassenger);
router.get("/", getPassengers);
router.get("/:id", getPassengerById);
router.put("/:id", updatePassenger);
router.delete("/:id", deletePassenger);

module.exports = router;
