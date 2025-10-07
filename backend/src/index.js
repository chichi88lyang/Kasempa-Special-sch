import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const reactBuildPath = path.join(__dirname, "../public");
app.use(express.static(reactBuildPath));

app.use("/api/auth", authRoutes);

// Catch-all route for React Router
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(reactBuildPath, "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
