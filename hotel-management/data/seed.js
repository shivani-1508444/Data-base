// data/seed.js
require('dotenv').config();
const connectDB = require('../config/db');
const Room = require('../models/Room');

(async () => {
  try {
    await connectDB();
    await Room.deleteMany({});
    const rooms = [
      { roomNumber: 101, type: 'single', pricePerNight: 2000, features: ['AC', 'TV'] },
      { roomNumber: 102, type: 'double', pricePerNight: 3500, features: ['AC', 'TV', 'Balcony'] },
      { roomNumber: 201, type: 'deluxe', pricePerNight: 6000, features: ['AC', 'TV', 'Mini Bar'] },
    ];
    await Room.insertMany(rooms);
    console.log('Seeded rooms');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
