import { useState } from "react";
import axios from "axios";

const Login = () => {
    const  [form , setForm] = useState({
        email: "",
        password: ""
    });
    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value
        }));
    };
    const handleSubmit = async(event) => {
        event.preventDefault();
        // Here you would typically handle the login logic, such as sending a request to your backend
       

        const yy= await axios.get("https://budgetbloom-app.onrender.com/login")
        console.log(yy.data.message);
    const Data = await axios.post("https://budgetbloom-app.onrender.com/login", form)
    



    console.log(Data.data.message);
    if (Data.data.message === "Login successful") {
      alert("Login successful");
      // Redirect to another page or perform other actions
    } else {
      alert("Invalid email or password");
    }
  };




    
  return (

    <div>
      <h1>Login Page</h1>
      <form  onClick={handleSubmit}>
        <input type="text" name="email" onChange={handleChange} required placeholder="Username" />
        <input type="password" name="password" onChange={handleChange} required placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
