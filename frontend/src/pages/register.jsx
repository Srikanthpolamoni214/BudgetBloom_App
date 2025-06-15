// import React from 'react';
import axios from 'axios';

const Register = () => {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {
            name: formData.get('username'),
            phoneNumber: formData.get('phoneNumber'),
            email: formData.get('email'),
            password: formData.get('password'),
            age: formData.get('age'),
            gender: formData.get('gender')
        };

        try {
            const res = await axios.post('http://localhost:4200/register', data );

                
            console.log("Success:", res.data);
            alert("Registered Successfully!");
        } catch (error) {
            console.error("Registration failed:", error);
            alert("Registration failed. Please try again.");
        }
    };

    return (
        <div>
            <h1>Register Page</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" required />
                <input type="number" name="phoneNumber" placeholder="Phone Number" required />
                <input type="text" name="email" placeholder="Email" required />
                <input type="password" name="password" placeholder="Password" required />
                <input type="number" name="age" placeholder="Age" required />
                <select name="gender" defaultValue="" required>
                    <option value="" disabled>Select your gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
