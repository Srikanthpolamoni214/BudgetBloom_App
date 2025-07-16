import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import "./navbar.css";

const Navbar = () => {
  const [isSidebarOpened, setIsSidebarOpened] = useState(false);
  const [isProfileOpened, setIsProfileOpened] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [image, setImage] = useState("default_profile_photo.jpg"); // default fallback

  const profileRef = useRef(null);
  const lastScrollY = useRef(0);
  const timeoutRef = useRef(null);
  const navigate = useNavigate()
  // ✅ Decode token safely in useEffect
  const token = localStorage.getItem("token");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.photo) {
          setImage(decoded.photo);
        }
      } catch (error) {
        console.error("Invalid token:", error.message);
      }
    }
  }, [token]);

  const toggleSidebar = () => setIsSidebarOpened((prev) => !prev);
  const toggleProfile = () => setIsProfileOpened((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpened(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        setShowNavbar(currentScrollY <= lastScrollY.current);
        lastScrollY.current = currentScrollY;
      }, 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <>
      <nav
        style={{ marginTop: "-100px", marginLeft: "-7px",padding: "0.5%" }}
        className={`navbar fixed top-0 left-0 w-full z-50 transition-transform duration-500 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        } flex justify-between items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 shadow-md`}
      >
        <div className="leftNav">
          <div className="iconContainer">
            <img
              height={50}
              width={50}
              src="/budgetbloom_logo.svg"
              className="navLogo"
              alt="BudgetBloom Logo"
              onClick={() => window.location.reload()}
            />
          </div>
          <span className="hamIcon" onClick={toggleSidebar}>
            <FaBars />
          </span>
        </div>

        <div className="navLinks md:flex">
          <span className="navItems">
            <Link className="Link" to="/">HOME</Link>
          </span>
          <span className="navItems">
            <Link className="Link" to="/dashboard">DASHBOARD</Link>

          </span>
          <span className="navItems">
            <Link className="Link" to="/about">ABOUT US</Link>
          </span>
          <span className="navItems">
            <Link className="Link" to="/contactus">CONTACT US</Link>
          </span>
        </div>

        <div className="profileWrapper" ref={profileRef}>
          <div
            className="profileIcon cursor-pointer"
            onClick={toggleProfile}
            role="button"
            aria-haspopup="true"
            aria-expanded={isProfileOpened}
            tabIndex={0}
          >
            <img 
              src={`http://localhost:3201/uploads/${image}`}
              alt="Profile"  
              className="rounded-full object-cover border"  height={50}
              width={50}
            />
          </div>
          {isProfileOpened && (
  <div  className="profileDropdown flex flex-col p-2 bg-white dark:bg-gray-700 shadow-md rounded absolute right-0 mt-2 z-50 min-w-[150px]">
    <Link to="/profile" onClick={toggleProfile} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded">
      Profile
    </Link>

    {!token ? (
      <Link to="/login" onClick={toggleProfile} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded">
       
        Login
      </Link>
    ) : (
      <button
        onClick={() => {
          localStorage.removeItem("token");
          toggleProfile();

          navigate("/login");
        }}
        className="px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
      >
        Logout
      </button>
    )}
  </div>
)}

        </div>
      </nav>

      {isSidebarOpened && (
        <>
          <div className="sidebar open">
            <div className="mobileNavLinks">
              <span className="mobileNavItems">
                <Link className="Link" to="/" onClick={toggleSidebar}>HOME</Link>
              </span>
              <span className="mobileNavItems">
                <Link className="Link" to="/about" onClick={toggleSidebar}>ABOUT US</Link>
              </span>
              <span className="mobileNavItems">
                <Link className="Link" to="/contactus" onClick={toggleSidebar}>CONTACT US</Link>
              </span>
            </div>
          </div>
          <div className="backdrop" onClick={toggleSidebar}></div>
        </>
      )}
    </>
  );
};

export default Navbar;
