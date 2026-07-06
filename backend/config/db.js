const mongoose = require("mongoose");
mongoose.set("bufferCommands", false); // ye line add karein — sabse upar


const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/bookingDB";
    await mongoose.connect(uri);
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
  }
};

module.exports = connectDB;
