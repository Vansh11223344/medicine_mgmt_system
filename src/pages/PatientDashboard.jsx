import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import MedicineCard from "../components/MedicineCard";
import Notification from "../components/Notification";
import "./PatientDashboard.css";

const PatientDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const medicines = [
    {
      id: "MED001",
      name: "Paracetamol",
      category: "Pain Relief",
      stock: 0,
      manufacturer: "PharmaCo",
      image: "/images/para.webp",
      prescriptionRequired: false,
    },
    {
      id: "MED002",
      name: "Ibuprofen",
      category: "Anti-Inflammatory",
      stock: 5,
      manufacturer: "HealthMed",
      image: "/images/para.webp",
      prescriptionRequired: true,
    },
    {
      id: "MED003",
      name: "Amoxicillin",
      category: "Antibiotic",
      stock: 10,
      manufacturer: "BioPharm",
      image: "/images/para.webp",
      prescriptionRequired: true,
    },
    {
      id: "MED004",
      name: "Cetirizine",
      category: "Antihistamine",
      stock: 15,
      manufacturer: "AllergyFree",
     image: "/images/para.webp",
      prescriptionRequired: false,
    },
    {
      id: "MED005",
      name: "Omeprazole",
      category: "Antacid",
      stock: 8,
      manufacturer: "GastroHealth",
      image: "/images/para.webp",
      prescriptionRequired: false,
    },
    {
      id: "MED006",
      name: "Loratadine",
      category: "Antihistamine",
      stock: 0,
      manufacturer: "AllergyFree",
     image: "/images/para.webp",
      prescriptionRequired: false,
    },
  ];

  const filteredMedicines = medicines.filter((med) => {
    const matchesSearch =
      med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      activeFilter === "all" ||
      (activeFilter === "outOfStock" && med.stock === 0) ||
      (activeFilter === "prescription" && med.prescriptionRequired);

    return matchesSearch && matchesFilter;
  });

  const categories = [...new Set(medicines.map((med) => med.category))];

  return (
    <div className="patient-dashboard">
      <header className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Medication Overview</h1>
          <p className="dashboard-subtitle">Manage your medications and prescriptions</p>
        </div>
        <div className="user-avatar" aria-label="User Profile">
          <span>PD</span>
        </div>
      </header>

      <div className="dashboard-controls">
        <div className="search-container">
          <SearchIcon className="search-icon" />
          <input
            type="text"
            placeholder="Search medicines or categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            aria-label="Search Medicines"
          />
        </div>

        <div className="filter-buttons">
          <button
            className={`filter-btn ${activeFilter === "all" ? "active" : ""}`}
            onClick={() => setActiveFilter("all")}
            aria-label="Show All Medicines"
          >
            All Medicines
          </button>
          <button
            className={`filter-btn ${activeFilter === "outOfStock" ? "active" : ""}`}
            onClick={() => setActiveFilter("outOfStock")}
            aria-label="Show Out of Stock Medicines"
          >
            Out of Stock
          </button>
          <button
            className={`filter-btn ${activeFilter === "prescription" ? "active" : ""}`}
            onClick={() => setActiveFilter("prescription")}
            aria-label="Show Prescription Only Medicines"
          >
            Prescription Only
          </button>
        </div>
      </div>

      {medicines.some((med) => med.stock === 0) && (
        <Notification
          type="warning"
          message="Some medicines are out of stock. Set restock notifications?"
          onClose={() => console.log("Notification closed")}
          actionText="Notify Me"
          onAction={() => console.log("Notification action triggered")}
        />
      )}

      <div className="category-chips">
        {categories.map((category) => (
          <button
            key={category}
            className="category-chip"
            onClick={() => setSearchTerm(category)}
            aria-label={`Filter by ${category}`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="medicine-section">
        <h3 className="section-title">Available Medications</h3>
        <div className="medicine-grid-container">
          {filteredMedicines.length > 0 ? (
            <div className="medicine-grid">
              {filteredMedicines.map((med) => (
                <MedicineCard
                  key={med.id}
                  {...med}
                  onAddToCart={() => console.log(`Added ${med.name} to cart`)}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="var(--text-secondary)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 8V12"
                  stroke="var(--text-secondary)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 16H12.01"
                  stroke="var(--text-secondary)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h4>No Medicines Found</h4>
              <p>Try adjusting your search or filter criteria.</p>
              <button
                className="reset-filters"
                onClick={() => {
                  setSearchTerm("");
                  setActiveFilter("all");
                }}
                aria-label="Reset Filters"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;