import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate()

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

  const handleSubmit = async(event) => {
    event.preventDefault();
    try {
      const response = await axios.post("https://budgetbloom-app.onrender.com/login", form);

      console.log(response)
      if (response.data.token){
        localStorage.setItem("token", response.data.token)
        alert("Login Success");
        setTimeout(() => {

                     navigate("/dashboard")

        }, 2000);

      }
    else{
      alert("Invalid credentials")
    }

    
    } 
    catch (error) {
         
 if (error.status==401){
  alert("Invalid email or password")
 }
 
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
