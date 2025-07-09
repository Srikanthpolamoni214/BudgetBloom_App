import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css"; // Assuming you have a CSS file for styling

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
     const res = await fetch("http://localhost:3201/login", {
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
    <div className="login-container min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div>
        <h1>Login Page</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            onChange={handleChange}
            required
            placeholder="Email"
            className="input"
          />
          <input
            type="password"
            name="password"
            onChange={handleChange}
            required
            placeholder="Password"
            className="input"
          />
          <button type="submit" className="w-full">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
