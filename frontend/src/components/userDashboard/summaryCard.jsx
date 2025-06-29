// import React, { useEffect, useState } from "react";
// import { FaMoneyBillWave, FaWallet, FaChartPie } from "react-icons/fa";
// import CountUp from "react-countup";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import * as XLSX from "xlsx";
// import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

// const SummaryCards = ({ incomedata, expenseData }) => {
//   const [selectedMonth, setSelectedMonth] = useState("all");
//   const [goal, setGoal] = useState(10000);
//   const [currency, setCurrency] = useState("₹");

//   const filterByMonth = (data) => {
//     if (selectedMonth === "all") return data;
//     return data.filter(item => new Date(item.date).getMonth() === parseInt(selectedMonth));
//   };

//   const filteredIncome = filterByMonth(incomedata);
//   const filteredExpense = filterByMonth(expenseData);

//   const totalIncome = filteredIncome.reduce((acc, item) => acc + Number(item.amount), 0);
//   const totalExpense = filteredExpense.reduce((acc, item) => acc + Number(item.amount), 0);
//   const balance = totalIncome - totalExpense;
//   const savingsProgress = Math.min((balance / goal) * 100, 100);

//   const pieData = [
//     { name: "Income", value: totalIncome },
//     { name: "Expenses", value: totalExpense },
//   ];

//   const COLORS = ["#22c55e", "#ef4444"];

//   const downloadPDF = () => {
//     const input = document.getElementById("summary-section");
//     html2canvas(input).then((canvas) => {
//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPDF();
//       const width = pdf.internal.pageSize.getWidth();
//       const height = (canvas.height * width) / canvas.width;
//       pdf.addImage(imgData, "PNG", 0, 0, width, height);
//       pdf.save("summary.pdf");
//     });
//   };

//   const downloadExcel = () => {
//     const worksheetData = [
//       ["Type", "Amount"],
//       ["Income", totalIncome],
//       ["Expense", totalExpense],
//       ["Balance", balance],
//     ];

//     const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Summary");
//     XLSX.writeFile(workbook, "summary.xlsx");
//   };

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-4">
//         <select
//           value={selectedMonth}
//           onChange={(e) => setSelectedMonth(e.target.value)}
//           className="border p-2 rounded shadow"
//         >
//           <option value="all">All Months</option>
//           {[...Array(12)].map((_, idx) => (
//             <option key={idx} value={idx}>{new Date(0, idx).toLocaleString('default', { month: 'long' })}</option>
//           ))}
//         </select>

//         <div className="flex items-center gap-2">
//           <label>Savings Goal:</label>
//           <input
//             type="number"
//             value={goal}
//             onChange={(e) => setGoal(Number(e.target.value))}
//             className="border p-2 w-24 rounded"
//           />

//           <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="border p-2 rounded">
//             <option value="₹">₹</option>
//             <option value="$">$</option>
//             <option value="€">€</option>
//           </select>
//         </div>
//       </div>

//       <div id="summary-section" className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
//         <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
//           <FaMoneyBillWave className="text-green-600 text-3xl" />
//           <div>
//             <p className="text-gray-500">Total Income</p>
//             <h3 className="text-lg font-bold text-green-700">
//               {currency}<CountUp end={totalIncome} duration={1} separator="," />
//             </h3>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
//           <FaWallet className="text-red-600 text-3xl" />
//           <div>
//             <p className="text-gray-500">Total Expense</p>
//             <h3 className="text-lg font-bold text-red-700">
//               {currency}<CountUp end={totalExpense} duration={1} separator="," />
//             </h3>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
//           <FaChartPie className="text-blue-600 text-3xl" />
//           <div>
//             <p className="text-gray-500">Balance</p>
//             <h3 className="text-lg font-bold text-blue-700">
//               {currency}<CountUp end={balance} duration={1} separator="," />
//             </h3>
//           </div>
//         </div>

//         <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-md">
//           <h3 className="text-lg font-semibold text-center mb-4">Income vs Expenses</h3>
//           <ResponsiveContainer width="100%" height={250}>
//             <PieChart>
//               <Pie
//                 data={pieData}
//                 dataKey="value"
//                 nameKey="name"
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={80}
//                 label
//               >
//                 {pieData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//               <Legend verticalAlign="bottom" height={36} />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="col-span-1 md:col-span-3 bg-white p-4 rounded-xl shadow-md">
//           <p className="text-sm text-gray-600 mb-1">Savings Goal Progress</p>
//           <div className="w-full bg-gray-200 rounded-full h-4">
//             <div
//               className="bg-green-600 h-4 rounded-full"
//               style={{ width: `${savingsProgress}%` }}
//             ></div>
//           </div>
//           <p className="text-right text-xs text-gray-600 mt-1">{savingsProgress.toFixed(1)}%</p>
//         </div>

//         <div className="flex justify-center items-center space-x-4 col-span-1 md:col-span-3">
//           <button
//             onClick={downloadPDF}
//             className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//           >
//             Export PDF
//           </button>
//           <button
//             onClick={downloadExcel}
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           >
//             Export Excel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SummaryCards;











// import React, { useState, useEffect } from "react";
// import {
//   FaMoneyBillWave,
//   FaWallet,
//   FaChartPie,
//   FaFilePdf,
//   FaFileExcel,
// } from "react-icons/fa";
// import CountUp from "react-countup";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import * as XLSX from "xlsx";
// import {
//   BarChart,
//   Bar,
//   Cell,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
// } from "recharts";
// import CurrencyToggle from "../userDashboard/currencyToggle";
// import FilterBar from "../userDashboard/filterbar";

// const SummaryCards = ({ incomedata, expenseData }) => {
//   // State
//   const [filterOption, setFilterOption] = useState("all");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [currency, setCurrency] = useState("₹");
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [goal, setGoal] = useState(20000); // user-defined
//   const categories = Array.from(
//     new Set([...incomedata, ...expenseData].map((d) => d.category).filter(Boolean))
//   );
//   const [newGoal, setNewGoal ] = useState(20000); // user-defined

//   useEffect(() => {
//   fetch("http://localhost:3201/api/goal")
//     .then((res) => res.json())
//     .then((data) => {
//       if (data.goal) {
//         setGoal(data.goal);
//         setNewGoal(data.goal);
//       }
//     })
//     .catch((err) => console.error("Failed to load goal:", err));
// }, []);


//   // Currency Symbol Map
//   const symbols = { "₹": "INR", "$": "USD", "€": "EUR" };

//   // Filter logic
//   const filterByDateAndCategory = (data) => {
//     let filtered = [...data];
//     if (filterOption === "month") {
//       const now = new Date();
//       filtered = filtered.filter((item) => {
//         const date = new Date(item.date);
//         return (
//           date.getMonth() === now.getMonth() &&
//           date.getFullYear() === now.getFullYear()
//         );
//       });
//     } else if (filterOption === "custom" && startDate && endDate) {
//       filtered = filtered.filter((item) => {
//         const date = new Date(item.date);
//         return (
//           date >= new Date(startDate) && date <= new Date(endDate)
//         );
//       });
//     }
//     if (selectedCategory !== "all") {
//       filtered = filtered.filter((item) => item.category === selectedCategory);
//     }
//     return filtered;
//   };

//   const filteredIncome = filterByDateAndCategory(incomedata);
//   const filteredExpense = filterByDateAndCategory(expenseData);

//   const totalIncome = filteredIncome.reduce((acc, item) => acc + Number(item.amount), 0);
//   const totalExpense = filteredExpense.reduce((acc, item) => acc + Number(item.amount), 0);
//   const balance = totalIncome - totalExpense;
//   const progress = Math.min((balance / goal) * 100, 100).toFixed(1);

//   // Bar Chart data by category
//   const incomeByCategory = {};
//   const expenseByCategory = {};

//   filteredIncome.forEach((item) => {
//     const cat = item.category || "Other";
//     incomeByCategory[cat] = (incomeByCategory[cat] || 0) + Number(item.amount);
//   });

//   filteredExpense.forEach((item) => {
//     const cat = item.category || "Other";
//     expenseByCategory[cat] = (expenseByCategory[cat] || 0) + Number(item.amount);
//   });

//   const chartData = [
//     ...new Set([...Object.keys(incomeByCategory), ...Object.keys(expenseByCategory)]),
//   ].map((cat) => ({
//     category: cat,
//     income: incomeByCategory[cat] || 0,
//     expense: expenseByCategory[cat] || 0,
//   }));

//   const downloadPDF = () => {
//     const input = document.getElementById("summary-section");
//     html2canvas(input).then((canvas) => {
//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPDF();
//       const width = pdf.internal.pageSize.getWidth();
//       const height = (canvas.height * width) / canvas.width;
//       pdf.addImage(imgData, "PNG", 0, 0, width, height);
//       pdf.save("summary.pdf");
//     });
//   };

//   const downloadExcel = () => {
//     const worksheetData = [
//       ["Category", "Income", "Expense"],
//       ...chartData.map((d) => [d.category, d.income, d.expense]),
//       [],
//       ["Total Income", totalIncome],
//       ["Total Expense", totalExpense],
//       ["Balance", balance],
//     ];
//     const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Summary");
//     XLSX.writeFile(workbook, "summary.xlsx");
//   };

//   return (
//     <div className="space-y-6">
//       <FilterBar
//         filterOption={filterOption}
//         setFilterOption={setFilterOption}
//         startDate={startDate}
//         endDate={endDate}
//         setStartDate={setStartDate}
//         setEndDate={setEndDate}
//         categories={categories}
//         selectedCategory={selectedCategory}
//         setSelectedCategory={setSelectedCategory}
//       />

//       <div id="summary-section" className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Total Income */}
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md flex items-center space-x-4">
//           <FaMoneyBillWave className="text-green-600 text-3xl" />
//           <div>
//             <p className="text-gray-500 dark:text-gray-300">Total Income</p>
//             <h3 className="text-lg font-bold text-green-700 dark:text-green-400">
//               {currency}
//               <CountUp end={totalIncome} duration={1} separator="," />
//             </h3>
//           </div>
//         </div>

//         {/* Total Expense */}
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md flex items-center space-x-4">
//           <FaWallet className="text-red-600 text-3xl" />
//           <div>
//             <p className="text-gray-500 dark:text-gray-300">Total Expense</p>
//             <h3 className="text-lg font-bold text-red-700 dark:text-red-400">
//               {currency}
//               <CountUp end={totalExpense} duration={1} separator="," />
//             </h3>
//           </div>
//         </div>

//         {/* Balance */}
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md flex items-center space-x-4">
//           <FaChartPie className="text-blue-600 text-3xl" />
//           <div>
//             <p className="text-gray-500 dark:text-gray-300">Balance</p>
//             <h3 className="text-lg font-bold text-blue-700 dark:text-blue-400">
//               {currency}
//               <CountUp end={balance} duration={1} separator="," />
//             </h3>
//           </div>
//         </div>

//         {/* Bar Chart */}
//         <div className="md:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
//           <h3 className="text-lg font-semibold text-center text-gray-700 dark:text-gray-200 mb-4">
//             Income vs Expense by Category
//           </h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={chartData}>
//               <XAxis dataKey="category" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="income" fill="#22c55e" />
//               <Bar dataKey="expense" fill="#ef4444" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Savings Goal Progress */}
//         <div className="col-span-full bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
//           <div className="flex justify-between items-center mb-2">
//             <h4 className="text-gray-700 dark:text-gray-200 font-medium">Savings Goal</h4>
//             <span className="text-sm text-gray-500 dark:text-gray-400">
//               Target: {currency}
//               {goal}
//             </span>
//           </div>
//           <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
//             <div
//               className="bg-green-500 h-4 rounded-full"
//               style={{ width: `${progress}%` }}
//             ></div>
//           </div>
//           <p className="text-sm mt-1 text-gray-600 dark:text-gray-400">
//             {progress}% of goal reached
//           </p>
//         </div>
//       </div>

//       {/* Currency & Export */}
//       <div className="flex flex-wrap justify-center md:justify-between gap-4">
//         <CurrencyToggle currency={currency} setCurrency={setCurrency} />
//         <div className="flex gap-4">
//           <button
//             onClick={downloadPDF}
//             className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//           >
//             <FaFilePdf /> Export PDF
//           </button>
//           <button
//             onClick={downloadExcel}
//             className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//           >
//             <FaFileExcel /> Export Excel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SummaryCards;











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
    fetch("http://localhost:3201/api/goal")
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
)}

      
    </div>
  );
};

export default SummaryCards;
