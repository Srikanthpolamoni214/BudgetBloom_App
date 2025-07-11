




// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '/src/styles/register.css'; // Assuming you have a CSS file for styles
// const Register = () => {
//   const navigate = useNavigate();
//   const [preview, setPreview] = useState(null);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const form = event.target;
//     const formData = new FormData(form);

//     try {
//       const res = await fetch('http://localhost:3201/register', {
//         method: 'POST',
//         body: formData, // enctype is multipart/form-data
//       });

//       const result = await res.json();
//       console.log(result);

//       if (result.message === 'User registered successfully') {
//         alert('✅ Registered Successfully');
//         setTimeout(() => navigate('/login'), 2000);
//       } else if (result.message === 'Email already registered') {
//         alert('⚠️ Email already registered');
//       } else {
//         alert('❌ Registration failed');
//       }
//     } catch (error) {
//       console.error('Registration failed:', error);
//       alert('Registration failed. Please try again.');
//     }
//   };

//   const handleImagePreview = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   return (
//     <div className="register-container min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
//       <div className="p-8 rounded-lg shadow-lg w-full max-w-md bg-white dark:bg-gray-900">
//         <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Register</h2>

//         <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
//           <input type="text" name="userName" placeholder="Username" required className="input" />
//           <input type="number" name="phoneNumber" placeholder="Phone Number" required className="input" />
//           <input type="email" name="email" placeholder="Email" required className="input" />
//           <input type="password" name="password" placeholder="Password" required className="input" />
//           <input type="number" name="age" placeholder="Age" required className="input" />
//           <select name="gender" required className="input">
//             <option value="" disabled>Select Gender</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//           </select>

//           {/* Profile Photo Upload */}
//           <input
//             type="file"
//             name="photo"
//             accept="image/*"
//             onChange={handleImagePreview}
//             className="input"
//           />
//           {preview && (
//             <img
//               src={preview}
//               alt="Preview" height={100} width={100}
//               className="w-24 h-24 rounded-full object-cover mx-auto border mt-2"
//             />
//           )}

//           <button
//             type="submit"
//             className="w-full"
//           >
//             Register
//           </button>
//         </form>

//         <p className="mt-4 text-center text-sm">
//           Already have an account?{' '}
//           <a href="/login" className="text-indigo-600 hover:underline">Login</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;




// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const Register = () => {
//   const navigate = useNavigate();
//   const [whatsappOptIn, setWhatsappOptIn] = useState(true);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Your form logic here
//     alert("Registration logic here");
//   };

//   return (
//     <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-r from-[#1e1e2f] to-[#2d2d44] text-white">
//       {/* Left Section */}
//       <div className="md:w-1/2 flex flex-col justify-center items-center p-10">
//         <h1 className="text-4xl font-bold mb-4">Welcome to Airtribe ✨</h1>
//         <p className="text-lg text-gray-300 mb-6 max-w-md text-center">
//           Expert-led training courses to accelerate your professional development.
//         </p>
//         <p className="text-indigo-400 font-semibold text-sm">Sign up to get started →</p>
//       </div>

//       {/* Right Section (Form) */}
//       <div className="md:w-1/2 bg-white text-black flex items-center justify-center py-10 px-6 md:px-16 rounded-tl-3xl rounded-bl-3xl shadow-xl">
//         <div className="w-full max-w-md">
//           <h2 className="text-2xl font-bold mb-6 text-center">Create account</h2>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input type="text" name="name" placeholder="Name" required className="w-full p-3 border rounded-lg" />
//             <input type="email" name="email" placeholder="Email" required className="w-full p-3 border rounded-lg" />

//             <div className="flex items-center border rounded-lg overflow-hidden">
//               <span className="px-3 bg-gray-100 border-r">🇮🇳</span>
//               <input
//                 type="tel"
//                 name="phone"
//                 placeholder="Phone number"
//                 required
//                 className="flex-1 p-3 outline-none"
//               />
//             </div>

//             <label className="flex items-center space-x-2 text-sm">
//               <input
//                 type="checkbox"
//                 checked={whatsappOptIn}
//                 onChange={() => setWhatsappOptIn(!whatsappOptIn)}
//                 className="form-checkbox text-indigo-600"
//               />
//               <span>Send me updates over WhatsApp</span>
//             </label>

//             <button
//               type="submit"
//               className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
//             >
//               Create Account
//             </button>
//           </form>

//           <div className="flex items-center my-4">
//             <div className="flex-grow border-t border-gray-300" />
//             <span className="mx-2 text-sm text-gray-500">OR</span>
//             <div className="flex-grow border-t border-gray-300" />
//           </div>

//           <button className="w-full border border-gray-400 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition">
//             <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="w-5 h-5" />
//             Continue with Google
//           </button>

//           <p className="text-sm text-center mt-4 text-gray-600">
//             Already have an account?{' '}
//             <Link to="/login" className="text-indigo-600 hover:underline">
//               Log in
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';
import '/src/styles/register.css';

const Register = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    try {
      setLoading(true);
      const res = await fetch('https://budgetbloom-app.onrender.com/register', {
        method: 'POST',
        body: formData,
      });
      const result = await res.json();
      setLoading(false);

      if (result.message === 'User registered successfully') {
        alert('✅ Registered Successfully');
        navigate('/login');
      } else {
        alert(result.message || '❌ Registration failed');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
      setLoading(false);
    }
  };

  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const { name, email, picture } = decoded;

      const res = await fetch('https://budgetbloom-app.onrender.com/google-auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, photo: picture }),
      });

      const result = await res.json();

      if (result.success) {
        alert('✅ Google Sign-In Successful');
        localStorage.setItem('token', result.token);
navigate('/dashboard');

      } else {
        alert('❌ Google Sign-In Failed');
      }
    } catch (err) {
      console.error('Google Auth Error:', err);
      alert('Google Authentication Failed');
    }
  };

  return (
    <div className="register-container min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="p-8 rounded-lg shadow-lg w-full max-w-md bg-white dark:bg-gray-900">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Register</h2>

        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
          <input type="text" name="userName" placeholder="Username" required className="input" />
          <input type="number" name="phoneNumber" placeholder="Phone Number" required className="input" />
          <input type="email" name="email" placeholder="Email" required className="input" />
          <input type="password" name="password" placeholder="Password" required className="input" />
          <input type="number" name="age" placeholder="Age" required className="input" />
          <select name="gender" required className="input">
            <option value="" disabled>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleImagePreview}
            className="input"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-24 h-24 rounded-full object-cover mx-auto border mt-2"
            />
          )}
          <button
            type="submit"
            className={`bg-indigo-600 text-white py-2 px-4 rounded w-full ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'}`}
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div className="text-center my-4 text-gray-600 dark:text-gray-300">OR</div>
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => alert('Google Sign-In Failed')}
          />
        </div>

        <p className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <a href="/login" className="text-indigo-600 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
