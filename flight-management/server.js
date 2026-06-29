const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Routes import
const flightsRoute = require("./routes/flights");
const passengersRoute = require("./routes/passengers");
const bookingsRoute = require("./routes/bookings");

// Middlewares
const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Routes
app.use("/flights", flightsRoute);
app.use("/passengers", passengersRoute);
app.use("/bookings", bookingsRoute);

// Middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
