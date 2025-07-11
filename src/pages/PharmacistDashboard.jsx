import React from "react";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import WarningIcon from "@mui/icons-material/Warning";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import InventoryIcon from "@mui/icons-material/Inventory";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AddBoxIcon from "@mui/icons-material/AddBox";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import "./PharmacistDashboard.css";

const PharmacistDashboard = () => {
  // Sample data - in a real app this would come from API/state
  const stats = {
    lowStock: 5,
    expiringSoon: 2,
    pendingOrders: 3,
    todaySales: 1245.50,
    monthlyGrowth: 12.4,
    newPrescriptions: 7,
  };

  const recentOrders = [
    { id: 1001, customer: "John Smith", status: "Processing", amount: 42.75 },
    { id: 1002, customer: "Sarah Johnson", status: "Ready for Pickup", amount: 28.50 },
    { id: 1003, customer: "Michael Brown", status: "Processing", amount: 63.20 },
  ];

  const inventoryAlerts = [
    { medicine: "Paracetamol 500mg", remaining: 8, threshold: 15 },
    { medicine: "Ibuprofen 200mg", remaining: 5, threshold: 10 },
    { medicine: "Amoxicillin 250mg", remaining: 3, threshold: 5 },
  ];

  return (
    <div className="pharmacist-dashboard">
      <div className="content-container">
        <header className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Pharmacy Dashboard</h1>
            <p className="dashboard-subtitle">Welcome back! Here's your daily overview</p>
          </div>
          <div className="header-actions">
            <button className="notification-btn" aria-label="Notifications">
              <span className="notification-badge">3</span>
              <NotificationsActiveIcon className="notification-icon" />
            </button>
            <div className="user-profile">
              <span className="user-avatar">PM</span>
              <span className="user-name">Pharmacist</span>
            </div>
          </div>
        </header>

        <div className="stats-grid">
          {/* Inventory Alerts */}
          <div className="stat-card alert">
            <div className="stat-icon">
              <WarningIcon />
            </div>
            <div className="stat-content">
              <h3>Inventory Alerts</h3>
              <p className="stat-value">{stats.lowStock} medicines low in stock</p>
              <p className="stat-value">{stats.expiringSoon} medicines expiring soon</p>
            </div>
          </div>

          {/* Pending Orders */}
          <div className="stat-card warning">
            <div className="stat-icon">
              <AccessTimeIcon />
            </div>
            <div className="stat-content">
              <h3>Pending Orders</h3>
              <p className="stat-value">{stats.pendingOrders} orders to fulfill</p>
              <button className="stat-action" aria-label="View All Pending Orders">
                View All
              </button>
            </div>
          </div>

          {/* Today's Sales */}
          <div className="stat-card">
            <div className="stat-icon">
              <InventoryIcon />
            </div>
            <div className="stat-content">
              <h3>Today's Sales</h3>
              <p className="stat-value">${stats.todaySales.toFixed(2)}</p>
              <p className="stat-trend positive">+5.2% from yesterday</p>
            </div>
          </div>

          {/* Monthly Growth */}
          <div className="stat-card">
            <div className="stat-icon">
              <TrendingUpIcon />
            </div>
            <div className="stat-content">
              <h3>Monthly Growth</h3>
              <p className="stat-value">+{stats.monthlyGrowth}%</p>
              <p className="stat-trend positive">+2.1% from last month</p>
            </div>
          </div>
        </div>

        <div className="content-grid">
          {/* Recent Orders */}
          <div className="content-card">
            <div className="card-header">
              <h3>Recent Orders</h3>
              <button className="view-all" aria-label="View All Orders">
                View All
              </button>
            </div>
            <div className="orders-table">
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Status</th>
                    <th>Amount</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td>#{order.id}</td>
                      <td>{order.customer}</td>
                      <td>
                        <span className={`status-badge ${order.status.toLowerCase().replace(/\s+/g, '-')}`}>
                          {order.status}
                        </span>
                      </td>
                      <td>${order.amount.toFixed(2)}</td>
                      <td>
                        <button className="action-btn" aria-label={`Process order ${order.id}`}>
                          Process
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Inventory Alerts */}
          <div className="content-card">
            <div className="card-header">
              <h3>Low Stock Items</h3>
              <button className="view-all" aria-label="Manage Inventory">
                Manage Inventory
              </button>
            </div>
            <div className="inventory-list">
              {inventoryAlerts.map((item, index) => (
                <div key={index} className="inventory-item">
                  <div className="medicine-info">
                    <span className="medicine-name">{item.medicine}</span>
                    <span className="stock-level">
                      {item.remaining} remaining (threshold: {item.threshold})
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${(item.remaining / item.threshold) * 100}%` }}
                    ></div>
                  </div>
                  <button className="reorder-btn" aria-label={`Reorder ${item.medicine}`}>
                    Reorder
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="action-buttons">
            <button className="action-btn" aria-label="Create New Order">
              <AddBoxIcon className="action-icon" />
              <span>New Order</span>
            </button>
            <button className="action-btn" aria-label="Add New Customer">
              <GroupAddIcon className="action-icon" />
              <span>Add Customer</span>
            </button>
            <button className="action-btn" aria-label="Schedule Appointment">
              <CalendarTodayIcon className="action-icon" />
              <span>Schedule</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacistDashboard;