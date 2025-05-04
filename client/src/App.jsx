import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Stocks from "./components/Stocks.jsx";
import AddToWatchlist from "./components/AddToWatchlist.jsx";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        <nav className="bg-gray-800 p-4 shadow-lg">
          <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <h1 className="text-xl font-bold text-white">Stock Tracker</h1>
            <div className="flex space-x-1 sm:space-x-4">
              <NavLink 
                to="/stocks" 
                className={({ isActive }) => 
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`
                }
              >
                Market Overview
              </NavLink>
              <NavLink 
                to="/watchlist"
                className={({ isActive }) => 
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`
                }
              >
                Add Stocks
              </NavLink>
            </div>
          </div>
        </nav>
        
        <main className="container mx-auto p-4 sm:p-6">
          <Routes>
            <Route path="/stocks" element={<Stocks />} />
            <Route path="/watchlist" element={<AddToWatchlist />} />
            <Route path="/" element={<Stocks />} />
          </Routes>
        </main>
        
        <footer className="bg-gray-800 text-white p-4 text-center text-sm fixed bottom-0 w-full">
          © {new Date().getFullYear()} Stock Tracker App
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;