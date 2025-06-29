




    const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');

const loginRoute = require('./Routes/loginRoute');
const registerRoute = require('./Routes/registerRoute');
const incomeRoute = require('./Routes/incomeRoute');
const expensesRoute = require('./Routes/expensesRoute');
const receiptUploderRoute = require('./Routes/receiptUploaderRoute');
const userSettingsRoute = require('./Routes/registerRoute');
const goalsRoute = require('./Routes/goalsRoute');
const budgetRoute = require('./Routes/budgetRoute');
const goalsTrackerRoute = require('./Routes/goalsTrackerRoute');
const reportRoute = require("./Routes/reportRoute")
const app = express();
dotenv.config()
const port = process.env.PORT || 3200;



app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Middleware
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



// Enable CORS for specific origin
// app.use(cors({ origin: "http://localhost:5173" }));

// Routes
app.use("/", loginRoute);
app.use("/", registerRoute);
app.use("/" ,  incomeRoute);
app.use("/" ,  expensesRoute)
app.use("/", receiptUploderRoute)
app.use("/api/settings/", userSettingsRoute)
app.use("/api/goal", goalsRoute);
app.use('/budgets', budgetRoute); // 👈 Mount the route
app.use("/" , reportRoute)


const dataDir = path.join(__dirname, 'Models');
const goalsFile = path.join(dataDir, 'goalstracker.json');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
if (!fs.existsSync(goalsFile)) fs.writeFileSync(goalsFile, '[]');

app.use('/api/goals', goalsTrackerRoute);

// Server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


// Ensure data dir & file

