// IncomePage.jsx
import React, { useState, useEffect } from 'react';
import IncomeForm from '../components/income/incomeForm';

import axios from 'axios';
import FilterToolbar from '../components/income/filterIncome';
import IncomeList from '../components/income/incomeList';
import IncomeCategoryChart from '../components/income/incomeCatageroy';

const IncomePage = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  console.log(incomeData,filteredData)

  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const response = await axios.get('http://localhost:3201/getIncome');
        setIncomeData(response.data);
        setFilteredData(response.data);
      } catch (err) {
        console.error('Failed to fetch income:', err);
      }
    };

    fetchIncome();
  }, []);

  return (
    <div className="min-h-screen bg-green-50 px-6 py-8 space-y-6">
      <h1 className="text-3xl font-bold text-green-700 text-center">Income Management</h1>

      <IncomeForm onIncomeAdded={setIncomeData} />
      <FilterToolbar data={incomeData} onFilter = {setFilteredData} />  
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
<IncomeList data={filteredData} />
<IncomeCategoryChart data={filteredData} />
    
      </div>
    </div>
  );
};

export default IncomePage;
