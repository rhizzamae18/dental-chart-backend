import express, { Express } from "express";
import { config } from "dotenv";

config();

const app: Express = express();

const PORT = process.env.PORT || 5002;

app.use(express.json());

app.get("/", (req, res) => {
  res.json("Hello!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
