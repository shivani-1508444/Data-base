const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const app = require("./app");


const PORT = process.env.PORT || 5000;
const connectDB = require("./config/db");
const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running http://localhost:${PORT}`);
  });
};

startServer();