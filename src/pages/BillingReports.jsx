import React, { useState } from "react";
import { FiFilter, FiSearch, FiFileText } from "react-icons/fi";
import DownloadIcon from "@mui/icons-material/Download";
import PrintIcon from "@mui/icons-material/Print";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "./BillingReports.css";

const BillingReports = () => {
  const initialOrders = [
    {
      id: 12345,
      date: "03/20/2025",
      total: 15.00,
      status: "Completed",
      items: [
        { name: "Basic T-Shirt", quantity: 2, price: 6.00 },
        { name: "Cap", quantity: 1, price: 3.00 },
      ],
      customer: "John Doe",
      paymentMethod: "Credit Card",
      orderType: "Online",
      invoiceNumber: "INV-2025-001",
    },
    {
      id: 12344,
      date: "03/18/2025",
      total: 28.50,
      status: "Completed",
      items: [
        { name: "Sneakers", quantity: 1, price: 20.00 },
        { name: "Socks", quantity: 4, price: 2.125 },
      ],
      customer: "Jane Smith",
      paymentMethod: "PayPal",
      orderType: "In-Store",
      invoiceNumber: "INV-2025-002",
    },
    {
      id: 12343,
      date: "03/15/2025",
      total: 42.75,
      status: "Refunded",
      items: [
        { name: "Jacket", quantity: 1, price: 40.00 },
        { name: "Scarf", quantity: 1, price: 2.75 },
      ],
      customer: "Alice Johnson",
      paymentMethod: "Debit Card",
      orderType: "Online",
      invoiceNumber: "INV-2025-003",
    },
    {
      id: 12342,
      date: "03/10/2025",
      total: 19.99,
      status: "Completed",
      items: [
        { name: "Headphones", quantity: 1, price: 15.99 },
        { name: "Cable", quantity: 1, price: 4.00 },
      ],
      customer: "Bob Wilson",
      paymentMethod: "Credit Card",
      orderType: "Online",
      invoiceNumber: "INV-2025-004",
    },
    {
      id: 12341,
      date: "03/05/2025",
      total: 63.20,
      status: "Processing",
      items: [
        { name: "Laptop Bag", quantity: 1, price: 45.00 },
        { name: "Mouse", quantity: 2, price: 9.10 },
      ],
      customer: "Emma Brown",
      paymentMethod: "Bank Transfer",
      orderType: "In-Store",
      invoiceNumber: "INV-2025-005",
    },
    {
      id: 12340,
      date: "02/28/2025",
      total: 89.99,
      status: "Shipped",
      items: [
        { name: "Smartphone", quantity: 1, price: 79.99 },
        { name: "Case", quantity: 1, price: 10.00 },
      ],
      customer: "Michael Lee",
      paymentMethod: "Apple Pay",
      orderType: "Online",
      invoiceNumber: "INV-2025-006",
    },
    {
      id: 12339,
      date: "02/20/2025",
      total: 125.30,
      status: "Pending",
      items: [
        { name: "Wireless Mouse", quantity: 2, price: 25.99 },
        { name: "USB-C Cable", quantity: 1, price: 14.99 },
        { name: "Keyboard", quantity: 1, price: 58.32 },
      ],
      customer: "Sarah Davis",
      paymentMethod: "Stripe",
      orderType: "Online",
      invoiceNumber: "INV-2025-007",
    },
  ];

  const [orders, setOrders] = useState(initialOrders);
  const [sortConfig, setSortConfig] = useState({ key: "date", direction: "desc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 5;

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toString().includes(searchTerm) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortData = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });

    const sortedOrders = [...orders].sort((a, b) => {
      let aValue = a[key];
      let bValue = b[key];
      if (key === "date") {
        aValue = new Date(aValue.split("/").reverse().join("-"));
        bValue = new Date(bValue.split("/").reverse().join("-"));
      }
      if (aValue < bValue) return direction === "asc" ? -1 : 1;
      if (aValue > bValue) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setOrders(sortedOrders);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const downloadBill = (order) => {
    try {
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text("Invoice", 14, 20);
      doc.setFontSize(10);
      doc.text("Your Company Name", 14, 30);
      doc.text("123 Business St, City, Country", 14, 35);
      doc.text("Email: contact@company.com", 14, 40);
      doc.setFontSize(12);
      doc.text(`Invoice Number: ${order.invoiceNumber}`, 14, 50);
      doc.text(`Order ID: #${order.id}`, 14, 60);
      doc.text(`Customer: ${order.customer}`, 14, 70);
      doc.text(`Date: ${order.date}`, 14, 80);
      doc.text(`Total: $${order.total.toFixed(2)}`, 14, 90);
      doc.text(`Status: ${order.status}`, 14, 100);
      doc.text(`Payment Method: ${order.paymentMethod}`, 14, 110);
      doc.text(`Order Type: ${order.orderType}`, 14, 120);

      autoTable(doc, {
        startY: 130,
        head: [["Item", "Quantity", "Price", "Total"]],
        body: order.items.map((item) => [
          item.name,
          item.quantity,
          `$${item.price.toFixed(2)}`,
          `$${(item.quantity * item.price).toFixed(2)}`,
        ]),
        theme: "striped",
        headStyles: { fillColor: [79, 70, 229] },
      });

      doc.save(`invoice_${order.invoiceNumber}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  const printBill = (orderId) => {
    console.log(`Printing bill for order #${orderId}`);
    window.print();
  };

  return (
    <div className="billing-reports">
      <header className="reports-header">
        <div className="header-content">
          <h1 className="reports-title">
            <FiFileText className="title-icon" />
            Billing & Reports
          </h1>
          <p className="reports-subtitle">View and manage your order history and invoices</p>
        </div>
        <div className="header-actions">
          <button className="export-btn">
            <DownloadIcon className="btn-icon" />
            Export All
          </button>
        </div>
      </header>

      <div className="reports-controls">
        <div className="search-filter">
          <div className="search-container">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by order ID, customer, or invoice..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="filter-btn">
            <FiFilter className="btn-icon" />
            Advanced Filters
          </button>
        </div>
        <div className="date-range">
          <select className="date-select">
            <option>Last 30 days</option>
            <option>Last 3 months</option>
            <option>Last 6 months</option>
            <option>This Year</option>
            <option>Custom range</option>
          </select>
        </div>
      </div>

      <div className="summary-stats">
        <div className="stat-card">
          <span className="stat-label">Total Orders</span>
          <span className="stat-value">{filteredOrders.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Total Revenue</span>
          <span className="stat-value">
            ${filteredOrders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
          </span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Completed Orders</span>
          <span className="stat-value">
            {filteredOrders.filter((order) => order.status === "Completed").length}
          </span>
        </div>
      </div>

      <div className="reports-card">
        <div className="card-header">
          <h2 className="card-title">Order History</h2>
          <span className="total-orders">{filteredOrders.length} orders</span>
        </div>

        <div className="table-container">
          <table className="reports-table">
            <thead>
              <tr>
                <th onClick={() => sortData("date")}>
                  Date {sortConfig.key === "date" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                </th>
                <th onClick={() => sortData("id")}>
                  Order ID {sortConfig.key === "id" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                </th>
                <th onClick={() => sortData("invoiceNumber")}>
                  Invoice {sortConfig.key === "invoiceNumber" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                </th>
                <th onClick={() => sortData("customer")}>
                  Customer {sortConfig.key === "customer" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                </th>
                <th>Items</th>
                <th onClick={() => sortData("total")}>
                  Total {sortConfig.key === "total" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                </th>
                <th onClick={() => sortData("status")}>
                  Status {sortConfig.key === "status" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                </th>
                <th>Payment</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.length > 0 ? (
                currentOrders.map((order) => (
                  <tr key={order.id}>
                    <td data-label="Date">{order.date}</td>
                    <td data-label="Order ID">#{order.id}</td>
                    <td data-label="Invoice">{order.invoiceNumber}</td>
                    <td data-label="Customer">{order.customer}</td>
                    <td data-label="Items">{order.items.length} items</td>
                    <td data-label="Total">${order.total.toFixed(2)}</td>
                    <td data-label="Status">
                      <span className={`status-badge ${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </td>
                    <td data-label="Payment">{order.paymentMethod}</td>
                    <td data-label="Type">{order.orderType}</td>
                    <td data-label="Actions">
                      <div className="action-buttons">
                        <button
                          className="action-btn download"
                          onClick={() => downloadBill(order)}
                          title="Download Invoice"
                        >
                          <DownloadIcon className="action-icon" />
                        </button>
                        <button
                          className="action-btn print"
                          onClick={() => printBill(order.id)}
                          title="Print Invoice"
                        >
                          <PrintIcon className="action-icon" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" style={{ textAlign: "center", padding: "1rem" }}>
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="table-footer">
          <div className="showing-entries">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredOrders.length)} of{" "}
            {filteredOrders.length} entries
          </div>
          <div className="pagination">
            <button
              className={`page-btn ${currentPage === 1 ? "disabled" : ""}`}
              onClick={() => paginate(currentPage - 1)}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}
                onClick={() => paginate(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className={`page-btn ${currentPage === totalPages ? "disabled" : ""}`}
              onClick={() => paginate(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingReports;