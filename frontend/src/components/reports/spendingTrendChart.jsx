// SpendingTrendChart.jsx
import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const SpendingTrendChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3201/report")
      .then(res => res.json())
      .then(data => setData(data));
     
  }, []);
  

  
const monthlyExpenseMap = data.reduce((acc, item) => {
  const month = new Date(item.date).toLocaleString("default", { month: "short" });
  const amount = parseFloat(item.amount);
  acc[month] = (acc[month] || 0) + amount;
  return acc;
}, {});


const spendingTrendData = Object.entries(monthlyExpenseMap).map(([month, expense]) => ({
  month,
  expense,
}));




  return (
 <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
      <h3 className="text-xl font-semibold mb-2">Spending Trend</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={spendingTrendData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="expense" stroke="#f87171" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpendingTrendChart;