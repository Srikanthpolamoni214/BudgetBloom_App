// const mysql = require("mysql2");
// const dotenv = require("dotenv")
// dotenv.config()
// const pool = mysql.createPool({
//   // host: process.env.HOST,
//   // user : process.env.USER,
//   //   password: process.env.PASSWORD,
//   //   database: process.env.DATABASE,

//   // connectionLimit: 10,
//   // waitForConnections: true,
//   // queueLimit: 0,
//   // multipleStatements: true

//   uri: process.env.DATABASE_URL,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });
// module.exports = pool
// // This code creates a MySQL connection pool using the mysql module.
// // The pool is configured with the host, user, password, database, and connection options.


// db.js
// Database connection configuration using a connection URI from .env

require('dotenv').config();
const mysql = require('mysql2');

// Create a connection pool using the DATABASE_URL environment variable
const pool = mysql.createPool(
  process.env.DATABASE_URL,
  {
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    multipleStatements: true
  }
);

// Export a promise-based pool for async/await usage
module.exports = pool;

