import { useState, useEffect } from "react";
import axios from "axios";
import { FaSun, FaMoon, FaDownload } from "react-icons/fa";
import { motion } from "framer-motion";
import ItineraryDisplay from "./ItineraryDisplay";
import MapComponent from "./MapComponent";
import PDFGenerator from "./PDFGenerator";

function App() {
  const [destination, setDestination] = useState("");
  const [budget, setBudget] = useState("mid-range");
  const [interests, setInterests] = useState("adventure");
  const [itinerary, setItinerary] = useState([]);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("theme", darkMode ? "light" : "dark");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data } = await axios.get("http://localhost:8000/recommend/", {
        params: { destination, budget, interests },
      });
      setItinerary(data.itinerary || []);
      setResponse(data.recommendation || "");
    } catch (error) {
      console.error("Error fetching recommendations", error);
      setError("Oops! Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
      <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
        <button
            onClick={toggleTheme}
            className="fixed top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700"
        >
          {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-500" />}
        </button>

        {/* Hero Section */}
        <header className="relative h-[60vh] bg-cover bg-center flex items-center justify-center text-white text-center" style={{ backgroundImage: "url('/hero-image.jpg')" }}>
          <div className="bg-black bg-opacity-50 p-8 rounded-lg animate-fade-in">
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-5xl font-bold">Discover Your Next Adventure</motion.h1>
            <p className="text-lg mt-2">Plan your dream trip with AI-powered recommendations</p>
          </div>
        </header>

        {/* Search Form */}
        <section className="max-w-4xl mx-auto mt-8 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Plan Your Trip</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input type="text" className="border p-3 rounded-lg w-full" placeholder="Enter Destination" value={destination} onChange={(e) => setDestination(e.target.value)} required />
            <select className="border p-3 rounded-lg w-full" value={budget} onChange={(e) => setBudget(e.target.value)}>
              <option value="low">💰 Budget</option>
              <option value="mid-range">💵 Mid-Range</option>
              <option value="luxury">💎 Luxury</option>
            </select>
            <select className="border p-3 rounded-lg w-full" value={interests} onChange={(e) => setInterests(e.target.value)}>
              <option value="adventure">⛰️ Adventure</option>
              <option value="culture">🏛️ Culture</option>
              <option value="nature">🌿 Nature</option>
              <option value="food">🍽️ Food</option>
            </select>
            <button type="submit" className="col-span-1 md:col-span-3 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center" disabled={loading}>
              {loading ? (
                  <span className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white mr-2"></div>
                Generating...
              </span>
              ) : (
                  "Get Itinerary"
              )}
            </button>
          </form>
        </section>

        {/* AI-Generated Itinerary */}
        {(itinerary.length > 0 || response) && (
            <ItineraryDisplay itinerary={itinerary} response={response} />
        )}

        {/* Map Display */}
        <MapComponent destination={destination} />

        {/* Featured Destinations */}
        <section className="max-w-6xl mx-auto mt-10">
          <h2 className="text-3xl font-semibold text-gray-800 text-center">Featured Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {[{ name: "Paris, France", img: "/destination-paris.jpg", desc: "City of Love and iconic landmarks" },
              { name: "Bali, Indonesia", img: "/destination-bali.jpg", desc: "Stunning beaches and cultural experiences" },
              { name: "New York, USA", img: "/destination-newyork.jpg", desc: "The city that never sleeps" },
            ].map((destination, index) => (
                <div key={index} className="relative rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition duration-300">
                  <img src={destination.img} alt={destination.name} className="w-full h-64 object-cover" />
                  <div className="absolute bottom-0 bg-black bg-opacity-50 w-full text-white p-3">
                    <h3 className="text-lg font-semibold">{destination.name}</h3>
                    <p className="text-sm">{destination.desc}</p>
                  </div>
                </div>
            ))}
          </div>
        </section>

        {/* Save Itinerary and Export */}
        {(itinerary.length > 0 || response) && (
            <div className="max-w-4xl mx-auto flex justify-between mt-4">
              <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center">
                <FaDownload className="mr-2" /> Save Itinerary
              </button>
              <PDFGenerator itinerary={itinerary} response={response} />
            </div>
        )}

        {/* Footer */}
        <footer className="mt-10 py-6 bg-gray-900 text-center text-white">
          <p>&copy; 2025 AI Travel Planner | Inspired by Expedia</p>
        </footer>
      </div>
  );
}

export default App;
