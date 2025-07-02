import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

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
     const res = await fetch("https://budgetbloom-app.onrender.com/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(form),
});

      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        alert("Login Success");
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      }
      else if (res.status === 401) {
      alert("Invalid credentials");
    }
      else{
        alert("Login failed")
      }
    } catch (error) {
      
      
      alert("Something went wrong: " + error.message);

      
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          required
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
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
