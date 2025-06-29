// ExportPDFButton.jsx
import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ExportPDFButton = () => {
  const exportToPDF = () => {
    html2canvas(document.body).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("BudgetBloom_Reports.pdf");
    });
  };

  return (
    <button onClick={exportToPDF} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
      📄 Export as PDF
    </button>
  );
};

export default ExportPDFButton;
