const express = require('express');
const { expensespost, expensesget } = require('../Controllers/expensesController');
const app = express();
const route = express.Router();
route.post ("/postexpenses", expensespost)
route.get("/expenses", expensesget)

module.exports = route;