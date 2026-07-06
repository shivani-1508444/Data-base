const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    passengerName: {
      type: String,
      required: true,
      minlength: 3
    },
    age: {
      type: Number,
      required: true,
      min: 5
    },
    source: {
      type: String,
      required: true
    },
    destination: {
      type: String,
      required: true
    },
    journeyDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return value >= today;
        },
        message: "Journey date cannot be in the past"
      }
    },
    trainNumber: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
