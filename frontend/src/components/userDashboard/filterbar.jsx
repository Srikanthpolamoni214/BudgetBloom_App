// src/components/userDashboard/FilterBar.jsx
import React from "react";

const FilterBar = ({
  filterOption,
  setFilterOption,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 bg-white dark:bg-gray-900 p-4 rounded-xl shadow">
      {/* Filter Type */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter By:</label>
        <select
          value={filterOption}
          onChange={(e) => setFilterOption(e.target.value)}
          className="border rounded px-3 py-1 bg-white dark:bg-gray-800 dark:text-white"
        >
          <option value="all">All Time</option>
          <option value="month">This Month</option>
          <option value="custom">Custom Range</option>
        </select>
      </div>

      {/* Date Range */}
      {filterOption === "custom" && (
        <>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border rounded px-3 py-1 bg-white dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border rounded px-3 py-1 bg-white dark:bg-gray-800 dark:text-white"
            />
          </div>
        </>
      )}

      {/* Category Filter */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border rounded px-3 py-1 bg-white dark:bg-gray-800 dark:text-white"
        >
          <option value="all">All</option>
          {categories?.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
