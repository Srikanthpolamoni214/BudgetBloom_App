// import React from 'react';

import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate()
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      name: formData.get("username"),
      phoneNumber: formData.get("phoneNumber"),
      email: formData.get("email"),
      password: formData.get("password"),
      age: formData.get("age"),
      gender: formData.get("gender"),
    };

    try {
      const res = await fetch("http://localhost:3201/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      console.log(result);
      if (result.message === "User registered successfully") {
        alert("Registered Successfully");
        setTimeout(() => {
            
            navigate("/login");
        }, 2000);

      } 
      else if (result.message === "Email already registered") {
        alert("Email already registered");
        }
      else {
        alert("Registration failed");
      }
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
        <input
          type="number"
          name="phoneNumber"
          placeholder="Phone Number"
          required
        />
        <input type="text" name="email" placeholder="Email" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <input type="number" name="age" placeholder="Age" required />
        <select name="gender" defaultValue="" required>
          <option value="" disabled>
            Select your gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <button type="submit">Register</button>
      </form>
      <div>
        <a href="/login">        Already have an account
</a>

      </div>
    </div>
  );
};

export default Register;
