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
       

    const Data = await axios.post("http://localhost:4100/login", form)



    console.log(Data.data.message);
        
    




    }
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
