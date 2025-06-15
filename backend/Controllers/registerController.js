const fs = require('fs');
const path = require('path');
const dataFile = path.resolve("Models", "register.json");
const registerController =(req, res) => {
    
        const { name, phoneNumber, email, password ,age , gender} = req.body;
        if (!name || !phoneNumber || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newUser = {
            name,
            phoneNumber,
            email,
            password,
            age,
            gender
        };
        // Read existing data
        fs.readFile(dataFile, (err, data) =>
            {
                if (err) {
                    return res.status(500).json({ message: "Error reading data file" });
                }
                let users = [];
                if (data.length > 0) {
                    try {
                        users = JSON.parse(data);
                    } catch (parseError) {
                        return res.status(500).json({ message: "Error parsing data file" });
                    }
                }
                // Check for duplicate email
                const existingUser = users.find(user => user.email === email);
                if (existingUser) {
                    return res.status(400).json({ message: "Email already registered" });
                }
                // Add new user
                users.push(newUser);
                // Write updated data back to file
                fs.writeFile(dataFile, JSON.stringify(users, null, 2), (writeErr) => {
                    if (writeErr) {
                        return res.status(500).json({ message: "Error writing to data file" });
                    }
                    res.status(201).json({ message: "User registered successfully", user: newUser });
                });
            }
        );
    
};

module.exports = registerController;
// This code defines a registerController function that handles user registration by reading and writing to a JSON file.
// It checks for required fields, validates for duplicate emails, and writes the new user data to a file.
// It uses the fs module to read and write files, and handles errors appropriately.
// The controller responds with appropriate status codes and messages based on the success or failure of the registration process.
// The data is stored in a JSON file named register.json located in the Models directory.   



