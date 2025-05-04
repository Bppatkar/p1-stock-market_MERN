import Stock from "../model/stock.schema.js";

const getStocks = async (req, res) => {
  try {
    const stocks = await Stock.find({});
    if (!stocks || stocks.length === 0) {
      // Check if stocks is null or an empty array
      return res.status(404).json({ message: "No stocks found" });
    }
    res.status(200).json(stocks);
  } catch (error) {
    console.log("Error in getStocks controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const addToWatchlist = async (req, res) => {
  try {
    const { symbol, company, description, initial_price, price_2013, price_2025 } = req.body;
    
    if (!symbol || !company || !description || !initial_price || !price_2013 || !price_2025) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const stock = await Stock.create({
      symbol,
      company,
      description,
      initial_price: parseFloat(initial_price),
      price_2013: parseFloat(price_2013),
      price_2025: parseFloat(price_2025)
    });

    res.status(201).json({ 
      message: "Stock added to watchlist", 
      stock 
    });
  } catch (error) {
    console.error("Error in addToWatchlist:", error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    
    if (error.code === 11000) {
      return res.status(400).json({ message: "Stock symbol already exists" });
    }
    
    res.status(500).json({ message: "Internal server error" });
  }
};
export { getStocks, addToWatchlist };
