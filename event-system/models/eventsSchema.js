const mongoose = require("mongoose");

console.log("Model Connection:", mongoose.connection.readyState);

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  date: {
    type: Date,
    required: true
  },
  location: String
});

module.exports = mongoose.model("Event", eventSchema);