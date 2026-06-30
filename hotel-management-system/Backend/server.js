const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api", bookingRoutes);
app.use(express.static(path.join(__dirname, "../Frontend")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
