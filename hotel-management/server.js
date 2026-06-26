// server.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const roomsRouter = require('./routes/rooms');
const bookingsRouter = require('./routes/bookings');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');

// ✅ Initialize Express app
const app = express();

// ✅ Connect to MongoDB
connectDB();

// ✅ Middleware for parsing JSON
app.use(express.json());

// ✅ Simple request logger (teaching middleware)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// ✅ API routes
app.use('/api/rooms', roomsRouter);
app.use('/api/bookings', bookingsRouter);

// ✅ Fallback and error middleware
app.use(notFound);
app.use(errorHandler);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
