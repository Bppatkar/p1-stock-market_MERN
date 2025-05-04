import express from "express";
const router = express.Router();
import {
  addToWatchlist,
  getStocks,
} from "./../controllers/stocks.controller.js";

router.route("/stocks").get(getStocks);
router.route("/watchlist").post(addToWatchlist);

export default router;
