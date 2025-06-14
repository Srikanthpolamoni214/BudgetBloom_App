const express = require('express');

const app = express();
const port = 4200;
const path = require('path');
const loginRoute = require('./Routes/loginRoute');


const cors = require('cors');
// Middleware to enable CORS
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: ["http://localhost:5173", "http://localhost:5174"] }));



app.use("/", loginRoute );


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    });