import express from "express";
import connectDB from "./db/db.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
connectDB();

// middleware

const corsOptions = {
  origin: process.env.FRONTEND_ORIGIN,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
import stocksRouter from "./routes/stocks.route.js";

app.use("/api/v1", stocksRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
