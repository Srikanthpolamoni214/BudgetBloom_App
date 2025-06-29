const fs = require("fs")
const path = require("path")
const expensesFile = path.resolve("Models", "expenses.json");
const budgetFile = path.resolve("Models" , "budgets.json");
const readExpenses = () =>{
    try {
        const data = fs.readFileSync(expensesFile, "utf8");
        return JSON.parse(data);
        } catch (error) {
            console.log("Error reading expenses file");
            return [];
            }

}
const expensespost = (req, res) =>{
    const {description, amount, date, category,month} = req.body;
    fs.writeFileSync( expensesFile, JSON.stringify([...readExpenses(), {description, amount:parseFloat(amount), date, category, month}]))
   
  const budgetdata= fs.readFileSync(budgetFile, "utf8");

  const budget = JSON.parse(budgetdata);
  const budgetIndex = budget.findIndex((item) =>  item.name === category);
  if (budgetIndex !== -1) {
    budget[budgetIndex].spent += parseFloat(amount);
    fs.writeFileSync(budgetFile, JSON.stringify(budget));
    }

  


    if (description && amount && date && category) {
        res.send({message: "Expense added successfully"})
        } else {
            res.send({message: "Please fill all fields"})
            }


    
}

const expensesget = (req, res) =>{
    const expenses = readExpenses();
    res.send(expenses);

}
module.exports = {expensesget, expensespost};



// const express = require('express');
// const fs = require('fs');
// const path = require('path');
// const router = express.Router();

// // Paths
// const expensesPath = path.resolve('Models', 'expenses.json');
// const budgetsPath = path.resolve('Models', 'budgets.json');

// // Utils
// const readJSON = (filePath) => {
//   if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, JSON.stringify([]));
//   return JSON.parse(fs.readFileSync(filePath));
// };

// const writeJSON = (filePath, data) => {
//   fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
// };

// // 📤 POST new expense
// router.post('/expenses', (req, res) => {
//   const { name, amount, category, date } = req.body;
//   if (!name || !amount || !category) {
//     return res.status(400).json({ error: 'Missing expense data' });
//   }

//   const expenses = readJSON(expensesPath);
//   const newExpense = {
//     id: Date.now(),
//     name,
//     amount: parseFloat(amount),
//     category,
//     date: date || new Date().toISOString()
//   };

//   expenses.push(newExpense);
//   writeJSON(expensesPath, expenses);

//   // 🔁 Update related budget
//   const budgets = readJSON(budgetsPath);
//   const budgetIndex = budgets.findIndex(b => b.name === category);

//   if (budgetIndex !== -1) {
//     budgets[budgetIndex].spent += parseFloat(amount);
//     writeJSON(budgetsPath, budgets);
//   }

//   res.status(201).json(newExpense);
// });
