const express = require('express');
const { incomepost,incomeGet } = require('../Controllers/incomeController');
const route = express.Router();
// const { celebrate, Joi } = require('celebrate');
// const { validateUrl } = require('./validateUrl');
// const { validateEmail } = require('./validateEmail');
// const { validatePassword } = require('./validatePassword');
// const { validateName } = require('./validateName');
route.post("/income", incomepost)
route.get("/getIncome", incomeGet)


module.exports = route;


