import React from "react";

const Filters = ({ filters, setFilters }) => {
  const handleDateChange = (e) => {
    setFilters({ ...filters, date: e.target.value });
  };

  const handleCategoryChange = (e) => {
    setFilters({ ...filters, category: e.target.value });
  };

  return (
    <div className="bg-white p-4 rounded shadow-md mb-4 flex flex-col md:flex-row items-center justify-between gap-4">
      <div>
        <label className="text-sm text-gray-600">Filter by Date:</label>
        <input
          type="date"
          value={filters.date}
          onChange={handleDateChange}
          className="border p-2 rounded ml-2"
        />
      </div>

      <div>
        <label className="text-sm text-gray-600">Category:</label>
        <select
          value={filters.category}
          onChange={handleCategoryChange}
          className="border p-2 rounded ml-2"
        >
          <option value="">All</option>
          <option value="Salary">Salary</option>
          <option value="Food">Food</option>
          <option value="Rent">Rent</option>
          <option value="Utilities">Utilities</option>
          <option value="Investment">Investment</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
