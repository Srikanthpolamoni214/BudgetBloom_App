// SearchBar.jsx
import React from 'react';

const SearchBar = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search by description or category..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border px-4 py-2 rounded w-full md:w-1/2"
    />
  );
};

export default SearchBar;
