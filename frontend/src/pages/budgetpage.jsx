import React, { useEffect, useState } from 'react';
import BudgetCategoryForm from '../components/budget/budgetCatogery';
import BudgetTable from '../components/budget/budgetTable';
import RemainingVsAllocatedChart from '../components/budget/remainingvsallocatedCharts';
import AlertsList from '../components/budget/alertList';

const BudgetPage = () => {
  const [budgets, setBudgets] = useState([]);
const token = localStorage.getItem("token");
const config = { headers: { 'Content-Type': 'application/json',Authorization: `Bearer ${token}` } };
  useEffect(() => {
    // Fetch budget data from backend
    fetch('http://localhost:3201/budgets', config)
      .then(res => res.json())
      .then(data => setBudgets(data))
          .catch(err => console.error("Fetch error:", err));

  }, []);

  const addBudget = (newItem) => {
    // Call backend to save
    fetch('http://localhost:3201/budgets', {

      method: 'POST',
      
      headers:  config.headers,
      body: JSON.stringify({ ...newItem, spent: 0 }),
    })
      .then(res => res.json())
      .then(savedItem => setBudgets([...budgets, savedItem]));
  };

  const deleteBudget = (id) => {
    fetch(`http://localhost:3201/budgets/${id}`, { method: 'DELETE' , headers: config.headers })
      .then(() => setBudgets(budgets.filter(b => b.id !== id)));
  };

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-bold">Budget Management</h1>
      <BudgetCategoryForm onAdd={addBudget} />
      <AlertsList budgets={budgets} />
      <RemainingVsAllocatedChart data={budgets} />
      <BudgetTable budgets={budgets} onDelete={deleteBudget} />
    </div>
  );
};

export default BudgetPage;
