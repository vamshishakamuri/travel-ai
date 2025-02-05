import React from "react";
import { jsPDF } from "jspdf";

const PDFGenerator = ({ itinerary }) => {
    const generatePDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("AI-Generated Travel Itinerary", 20, 20);
        let y = 30;
        itinerary.forEach((day, index) => {
            doc.setFontSize(14);
            doc.text(`Day ${index + 1}: ${day.title}`, 20, y);
            doc.setFontSize(12);
            doc.text(day.description, 20, y + 10);
            y += 20;
        });
        doc.save("itinerary.pdf");
    };

    return (
        <button
            onClick={generatePDF}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
        >
            Download PDF
        </button>
    );
};

export default PDFGenerator;
