import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ExportPDFButton = () => {
  const exportToPDF = () => {
    const input = document.body;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("report.pdf");
    });
  };

  return (
    <button
      onClick={exportToPDF}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      📄 Export as PDF
    </button>
  );
};

export default ExportPDFButton;
