import { useState } from "react";
import axios from "axios";

function App() {
  const [destination, setDestination] = useState("");
  const [budget, setBudget] = useState("mid-range");
  const [interests, setInterests] = useState("adventure");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.get("http://localhost:8000/recommend/", {
        params: { destination, budget, interests },
      });
      setResponse(data.recommendation);
    } catch (error) {
      console.error("Error fetching recommendations", error);
    }
    setLoading(false);
  };

  return (
      <div className="min-h-screen bg-gray-100">
        {/* Hero Section */}
        <header className="relative h-[50vh] bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('/hero-image.jpg')" }}>
          <div className="bg-black bg-opacity-50 p-8 rounded-lg text-center text-white">
            <h1 className="text-5xl font-bold">Discover Your Next Adventure</h1>
            <p className="text-lg mt-2">Plan your dream trip with AI-powered recommendations</p>
          </div>
        </header>

        {/* Search Form */}
        <section className="max-w-4xl mx-auto mt-8 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Plan Your Trip</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
                type="text"
                className="border p-3 rounded-lg w-full"
                placeholder="Enter Destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                required
            />
            <select
                className="border p-3 rounded-lg w-full"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
            >
              <option value="low">Budget</option>
              <option value="mid-range">Mid-Range</option>
              <option value="luxury">Luxury</option>
            </select>
            <select
                className="border p-3 rounded-lg w-full"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
            >
              <option value="adventure">Adventure</option>
              <option value="culture">Culture</option>
              <option value="nature">Nature</option>
              <option value="food">Food</option>
            </select>
            <button
                type="submit"
                className="col-span-1 md:col-span-3 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                disabled={loading}
            >
              {loading ? "Generating..." : "Get Itinerary"}
            </button>
          </form>
        </section>

        {/* AI-Generated Itinerary */}
        {response && (
            <section className="max-w-4xl mx-auto mt-6 bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800">Your AI-Generated Itinerary</h2>
              <p className="text-gray-700 mt-2">{response}</p>
            </section>
        )}

        {/* Featured Destinations (Expedia-Like) */}
        <section className="max-w-6xl mx-auto mt-10">
          <h2 className="text-3xl font-semibold text-gray-800 text-center">Featured Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              <img src="/destination-paris.jpg" alt="Paris" className="w-full h-64 object-cover" />
              <div className="absolute bottom-0 bg-black bg-opacity-50 w-full text-white p-3">
                <h3 className="text-lg font-semibold">Paris, France</h3>
                <p className="text-sm">City of Love and iconic landmarks</p>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              <img src="/destination-bali.jpg" alt="Bali" className="w-full h-64 object-cover" />
              <div className="absolute bottom-0 bg-black bg-opacity-50 w-full text-white p-3">
                <h3 className="text-lg font-semibold">Bali, Indonesia</h3>
                <p className="text-sm">Stunning beaches and cultural experiences</p>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              <img src="/destination-newyork.jpg" alt="New York" className="w-full h-64 object-cover" />
              <div className="absolute bottom-0 bg-black bg-opacity-50 w-full text-white p-3">
                <h3 className="text-lg font-semibold">New York, USA</h3>
                <p className="text-sm">The city that never sleeps</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-10 py-6 bg-gray-900 text-center text-white">
          <p>&copy; 2025 AI Travel Planner | Inspired by Expedia</p>
        </footer>
      </div>
  );
}

export default App;
