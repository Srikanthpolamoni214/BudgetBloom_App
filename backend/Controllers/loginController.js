const path = require('path');
const fs = require('fs');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const db = require('../Models/db');

const dotenv =require("dotenv")
dotenv.config()
const SECRET_KEY = process.env.SECRET_KEY
const loginController = async (req, res) => {
    const userInput = req.body;

    if (!userInput || !userInput.email || !userInput.password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        db.query("SELECT * FROM users WHERE email = ?", [userInput.email], async (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            if (results.length === 0) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            const user = results[0];
console.log("28", user)
            // ❗ Compare input password with stored hashed password
            const isMatch = await bcrypt.compare(userInput.password, user.password);

            if (!isMatch) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            // ✅ Generate JWT token
            const token = jwt.sign(
                { email: user.email, id: user.id , photo: user.photo, name: user.userName },
                SECRET_KEY,
                { expiresIn: '1h' }
            );

            return res.status(200).json({ message: 'Login successful', user, token });
        });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    loginController
};
