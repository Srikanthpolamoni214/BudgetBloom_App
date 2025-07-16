// // IncomeVsExpenseGraph.jsx
// import React, { useEffect, useState } from "react";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

// const IncomeVsExpenseGraph = () => {
//   const [data, setData] = useState([]);
//   const [income, setIncome] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:3201/report")
//       .then(res => res.json())
//       .then(data => setData(data));
     
//   }, []);
//   useEffect(() => {
//     fetch("http://localhost:3201/getIncome")
//     .then(res => res.json())
//     .then(income => setIncome(income));
//   }, [])


  



  

  
  
  
// const monthlyExpenseMap = data.reduce((acc, item) => {
//   const month = new Date(item.date).toLocaleString("default", { month: "short" });
//   const amount = parseFloat(item.amount);
//   acc[month] = (acc[month] || 0) + amount;
//   return acc;
// }, {});




//   const monthlyIncomeMap = income.reduce(( acc,item)=>{
//     const month = new Date(item.date).toLocaleString("default", { month: "short"
//       });
//       const amount = parseFloat(item.amount);
//       acc[month] = (acc[month] || 0) + amount;
//       return acc;
//       }, {});

//       const spendingTrendData = Object.entries(monthlyExpenseMap).map(([month, expense]) => ({
//   month,
//   expense,
//   income: monthlyIncomeMap[month],

//       }
//       ));
  




//   return (
//     <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
//       <h3 className="text-xl font-semibold mb-2">Income vs Expense</h3>
//       <ResponsiveContainer width="100%" height={300}>
//         <BarChart data={spendingTrendData}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="month" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Bar dataKey="income" fill="#4ade80" />
//           <Bar dataKey="expense" fill="#f87171" />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default IncomeVsExpenseGraph;

// import React, { useEffect, useState } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
// } from "recharts";

// const IncomeVsExpenseGraph = () => {
//   const [expenses, setExpenses] = useState([]);
//   const [income, setIncome] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:3201/report")
//       .then((res) => res.json())
//       .then((data) => setExpenses(data));
//   }, []);

//   useEffect(() => {
//     fetch("http://localhost:3201/getIncome")
//       .then((res) => res.json())
//       .then((data) => setIncome(data));
//   }, []);
// console.log("expenses", expenses);
// console.log("income", income);
//   // Process expenses by month
//   const monthlyExpenseMap = expenses.reduce((acc, item) => {
//     const month = new Date(item.date).toLocaleString("default", { month: "short" });
//     const amount = parseFloat(item.amount);
//     acc[month] = (acc[month] || 0) + amount;
//     return acc;
//   }, {});

//   // Process income by month
//   const monthlyIncomeMap = income.reduce((acc, item) => {
//     const month = new Date(item.date).toLocaleString("default", { month: "short" });
//     const amount = parseFloat(item.amount);
//     acc[month] = (acc[month] || 0) + amount;
//     return acc;
//   }, {});

//   console.log(("monthlyExpenseMap", monthlyExpenseMap));
//   console.log(("monthlyIncomeMap", monthlyIncomeMap));
//   // Combine both into one dataset
//   const allMonths = Array.from(new Set([...Object.keys(monthlyExpenseMap), ...Object.keys(monthlyIncomeMap)]));
//   const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

//   const spendingTrendData = allMonths
//     .sort((a, b) => monthOrder.indexOf(a) - monthOrder.indexOf(b))
//     .map((month) => ({
//       month,
//       expense: monthlyExpenseMap[month] || 0,
//       income: monthlyIncomeMap[month] || 0,
//     }));
//     console.log("spendingTrendData", spendingTrendData  )

//   return (
//     <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
//       <h3 className="text-xl font-semibold mb-2">Income vs Expense</h3>
//       <ResponsiveContainer width="100%" height={300}>
//         <BarChart data={spendingTrendData}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="month" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Bar dataKey="income" fill="#4ade80" name="Income" />
//           <Bar dataKey="expense" fill="#f87171" name="Expense" />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default IncomeVsExpenseGraph;




import React, { useEffect, useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const IncomeVsExpenseGraph = () => {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3201/report")
      .then((res) => res.json())
      .then((data) => setExpenses(data));
  }, []);

  useEffect(() => {
    fetch("https://budgetbloom-app.onrender.com/getIncome")
      .then((res) => res.json())
      .then((data) => setIncome(data));
  }, []);

  const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const spendingTrendData = useMemo(() => {
    const monthlyExpenseMap = expenses.reduce((acc, item) => {
      const month = new Date(item.date).toLocaleString("default", { month: "short" });
      const amount = parseFloat(item.amount);
      acc[month] = (acc[month] || 0) + amount;
      return acc;
    }, {});

    const monthlyIncomeMap = income.reduce((acc, item) => {
      const month = new Date(item.date).toLocaleString("default", { month: "short" });
      const amount = parseFloat(item.amount);
      acc[month] = (acc[month] || 0) + amount;
      return acc;
    }, {});

    const allMonths = Array.from(
      new Set([...Object.keys(monthlyExpenseMap), ...Object.keys(monthlyIncomeMap)])
    );

    return allMonths
      .sort((a, b) => monthOrder.indexOf(a) - monthOrder.indexOf(b))
      .map((month) => {
        const expense = monthlyExpenseMap[month] || 0;
        const income = monthlyIncomeMap[month] || 0;
        return {
          month,
          expense,
          income,
          savings: income - expense,
        };
      });
  }, [income, expenses]);

  console.log("spending", spendingTrendData);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
      <h3 className="text-xl font-semibold mb-2">Income vs Expense vs Savings</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={spendingTrendData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" fill="#4ade80" name="Income" />
          <Bar dataKey="expense" fill="#f87171" name="Expense" />
          <Bar dataKey="savings" fill="#60a5fa" name="Savings" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomeVsExpenseGraph;
