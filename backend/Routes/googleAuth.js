const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../Models/db');
const dotenv = require("dotenv")
dotenv.config()
const SECRET_KEY = process.env.SECRET_KEY;


router.post('/google-auth',  (req, res) => {
  const { name, email, photo } = req.body;

  if (!email || !name) {
    return res.status(400).json({ success: false, message: 'Missing user data' });
  }

  try {
    // Check if user already exists
     db.query('SELECT * FROM users WHERE email = ?', [email], (err,results)=>{
if (results.length === 0) {
      // New user → Insert into DB
       db.query(
        'INSERT INTO users (userName, email, photo, registeredVia) VALUES (?, ?, ?, ?)',
        [name, email, photo, 'google']
      );
    }
// Create JWT token
    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });

    console.log("token", token)
    res.json({
      success: true,
      message: 'Google sign-in successful',
      token,
    });


    });

    

    
  } catch (err) {
    console.error('Google Auth Error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
