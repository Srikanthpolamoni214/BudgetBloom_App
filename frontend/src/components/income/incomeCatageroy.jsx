// IncomeCategoryChart.jsx
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#34D399', '#60A5FA', '#FBBF24', '#F87171', '#A78BFA', '#F472B6'];

const IncomeCategoryChart = ({ data }) => {
  const categoryTotals = data.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + Number(curr.amount);
    return acc;
  }, {});

  const chartData = Object.entries(categoryTotals).map(([name, value]) => ({ name, value }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-full">
      <h2 className="text-xl font-bold mb-4">Income by Category</h2>
      {chartData.length === 0 ? (
        <p className="text-gray-500">No income data available for chart.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default IncomeCategoryChart;
