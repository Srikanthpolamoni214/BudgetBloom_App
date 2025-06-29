import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

const MonthlyTrendChart = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded shadow-md mt-6">
      <h2 className="text-lg font-semibold mb-2 text-gray-700">Monthly Trends</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="income" stroke="#22c55e" />
          <Line type="monotone" dataKey="expense" stroke="#ef4444" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyTrendChart;
