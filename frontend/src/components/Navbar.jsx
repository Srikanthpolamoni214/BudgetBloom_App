import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaChevronDown } from "react-icons/fa";
import Profile from "./profile"; // Adjust the import path as necessary
import "../styles/navbar.css"; // Adjust the import path as necessary
const Navbar = () => {
  const [isSidebarOpened, setIsSidebarOpened] = useState(false);
  const [isProfileOpened, setIsProfileOpened] = useState(false);
  const profileRef = useRef(null);


  const toggleSidebar = () => setIsSidebarOpened((prev) => !prev);
  const toggleProfile = () => setIsProfileOpened((prev) => !prev);



  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setIsProfileOpened(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="leftNav">
          <div className="iconContainer">
            <img height={50} width={50}
              src="/budgetbloom_logo.svg"
              className="navLogo"
              alt="Consulto Logo"
              onClick={() => window.location.reload()}
            />
          </div>
          <span className="hamIcon" onClick={toggleSidebar}>
            <FaBars />
          </span>
        </div>

        <div className="navLinks">
          <span className="navItems"><Link className="Link" to="/">HOME</Link></span>
                    <span className="navItems"><Link className="Link" to="/whatIsBudgetBloom"> What is Budget_Bloom?</Link></span>

                    <span className="navItems"><Link className="Link" to="/about">About US</Link></span>

          <span className="navItems"><Link className="Link" to="/contactus">CONTACT US</Link></span>
          <span className="navItems"><Link className="Link" to="/adminlogin">ADMIN</Link></span>
        </div>

        {/* Profile with dropdown */}
        <div className="profileWrapper" ref={profileRef}>
          <div className="profileIcon" onClick={toggleProfile}>
            <img src="/profile.png" alt="Profile" />
            <FaChevronDown />
          </div>
          {isProfileOpened && <Profile />}
        </div>
      </nav>

      {isSidebarOpened && (
        <>
          <div className="sidebar open">
            <div className="mobileNavLinks">
              <span className="mobileNavItems"><Link className="Link" to="/">HOME</Link></span>
              <span className="mobileNavItems"><Link className="Link" to="/aboutus">ABOUT US</Link></span>
              <span className="mobileNavItems"><Link className="Link" to="/alldoctors">ALL DOCTORS</Link></span>
              <span className="mobileNavItems"><Link className="Link" to="/contactus">CONTACT US</Link></span>
            </div>
          </div>
          <div className="backdrop" onClick={toggleSidebar}></div>
        </>
      )}
    </>
  );
};

export default Navbar;
