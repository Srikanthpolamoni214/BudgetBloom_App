
const path = require('path');
const fs = require('fs');
const registerData = path.resolve("Models", "register.json");
const jwt = require("jsonwebtoken")
const SECRET_KEY = "srikanth@214"

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
             const token= jwt.sign( 
            {
                email: user.email,password : user.password
             },
           SECRET_KEY,
            { expiresIn: '1h' },
        )
        
            return res.json({ message: 'Login successful', user , token });

            
        }

     
        
         else {
            return res.json({ error: 'Invalid email or password' });
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