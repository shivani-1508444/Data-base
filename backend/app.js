const express = require("express");
const cors = require("cors");
const bookingRoutes = require("./routes/bookingRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/bookings", bookingRoutes);
app.use(errorHandler);

module.exports = app;
