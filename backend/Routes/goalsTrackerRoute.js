// routes/goalsRoute.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const goalsPath = path.resolve("Models", 'goalsTracker.json');

// Helper: Read/Write JSON file
const readGoals = () => JSON.parse(fs.readFileSync(goalsPath, 'utf-8') || '[]');
const writeGoals = (data) => fs.writeFileSync(goalsPath, JSON.stringify(data, null, 2));

// GET all goals
// router.get('/', (req, res) => {
//   try {
//     const goals = readGoals();
//     res.json(goals);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to read goals' });
//   }
// });
// 
const incomesPath = path.resolve("Models", 'income.json');
const expensesPath = path.resolve("Models", 'expenses.json');

const getTotalSavings = () => {
  const incomes = JSON.parse(fs.readFileSync(incomesPath, 'utf-8') || '[]');
  const expenses = JSON.parse(fs.readFileSync(expensesPath, 'utf-8') || '[]');

  const totalIncome = incomes.reduce((sum, i) => sum + Number(i.amount || 0), 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);

  return totalIncome - totalExpenses;
};
router.get('/', (req, res) => {
  try {
    const goals = readGoals();
    const totalSavings = getTotalSavings();

    // Allocate savings proportionally (or equally if simple)
    const updatedGoals = goals.map(goal => {
      const saved = Math.min(Number(goal.amount), Math.floor((totalSavings * Number(goal.amount)) /
        goals.reduce((sum, g) => sum +Number(g.amount), 0))); // Proportional distribution
      return { ...goal, saved };
    });

    res.json(updatedGoals);
    console.log(updatedGoals)
  } catch (err) {
    res.status(500).json({ error: 'Failed to calculate goal savings' });
  }
});



// POST new goal
router.post('/', (req, res) => {
  try {
    const goals = readGoals();
    const newGoal = { ...req.body, id: Date.now().toString(), saved: 0 };
    goals.push(newGoal);
    writeGoals(goals);
    res.status(201).json(newGoal);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add goal' });
  }
});

// DELETE goal
router.delete('/:id', (req, res) => {
  try {
    const goals = readGoals();
    const filtered = goals.filter(goal => goal.id !== req.params.id);
    writeGoals(filtered);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete goal' });
  }
});

// PUT update goal
router.put('/:id', (req, res) => {
  try {
    const goals = readGoals();
    const updatedGoals = goals.map(goal =>
      goal.id === req.params.id ? { ...goal, ...req.body } : goal
    );
    writeGoals(updatedGoals);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update goal' });
  }
});

module.exports = router;
