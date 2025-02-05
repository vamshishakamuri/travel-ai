import { FaMapMarkerAlt, FaClock } from "react-icons/fa";

const ItineraryDisplay = ({ itinerary, response }) => {
    if (!itinerary.length) {
        return (
            <section className="max-w-4xl mx-auto mt-6 bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-xl font-semibold text-gray-800">Your AI-Generated Itinerary</h2>
                <p className="text-gray-700 mt-2">{response}</p>
            </section>
        );
    }

    return (
        <section className="max-w-4xl mx-auto mt-6 bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your AI-Generated Itinerary</h2>
            <div className="grid gap-4">
                {itinerary.map((day, index) => (
                    <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
                        <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                            <FaMapMarkerAlt className="text-gray-500 text-xl mr-2" />
                            Day {index + 1}: {day.title}
                        </h3>
                        <p className="text-gray-700 mt-2">{day.description}</p>
                        <p className="text-gray-600 mt-1">
                            <FaClock className="inline-block mr-2 text-gray-500" />
                            <strong>Time Commitment:</strong> {day.timeCommitment}
                        </p>
                        <a href={day.mapLink} target="_blank" rel="noopener noreferrer" className="inline-block mt-3 text-blue-500 hover:underline">
                            📍 View on Map
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ItineraryDisplay;
