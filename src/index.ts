import { config } from "dotenv";
config();

import express, { Express } from "express";
import cors from "cors";
import uploadRoutes from "./routes/upload.routes";

const app: Express = express();

const PORT = process.env.PORT || 5002;

// Enable CORS for frontend
app.use(cors({
  origin: "http://localhost:5173", // Frontend URL
  credentials: true
}));

app.use(express.json());

app.use("/api/upload", uploadRoutes);

app.get("/", (req, res) => {
  res.json("Hello!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
