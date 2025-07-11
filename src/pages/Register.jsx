import React from "react";
import { Link } from "react-router-dom";
import "./Register.css";

const Register = () => {
  return (
    <div className="register-container">
      <h2 className="register-title">Register</h2>
      <form>
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" placeholder="Enter your name" />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" placeholder="Enter your password" />
        </div>
        <div className="form-group">
          <label>Role</label>
          <select>
            <option>Patient</option>
            <option>Pharmacist</option>
            <option>Admin</option>
          </select>
        </div>
        <button className="register-button">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
};

export default Register;