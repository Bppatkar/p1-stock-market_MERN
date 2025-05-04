import mongoose from "mongoose";

const stock_schema = mongoose.Schema(
  {
    symbol: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    initial_price: {
      type: Number,
      required: true,
      min: 0,
    },
    price_2013: {
      type: Number,
      required: true,
      min: 0,
    },
    price_2025: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

const Stock = mongoose.model("Stock", stock_schema);
export default Stock;
