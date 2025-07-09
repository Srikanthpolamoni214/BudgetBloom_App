// ExpensePage.jsx
import React, { useState, useEffect } from 'react';
import ExpenseList from '../components/expenses/expensesList';
import ExpenseBreakdownChart from '../components/expenses/expensesBreakdownChart';
import ReceiptUploader from '../components/expenses/receiptUploader';
import SearchBar from '../components/expenses/searchBar';
import SortDropdown from '../components/expenses/sortDropdown';
import axios from 'axios';
import ExpenseForm from '../components/expenses/esxpensesForm';

const ExpensePage = () => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('date-desc');
  const token = localStorage.getItem("token"); // Get token from storage
  const config = { headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` } };

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('https://budgetbloom-app.onrender.com/expenses',  config );
        setExpenses(response.data);
        setFilteredExpenses(response.data);
      } catch (err) {
        console.error('Failed to fetch expenses:', err);
      }
    };
    fetchExpenses();
  }, []);

  useEffect(() => {
    let filtered = [...expenses];
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (sortOrder === 'amount-asc') {
      filtered.sort((a, b) => a.amount - b.amount);
    } else if (sortOrder === 'amount-desc') {
      filtered.sort((a, b) => b.amount - a.amount);
    } else if (sortOrder === 'date-asc') {
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortOrder === 'date-desc') {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    setFilteredExpenses(filtered);
  }, [searchTerm, sortOrder, expenses]);

  return (
    <div className="min-h-screen bg-green-50 px-6 py-8 space-y-6">
      <h1 className="text-3xl font-bold text-green-700 text-center">Expense Management</h1>
       <ExpenseForm onExpenseAdded={setExpenses} />
      <div className="flex flex-col md:flex-row justify-between gap-4">
        
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <SortDropdown value={sortOrder} onChange={setSortOrder} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ExpenseList data={filteredExpenses} />
        <div className="space-y-6">
          <ExpenseBreakdownChart data={filteredExpenses} />
          <ReceiptUploader />
        </div>
      </div>
    </div>
  );
};

export default ExpensePage;
