import React from "react";

const MapComponent = ({ destination }) => {
    const mapUrl = `https://maps.googleapis.com/maps/api/js?sensor=false&callback=myMap&q=${destination}`;
    return (
        <section className="max-w-4xl mx-auto mt-6 bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Destination Map</h2>
            <iframe
                title="destination-map"
                width="100%"
                height="400"
                frameBorder="0"
                style={{ border: 0 }}
                src={mapUrl}
                allowFullScreen
            ></iframe>
        </section>
    );
};

export default MapComponent;
