// FilterToolbar.jsx
import React, { useState, useEffect } from 'react';

const FilterToolbar = ({ data, onFilter }) => {
  const [category, setCategory] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const uniqueCategories = [...new Set(data.map(item => item.category))];
    setCategories(uniqueCategories);
  }, [data]);

  const applyFilter = () => {
    let filtered = data;

    if (category) {
      filtered = filtered.filter(item => item.category === category);
    }

    if (startDate) {
      filtered = filtered.filter(item => new Date(item.date) >= new Date(startDate));
    }

    if (endDate) {
      filtered = filtered.filter(item => new Date(item.date) <= new Date(endDate));
    }

    onFilter(filtered);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col md:flex-row gap-4 md:items-end">
      <select
        className="border px-3 py-2 rounded"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((cat, idx) => (
          <option key={idx} value={cat}>{cat}</option>
        ))}
      </select>

      <input
        type="date"
        className="border px-3 py-2 rounded"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />

      <input
        type="date"
        className="border px-3 py-2 rounded"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />

      <button
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        onClick={applyFilter}
      >
        Filter
      </button>
    </div>
  );
};

export default FilterToolbar;