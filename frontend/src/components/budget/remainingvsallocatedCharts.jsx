import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RemainingVsAllocatedChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="amount" fill="#8884d8" name="Allocated" />
        <Bar dataKey="spent" fill="#82ca9d" name="Spent" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RemainingVsAllocatedChart;
