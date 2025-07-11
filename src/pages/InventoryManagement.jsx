import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import "./InventoryManagement.css";

const InventoryManagement = () => {
  const [medicines, setMedicines] = useState([
    { id: 1, name: "Paracetamol", stock: 50, expiration: "12/2025" },
    { id: 2, name: "Ibuprofen", stock: 30, expiration: "06/2026" },
  ]);

  const [newMedicine, setNewMedicine] = useState({
    name: "",
    stock: "",
    expiration: "",
  });

  const [editingMedicine, setEditingMedicine] = useState(null);

  // Handle form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMedicine({ ...newMedicine, [name]: value });
  };

  // Handle edit input
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingMedicine({ ...editingMedicine, [name]: value });
  };

  // Add new medicine
  const addMedicine = () => {
    if (
      newMedicine.name.trim() &&
      newMedicine.stock &&
      Number(newMedicine.stock) >= 0 &&
      newMedicine.expiration.match(/^(0[1-9]|1[0-2])\/[0-9]{4}$/)
    ) {
      setMedicines([
        ...medicines,
        { id: Date.now(), ...newMedicine, stock: Number(newMedicine.stock) },
      ]);
      setNewMedicine({ name: "", stock: "", expiration: "" });
    } else {
      alert("Please enter a valid medicine name, non-negative stock, and expiration date (MM/YYYY).");
    }
  };

  // Remove medicine
  const removeMedicine = (id) => {
    setMedicines(medicines.filter((med) => med.id !== id));
    if (editingMedicine?.id === id) setEditingMedicine(null);
  };

  // Start editing a medicine
  const startEditing = (medicine) => {
    setEditingMedicine({ ...medicine });
  };

  // Save edited medicine
  const saveEdit = () => {
    if (
      editingMedicine.name.trim() &&
      editingMedicine.stock &&
      Number(editingMedicine.stock) >= 0 &&
      editingMedicine.expiration.match(/^(0[1-9]|1[0-2])\/[0-9]{4}$/)
    ) {
      setMedicines(
        medicines.map((med) =>
          med.id === editingMedicine.id
            ? { ...editingMedicine, stock: Number(editingMedicine.stock) }
            : med
        )
      );
      setEditingMedicine(null);
    } else {
      alert("Please enter a valid medicine name, non-negative stock, and expiration date (MM/YYYY).");
    }
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingMedicine(null);
  };

  return (
    <div className="inventory-management">
      <h2 className="inventory-title">Inventory Management</h2>

      {/* Add New Medicine Section */}
      <div className="add-medicine-form">
        <input
          type="text"
          name="name"
          placeholder="Medicine Name"
          value={newMedicine.name}
          onChange={handleChange}
          aria-label="Medicine Name"
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={newMedicine.stock}
          onChange={handleChange}
          min="0"
          aria-label="Stock Quantity"
        />
        <input
          type="text"
          name="expiration"
          placeholder="Expiration Date (MM/YYYY)"
          value={newMedicine.expiration}
          onChange={handleChange}
          aria-label="Expiration Date"
        />
        <button className="add-button" onClick={addMedicine} aria-label="Add Medicine">
          <AddIcon className="action-icon" /> Add Medicine
        </button>
      </div>

      {/* Inventory Table */}
      <div className="table-container">
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Stock</th>
              <th>Expiration</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {medicines.length > 0 ? (
              medicines.map((medicine) => (
                <tr key={medicine.id}>
                  <td data-label="Name">
                    {editingMedicine?.id === medicine.id ? (
                      <input
                        type="text"
                        name="name"
                        value={editingMedicine.name}
                        onChange={handleEditChange}
                        aria-label="Edit Medicine Name"
                      />
                    ) : (
                      medicine.name
                    )}
                  </td>
                  <td data-label="Stock">
                    {editingMedicine?.id === medicine.id ? (
                      <input
                        type="number"
                        name="stock"
                        value={editingMedicine.stock}
                        onChange={handleEditChange}
                        min="0"
                        aria-label="Edit Stock Quantity"
                      />
                    ) : (
                      medicine.stock
                    )}
                  </td>
                  <td data-label="Expiration">
                    {editingMedicine?.id === medicine.id ? (
                      <input
                        type="text"
                        name="expiration"
                        value={editingMedicine.expiration}
                        onChange={handleEditChange}
                        aria-label="Edit Expiration Date"
                      />
                    ) : (
                      medicine.expiration
                    )}
                  </td>
                  <td data-label="Actions">
                    {editingMedicine?.id === medicine.id ? (
                      <div className="action-buttons">
                        <button
                          className="save-button"
                          onClick={saveEdit}
                          aria-label="Save Changes"
                        >
                          <SaveIcon className="action-icon" /> Save
                        </button>
                        <button
                          className="cancel-button"
                          onClick={cancelEdit}
                          aria-label="Cancel Edit"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="action-buttons">
                        <button
                          className="edit-button"
                          onClick={() => startEditing(medicine)}
                          aria-label={`Edit ${medicine.name}`}
                        >
                          <EditIcon className="action-icon" /> Edit
                        </button>
                        <button
                          className="remove-button"
                          onClick={() => removeMedicine(medicine.id)}
                          aria-label={`Remove ${medicine.name}`}
                        >
                          <DeleteIcon className="action-icon" /> Remove
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center", padding: "1rem" }}>
                  No medicines found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryManagement;