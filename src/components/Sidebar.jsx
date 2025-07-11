import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ isOpen, setIsOpen }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <ul className="sidebar-list">
        <li>
          <Link to="/patient-dashboard" className="sidebar-link" onClick={() => setIsOpen(false)}>
            Patient Dashboard
          </Link>
        </li>
        <li>
          <Link to="/pharmacist-dashboard" className="sidebar-link" onClick={() => setIsOpen(false)}>
            Pharmacist Dashboard
          </Link>
        </li>
        <li>
          <Link to="/admin-dashboard" className="sidebar-link" onClick={() => setIsOpen(false)}>
            Admin Dashboard
          </Link>
        </li>
        <li>
          <Link to="/prescription-order" className="sidebar-link" onClick={() => setIsOpen(false)}>
            Prescription/Order
          </Link>
        </li>
        <li>
          <Link to="/inventory" className="sidebar-link" onClick={() => setIsOpen(false)}>
            Inventory
          </Link>
        </li>
        <li>
          <Link to="/billing-reports" className="sidebar-link" onClick={() => setIsOpen(false)}>
            Billing & Reports
          </Link>
        </li>
        <li>
          <Link to="/register" className="sidebar-link login-link" onClick={() => setIsOpen(false)}>
            Register
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
