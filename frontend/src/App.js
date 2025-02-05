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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">AI-Powered Travel Planner</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <label className="block text-gray-700">Destination</label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Budget</label>
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="low">Low</option>
            <option value="mid-range">Mid-Range</option>
            <option value="luxury">Luxury</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Interests</label>
          <select
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="adventure">Adventure</option>
            <option value="culture">Culture</option>
            <option value="nature">Nature</option>
            <option value="food">Food</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Generating..." : "Get Itinerary"}
        </button>
      </form>
      {response && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
          <h2 className="text-2xl font-bold">Your AI-Generated Itinerary:</h2>
          <p className="mt-2">{response}</p>
        </div>
      )}
    </div>
  );
}

export default App;
