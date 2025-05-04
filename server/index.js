import express from "express";
import connectDB from "./db/db.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
connectDB();

// middleware

const allowedOrigins = [
  "https://p1-stock-market-mern.vercel.app",
  /\.vercel\.app$/, // Allows all Vercel preview deployments
  "http://localhost:5173", // For local development
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    // Check if the origin matches any allowed pattern
    if (
      allowedOrigins.some((pattern) => {
        return typeof pattern === "string"
          ? origin === pattern
          : pattern.test(origin);
      })
    ) {
      return callback(null, true);
    }

    callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  optionsSuccessStatus: 200,
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
