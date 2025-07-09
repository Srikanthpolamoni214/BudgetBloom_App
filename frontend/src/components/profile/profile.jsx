import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    photo: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded Token:", decoded);

        setUser({
          name: decoded.name || "Guest",
          email: decoded.email || "guest@example.com",
          photo: decoded.photo,
        });
      } catch (err) {
        console.error("Invalid token:", err);
        localStorage.removeItem("token");
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="profile-page bg-green-50 min-h-screen p-6 text-center">
      {user.photo ? (
        <img
          src={`http://localhost:3201/uploads/${user.photo}`} height={100} width={100}
          alt="Profile"
          onError={(e) => {
            e.target.src = "/default.png";
          }}
          className="w-24 h-24 rounded-full mx-auto border-2 border-green-500"
        />
      ) : (
        <img
          src="/default_profile_photo.avif" height={100} width={100}
          alt="Default Profile"
          className="w-24 h-24 rounded-full mx-auto border-2 border-green-500"
        />
      )}

      <h2 className="text-lg font-bold mt-4">{user.name}</h2>
      <p className="text-gray-600">{user.email}</p>

      <ul className="mt-6 space-y-2">
         {/* <Link to ="/dashboard" Class >        <li className="hover:text-green-600 cursor-pointer">Dashboard</li>
 </Link>

  <Link to ="/settings" >        <li className="hover:text-green-600 cursor-pointer">Settings</li>
 </Link> */}
        <li className="hover:text-green-600 cursor-pointer"  onClick={() => {
            navigate("/dashboard");
          }}>Dashboard</li>
        <li className="hover:text-green-600 cursor-pointer"  onClick={() => {
            navigate("/settings");
          }}>Settings</li>
        <li
          className="hover:text-red-600 cursor-pointer" 
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          Logout
        </li>
      </ul>
    </div>
  );
};

export default Profile;
