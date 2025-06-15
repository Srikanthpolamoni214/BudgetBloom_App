




    const express = require('express');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');

const loginRoute = require('./Routes/loginRoute');
const registerRoute = require('./Routes/registerRoute');

const app = express();
dotenv.config()
const port = process.env.PORT || 3200;




app.use(cors({
  origin: ["https://budgetbloom-app-ncdf.onrender.com","http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
}));

// Middleware
app.use(express.json());


// Enable CORS for specific origin
// app.use(cors({ origin: "http://localhost:5173" }));

// Routes
app.use("/", loginRoute);
app.use("/", registerRoute);

// Server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
