import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PatientDashboard from "./pages/PatientDashboard";
import PharmacistDashboard from "./pages/PharmacistDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import PrescriptionOrder from "./pages/PrescriptionOrder";
import InventoryManagement from "./pages/InventoryManagement";
import BillingReports from "./pages/BillingReports";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Router>
      <div className={`app ${darkMode ? "dark" : ""}`}>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className="layout">
          <Sidebar />
          <main className="content">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/patient-dashboard" element={<PatientDashboard />} />
              <Route path="/pharmacist-dashboard" element={<PharmacistDashboard />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/prescription-order" element={<PrescriptionOrder />} />
              <Route path="/inventory" element={<InventoryManagement />} />
              <Route path="/billing-reports" element={<BillingReports />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;