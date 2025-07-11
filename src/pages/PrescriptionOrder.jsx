import React from "react";
import InventoryIcon from "@mui/icons-material/Inventory";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "./PrescriptionOrder.css";

const PrescriptionOrder = () => {
  // Sample data - in a real app this would come from API/state
  const currentOrder = [
    { id: 1, name: "Paracetamol 500mg", quantity: "2 tablets daily", price: 5.00, dosage: "Take with water after meals" },
    { id: 2, name: "Ibuprofen 200mg", quantity: "1 tablet every 6 hours", price: 3.50, dosage: "Take with food" },
    { id: 3, name: "Vitamin C 1000mg", quantity: "30 capsules", price: 8.00, dosage: "Take once daily" },
    { id: 4, name: "Amoxicillin 250mg", quantity: "3 capsules daily", price: 12.00, dosage: "Complete full course" },
    { id: 5, name: "Cetirizine 10mg", quantity: "1 tablet daily", price: 6.50, dosage: "Take at bedtime" },
  ];

  const prescriptions = [
    { id: 1, doctor: "Dr. Emily Smith", date: "15 Oct 2023", status: "Active", patient: "John Doe", notes: "For fever and pain" },
    { id: 2, doctor: "Dr. Michael Johnson", date: "5 Sep 2023", status: "Expired", patient: "Sarah Lee", notes: "Post-surgery" },
    { id: 3, doctor: "Dr. Anna Patel", date: "20 Aug 2023", status: "Active", patient: "Mark Wilson", notes: "Allergy relief" },
    { id: 4, doctor: "Dr. Robert Brown", date: "10 Jul 2023", status: "Expired", patient: "Lisa Adams", notes: "Antibiotic course" },
  ];

  const calculateTotal = () => {
    return currentOrder.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className="prescription-order">
      <div className="content-container">
        <header className="order-header">
          <h1 className="order-title">
            <InventoryIcon className="title-icon" />
            Prescription & Order
          </h1>
          <button className="new-prescription-btn" aria-label="Add New Prescription">
            <AddCircleOutlineIcon className="btn-icon" />
            New Prescription
          </button>
        </header>

        <div className="order-container">
          <div className="order-card">
            <div className="card-header">
              <h2 className="card-title">Current Order</h2>
              <span className="items-count">{currentOrder.length} items</span>
            </div>

            <ul className="order-list">
              {currentOrder.map((item) => (
                <li key={item.id} className="order-item">
                  <div className="item-info">
                    <h3 className="item-name">{item.name}</h3>
                    <span className="item-quantity">{item.quantity}</span>
                    <span className="item-dosage">{item.dosage}</span>
                  </div>
                  <span className="item-price">${item.price.toFixed(2)}</span>
                </li>
              ))}
            </ul>

            <div className="order-summary">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>$2.99</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>${(calculateTotal() + 2.99).toFixed(2)}</span>
              </div>
            </div>

            <button className="order-button" aria-label="Place Order">
              <CheckCircleOutlineIcon className="btn-icon" />
              Place Order
              <ChevronRightIcon className="arrow-icon" />
            </button>
          </div>

          <div className="prescription-card">
            <div className="card-header">
              <h2 className="card-title">Your Prescriptions</h2>
            </div>

            <ul className="prescription-list">
              {prescriptions.map((prescription) => (
                <li key={prescription.id} className="prescription-item">
                  <div className="prescription-info">
                    <h3 className="prescription-doctor">{prescription.doctor}</h3>
                    <span className="prescription-date">{prescription.date}</span>
                    <span className="prescription-patient">Patient: {prescription.patient}</span>
                    <span className="prescription-notes">{prescription.notes}</span>
                  </div>
                  <div className="prescription-status">
                    <span className={`status-badge ${prescription.status.toLowerCase()}`}>
                      {prescription.status}
                    </span>
                    <ChevronRightIcon className="arrow-icon" />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionOrder;