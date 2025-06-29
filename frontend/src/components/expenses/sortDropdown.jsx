// SortDropdown.jsx
import React from 'react';

const SortDropdown = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border px-4 py-2 rounded w-full md:w-64"
    >
      <option value="date-desc">Newest First</option>
      <option value="date-asc">Oldest First</option>
      <option value="amount-asc">Lowest Amount</option>
      <option value="amount-desc">Highest Amount</option>
    </select>
  );
};

export default SortDropdown;