// SavingsGrowthChart.jsx
import React, { useEffect, useState , useMemo} from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const SavingsGrowthChart = () => {
  
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3201/report")
      .then((res) => res.json())
      .then((data) => setExpenses(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3201/getIncome")
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
      <h3 className="text-xl font-semibold mb-2">Savings Growth</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={spendingTrendData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="savings" stroke="#60a5fa" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SavingsGrowthChart;