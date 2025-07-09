import React, { useState, useEffect } from "react";
import {
  FaMoneyBillWave,
  FaWallet,
  FaChartPie,
  FaFilePdf,
  FaFileExcel,
  FaBullseye,
} from "react-icons/fa";
import CountUp from "react-countup";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import CurrencyToggle from "../userDashboard/currencyToggle";
import FilterBar from "../userDashboard/filterbar";

const SummaryCards = ({ incomedata, expenseData }) => {
  const [filterOption, setFilterOption] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currency, setCurrency] = useState("₹");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [goal, setGoal] = useState(20000);
  const [newGoal, setNewGoal] = useState(goal);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = Array.from(
    new Set([...incomedata, ...expenseData].map((d) => d.category).filter(Boolean))
  );
console.log("485" , categories)
  useEffect(() => {
    fetch("http://localhost:3201/api/goalsTracker")
      .then((res) => res.json())
      .then((data) => {
        if (data.goal) {
          setGoal(data.goal);
          setNewGoal(data.goal);
        }
      })
      .catch((err) => console.error("Failed to load goal:", err));
  }, []);

  const filterByDateAndCategory = (data) => {
    let filtered = [...data];
    if (filterOption === "month") {
      const now = new Date();
      filtered = filtered.filter((item) => {
        const date = new Date(item.date);
        return (
          date.getMonth() === now.getMonth() &&
          date.getFullYear() === now.getFullYear()
        );
      });
    } else if (filterOption === "custom" && startDate && endDate) {
      filtered = filtered.filter((item) => {
        const date = new Date(item.date);
        return date >= new Date(startDate) && date <= new Date(endDate);
      });
    }
    if (selectedCategory !== "all") {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }
    return filtered;
  };

  const filteredIncome = filterByDateAndCategory(incomedata);
  const filteredExpense = filterByDateAndCategory(expenseData);
  const totalIncome = filteredIncome.reduce((acc, item) => acc + Number(item.amount), 0);
  const totalExpense = filteredExpense.reduce((acc, item) => acc + Number(item.amount), 0);
  const balance = totalIncome - totalExpense;
  const progress = Math.min((balance / goal) * 100, 100).toFixed(1);

  const incomeByCategory = {};
  const expenseByCategory = {};
  filteredIncome.forEach((item) => {
    const cat = item.category || "Other";
    incomeByCategory[cat] = (incomeByCategory[cat] || 0) + Number(item.amount);
  });
  filteredExpense.forEach((item) => {
    const cat = item.category || "Other";
    expenseByCategory[cat] = (expenseByCategory[cat] || 0) + Number(item.amount);
  });

  const chartData = [
    ...new Set([...Object.keys(incomeByCategory), ...Object.keys(expenseByCategory)]),
  ].map((cat) => ({
    category: cat,
    income: incomeByCategory[cat] || 0,
    expense: expenseByCategory[cat] || 0,
  }));

  const downloadPDF = () => {
    const input = document.getElementById("summary-section");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save("summary.pdf");
    });
  };

  const downloadExcel = () => {
    const worksheetData = [
      ["Category", "Income", "Expense"],
      ...chartData.map((d) => [d.category, d.income, d.expense]),
      [],
      ["Total Income", totalIncome],
      ["Total Expense", totalExpense],
      ["Balance", balance],
      ["Goal", goal],
    ];
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Summary");
    XLSX.writeFile(workbook, "summary.xlsx");
  };


  const updateGoal = () => {
  if (newGoal <= 0 || isNaN(newGoal)) {
    alert("Please enter a valid positive number for the goal.");
    return;
  }
 setGoal(newGoal);
    setIsModalOpen(false);
    fetch("http://localhost:3201/api/goal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ goal: newGoal }),
    }).catch((err) => console.error("Failed to save goal:", err));};



  console.log({ isModalOpen, newGoal, goal });


  return (


    <div className="space-y-6">
      
      <FilterBar
        filterOption={filterOption}
        setFilterOption={setFilterOption}
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <div id="summary-section" className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md flex items-center space-x-4">
          <FaMoneyBillWave className="text-green-600 text-3xl" />
          <div>
            <p className="text-gray-500 dark:text-gray-300">Total Income</p>
            <h3 className="text-lg font-bold text-green-700 dark:text-green-400">
              {currency}
              <CountUp end={totalIncome} duration={1} separator="," />
            </h3>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md flex items-center space-x-4">
          <FaWallet className="text-red-600 text-3xl" />
          <div>
            <p className="text-gray-500 dark:text-gray-300">Total Expense</p>
            <h3 className="text-lg font-bold text-red-700 dark:text-red-400">
              {currency}
              <CountUp end={totalExpense} duration={1} separator="," />
            </h3>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md flex items-center space-x-4">
          <FaChartPie className="text-blue-600 text-3xl" />
          <div>
            <p className="text-gray-500 dark:text-gray-300">Balance</p>
            <h3 className="text-lg font-bold text-blue-700 dark:text-blue-400">
              {currency}
              <CountUp end={balance} duration={1} separator="," />
            </h3>
          </div>
        </div>

        <div className="md:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-center text-gray-700 dark:text-gray-200 mb-4">
            Income vs Expense by Category
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="#22c55e" />
              <Bar dataKey="expense" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="col-span-full bg-white dark:bg-gray-800 p-4 rounded-xl shadow relative">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-gray-700 dark:text-gray-200 font-medium flex items-center gap-2">
              <FaBullseye /> Savings Goal
            </h4>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-sm text-blue-500 hover:underline"
            >
              Edit Goal
            </button>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
            <div
              className="bg-green-500 h-4 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm mt-1 text-gray-600 dark:text-gray-400">
            {progress}% of goal reached (Target: {currency}
            {goal})
          </p>
        </div>
      </div>

      <div className="flex flex-wrap justify-center md:justify-between gap-4">
        <CurrencyToggle currency={currency} setCurrency={setCurrency} />
        <div className="flex gap-4">
          <button
            onClick={downloadPDF}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            <FaFilePdf /> Export PDF
          </button>
          <button
            onClick={downloadExcel}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            <FaFileExcel /> Export Excel
          </button>
        </div>
      </div>

      {/* Goal Edit Modal */}

      {isModalOpen && (
<div className="relative z-0 overflow-visible fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-[99999]" >
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md space-y-4">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white">Set Savings Goal</h3>
      <input
        type="number"
        value={newGoal}
        onChange={(e) => setNewGoal(Number(e.target.value))}
        className="w-full p-2 border border-gray-300 rounded"
      />
      <div className="flex justify-end gap-2">
        <button
          onClick={() => setIsModalOpen(false)}
          className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white"
        >
          Cancel
        </button>
        <button
          onClick={updateGoal}
          className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}+

      
    </div>
  );
};

export default SummaryCards;
