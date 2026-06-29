require("dotenv").config();
const connectDB = require("../config/db");
const Flight = require("../models/Flight");

(async () => {
  try {
    await connectDB();

    // Purane flights delete karo
    await Flight.deleteMany({});

    // Sample flights insert karo
    const flights = [
      {
        flightNumber: "AI101",
        source: "Delhi",
        destination: "Mumbai",
        departureTime: new Date("2026-07-01T09:00:00"),
        arrivalTime: new Date("2026-07-01T11:00:00"),
        seatCapacity: 180,
        baseFare: 5000,
      },
      {
        flightNumber: "AI202",
        source: "Indore",
        destination: "Nagpur",
        departureTime: new Date("2026-07-02T14:00:00"),
        arrivalTime: new Date("2026-07-02T15:30:00"),
        seatCapacity: 150,
        baseFare: 3500,
      },
    ];

    await Flight.insertMany(flights);
    console.log("✅ Flights seeded successfully");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding flights:", err);
    process.exit(1);
  }
})();
