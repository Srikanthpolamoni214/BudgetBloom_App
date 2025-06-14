import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.get("http://localhost:4200/login");
      console.log("Response from GET request:", res.data);
      // const response = await fetch("http://localhost:4200/login", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(form),
      // });
      // console.log("Response :", response);
      // if (!response.ok) {
      //   alert("Login failed. Please check your credentials.");
      //   throw new Error("Login failed");
      // } 
      // const data = await response.json();
      // if (data.message === "Login successful") {
      //   alert("Login successful!");
      //   // Redirect to dashboard or home page
      //   window.location.href = "/dashboard"; // Adjust the redirect as needed
      // } else {
      //   alert(data.message || "Login failed. Please try again.");
      // }
    
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login.");
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
