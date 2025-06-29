const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const filePath = path.resolve("Models", 'budgets.json');

// Utility to read and write JSON file
const readData = () => {
  if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, JSON.stringify([]));
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// 📥 GET all budgets
router.get('/', (req, res) => {
  const data = readData();
  res.json(data);
});

// ➕ POST new budget category
router.post('/', (req, res) => {
  const { name, amount, spent = 0 } = req.body;
  if (!name || amount == null) return res.status(400).json({ error: "Invalid data" });

  const data = readData();
  const newBudget = {
    id: Date.now(),
    name,
    amount: parseFloat(amount),
    spent: parseFloat(spent),
  };

  data.push(newBudget);
  writeData(data);

  res.status(201).json(newBudget);
});

// ❌ DELETE a budget category
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  let data = readData();
  const newData = data.filter(item => item.id !== id);

  if (newData.length === data.length) {
    return res.status(404).json({ error: "Budget not found" });
  }

  writeData(newData);
  res.json({ success: true });
});

module.exports = router;
