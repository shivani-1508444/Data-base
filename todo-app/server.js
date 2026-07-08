import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import logger from "./middleware/loggerMiddleware.js";
import errorHandler from "./middleware/errorMiddleware.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(logger);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);

// Serve Frontend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

app.use(errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running http://localhost:${PORT}`));
