import React, { useEffect, useState } from "react";
import axios from "axios";

const Stocks = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const calculateGrowth = (currentPrice, previousPrice) => {
    if (!previousPrice || previousPrice === 0) return 0;
    return ((currentPrice - previousPrice) / previousPrice) * 100;
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/stocks`
      );
      setStocks(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching stocks:", error);
      setError(
        error.response?.data?.message ||
          "Error fetching stocks. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div
        className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
        role="alert"
      >
        <p className="font-bold">Error</p>
        <p>{error}</p>
        <button
          onClick={fetchData}
          className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm"
        >
          Retry
        </button>
      </div>
    );

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6 p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Stock Market Analysis
        </h1>
        <p className="text-gray-600">
          Real-time stock performance and growth metrics
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Symbol
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Company
                </th>
                <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">
                  Initial
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">
                  2002
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">
                  2007
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">
                  Growth
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stocks.map((stock) => {
                const companyName = stock.company;
                const description = stock.description || stock.desciption;
                const price2002 = stock.price_2002 || stock.price_2013 || 0;
                const price2007 = stock.price_2007 || stock.price_2025 || 0;
                const growth = calculateGrowth(price2007, price2002);

                return (
                  <tr
                    key={stock._id}
                    className="hover:bg-blue-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-900">
                      {stock.symbol || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {companyName}
                      </div>
                      <div className="md:hidden text-sm text-gray-500 truncate max-w-xs">
                        {description}
                      </div>
                    </td>
                    <td className="hidden md:table-cell px-6 py-4 whitespace-normal text-sm text-gray-500 max-w-xs">
                      {description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      ${stock.initial_price?.toFixed(2) || "0.00"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      ${price2002?.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      ${price2007?.toFixed(2)}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-right text-sm font-bold ${
                        growth >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {growth.toFixed(2)}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Stocks;
