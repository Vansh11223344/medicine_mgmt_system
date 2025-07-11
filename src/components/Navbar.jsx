import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./Navbar.css";

const Navbar = ({ darkMode, setDarkMode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-title">
          Medicine Management
        </Link>
        <div className="navbar-actions">
          <button onClick={() => setDarkMode(!darkMode)} className="dark-mode-toggle">
            {darkMode ? "☀️" : "🌙"}
          </button>
          <button className="hamburger" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? "✖" : "☰"}
          </button>
        </div>
      </nav>

      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Background Overlay (closes sidebar on click) */}
      {isSidebarOpen && <div className="overlay" onClick={() => setIsSidebarOpen(false)} />}
    </>
  );
};

export default Navbar;
