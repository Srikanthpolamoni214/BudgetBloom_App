
const path = require('path');
const fs = require('fs');
const registerData = path.resolve("Models", "register.json");

 const loginController = async (req, res) => {
    const userInput = req.body;

    if  ( !userInput||!userInput.email || !userInput.password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }
    // Here you would typically check the credentials against a database
    

    try {
        const data = fs.readFileSync(registerData, 'utf8');
        const users = JSON.parse(data);
        
        const user = users.find(user => user.email === userInput.email && user.password === userInput.password);
        
        if (user) {
            return res.status(200).json({ message: 'Login successful', user });
        } else {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
    }

    catch (error) {
        console.error('Error reading register data:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }

};

// Export the loginController function
module.exports = {
    loginController
};