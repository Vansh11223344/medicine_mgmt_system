import React, { useState } from "react";
import {
  FiUsers,
  FiShoppingCart,
  FiDollarSign,
  FiActivity,
  FiTrendingUp,
  FiAlertCircle,
  FiUserCheck,
  FiBox,
  FiCheckSquare,
  FiBarChart2,
} from "react-icons/fi";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import "./AdminDashboard.css";

const statsData = {
  '7': [
    { title: "Total Users", value: 1280, change: "+2.1%", trend: "up", icon: <FiUsers className="stat-icon" /> },
    { title: "Active Orders", value: 340, change: "+1.8%", trend: "up", icon: <FiShoppingCart className="stat-icon" /> },
    { title: "Revenue", value: "$11,800", change: "+3.5%", trend: "up", icon: <FiDollarSign className="stat-icon" /> },
    { title: "Active Sessions", value: 92, change: "-0.8%", trend: "down", icon: <FiActivity className="stat-icon" /> },
  ],
  '30': [
    { title: "Total Users", value: 1350, change: "+4.7%", trend: "up", icon: <FiUsers className="stat-icon" /> },
    { title: "Active Orders", value: 320, change: "+2.1%", trend: "up", icon: <FiShoppingCart className="stat-icon" /> },
    { title: "Revenue", value: "$48,900", change: "+8.3%", trend: "up", icon: <FiDollarSign className="stat-icon" /> },
    { title: "Active Sessions", value: 87, change: "-1.2%", trend: "down", icon: <FiActivity className="stat-icon" /> },
  ],
  '90': [
    { title: "Total Users", value: 1480, change: "+9.2%", trend: "up", icon: <FiUsers className="stat-icon" /> },
    { title: "Active Orders", value: 410, change: "+3.5%", trend: "up", icon: <FiShoppingCart className="stat-icon" /> },
    { title: "Revenue", value: "$132,400", change: "+15.1%", trend: "up", icon: <FiDollarSign className="stat-icon" /> },
    { title: "Active Sessions", value: 98, change: "+2.3%", trend: "up", icon: <FiActivity className="stat-icon" /> },
  ],
};

const revenueData = {
  '7': [
    { date: 'Day 1', revenue: 1200 },
    { date: 'Day 2', revenue: 1500 },
    { date: 'Day 3', revenue: 1700 },
    { date: 'Day 4', revenue: 1400 },
    { date: 'Day 5', revenue: 1800 },
    { date: 'Day 6', revenue: 2000 },
    { date: 'Day 7', revenue: 2200 },
  ],
  '30': [
    { date: 'Day 1', revenue: 1150 }, { date: 'Day 2', revenue: 1300 }, { date: 'Day 3', revenue: 1450 },
    { date: 'Day 4', revenue: 1600 }, { date: 'Day 5', revenue: 1250 }, { date: 'Day 6', revenue: 1400 },
    { date: 'Day 7', revenue: 1550 }, { date: 'Day 8', revenue: 1700 }, { date: 'Day 9', revenue: 1850 },
    { date: 'Day 10', revenue: 1500 }, { date: 'Day 11', revenue: 1650 }, { date: 'Day 12', revenue: 1800 },
    { date: 'Day 13', revenue: 1950 }, { date: 'Day 14', revenue: 2100 }, { date: 'Day 15', revenue: 1750 },
    { date: 'Day 16', revenue: 1900 }, { date: 'Day 17', revenue: 2050 }, { date: 'Day 18', revenue: 2200 },
    { date: 'Day 19', revenue: 2350 }, { date: 'Day 20', revenue: 2000 }, { date: 'Day 21', revenue: 2150 },
    { date: 'Day 22', revenue: 2300 }, { date: 'Day 23', revenue: 2450 }, { date: 'Day 24', revenue: 2600 },
    { date: 'Day 25', revenue: 2250 }, { date: 'Day 26', revenue: 2400 }, { date: 'Day 27', revenue: 2550 },
    { date: 'Day 28', revenue: 2700 }, { date: 'Day 29', revenue: 2850 }, { date: 'Day 30', revenue: 2500 },
  ],
  '90': [
    { date: 'Day 1', revenue: 1010 }, { date: 'Day 2', revenue: 1120 }, { date: 'Day 3', revenue: 1230 },
    { date: 'Day 4', revenue: 1340 }, { date: 'Day 5', revenue: 1450 }, { date: 'Day 6', revenue: 1560 },
    { date: 'Day 7', revenue: 1110 }, { date: 'Day 8', revenue: 1220 }, { date: 'Day 9', revenue: 1330 },
    { date: 'Day 10', revenue: 1440 }, { date: 'Day 11', revenue: 1550 }, { date: 'Day 12', revenue: 1660 },
    { date: 'Day 13', revenue: 1770 }, { date: 'Day 14', revenue: 1320 }, { date: 'Day 15', revenue: 1430 },
    { date: 'Day 16', revenue: 1540 }, { date: 'Day 17', revenue: 1650 }, { date: 'Day 18', revenue: 1760 },
    { date: 'Day 19', revenue: 1870 }, { date: 'Day 20', revenue: 1980 }, { date: 'Day 21', revenue: 1530 },
    { date: 'Day 22', revenue: 1640 }, { date: 'Day 23', revenue: 1750 }, { date: 'Day 24', revenue: 1860 },
    { date: 'Day 25', revenue: 1970 }, { date: 'Day 26', revenue: 2080 }, { date: 'Day 27', revenue: 2190 },
    { date: 'Day 28', revenue: 1740 }, { date: 'Day 29', revenue: 1850 }, { date: 'Day 30', revenue: 1960 },
    { date: 'Day 31', revenue: 2070 }, { date: 'Day 32', revenue: 2180 }, { date: 'Day 33', revenue: 2290 },
    { date: 'Day 34', revenue: 2400 }, { date: 'Day 35', revenue: 1950 }, { date: 'Day 36', revenue: 2060 },
    { date: 'Day 37', revenue: 2170 }, { date: 'Day 38', revenue: 2280 }, { date: 'Day 39', revenue: 2390 },
    { date: 'Day 40', revenue: 2500 }, { date: 'Day 41', revenue: 2610 }, { date: 'Day 42', revenue: 2160 },
    { date: 'Day 43', revenue: 2270 }, { date: 'Day 44', revenue: 2380 }, { date: 'Day 45', revenue: 2490 },
    { date: 'Day 46', revenue: 2600 }, { date: 'Day 47', revenue: 2710 }, { date: 'Day 48', revenue: 2820 },
    { date: 'Day 49', revenue: 2370 }, { date: 'Day 50', revenue: 2480 }, { date: 'Day 51', revenue: 2590 },
    { date: 'Day 52', revenue: 2700 }, { date: 'Day 53', revenue: 2810 }, { date: 'Day 54', revenue: 2920 },
    { date: 'Day 55', revenue: 3030 }, { date: 'Day 56', revenue: 2580 }, { date: 'Day 57', revenue: 2690 },
    { date: 'Day 58', revenue: 2800 }, { date: 'Day 59', revenue: 2910 }, { date: 'Day 60', revenue: 3020 },
    { date: 'Day 61', revenue: 3130 }, { date: 'Day 62', revenue: 3240 }, { date: 'Day 63', revenue: 2790 },
    { date: 'Day 64', revenue: 2900 }, { date: 'Day 65', revenue: 3010 }, { date: 'Day 66', revenue: 3120 },
    { date: 'Day 67', revenue: 3230 }, { date: 'Day 68', revenue: 3340 }, { date: 'Day 69', revenue: 3450 },
    { date: 'Day 70', revenue: 3000 }, { date: 'Day 71', revenue: 3110 }, { date: 'Day 72', revenue: 3220 },
    { date: 'Day 73', revenue: 3330 }, { date: 'Day 74', revenue: 3440 }, { date: 'Day 75', revenue: 3550 },
    { date: 'Day 76', revenue: 3660 }, { date: 'Day 77', revenue: 3210 }, { date: 'Day 78', revenue: 3320 },
    { date: 'Day 79', revenue: 3430 }, { date: 'Day 80', revenue: 3540 }, { date: 'Day 81', revenue: 3650 },
    { date: 'Day 82', revenue: 3760 }, { date: 'Day 83', revenue: 3870 }, { date: 'Day 84', revenue: 3420 },
    { date: 'Day 85', revenue: 3530 }, { date: 'Day 86', revenue: 3640 }, { date: 'Day 87', revenue: 3750 },
    { date: 'Day 88', revenue: 3860 }, { date: 'Day 89', revenue: 3970 }, { date: 'Day 90', revenue: 4080 },
  ],
};

const recentActivities = [
  { id: 1, user: "Anna Lee", action: "approved a refund", time: "5 mins ago", icon: <FiCheckSquare /> },
  { id: 2, user: "John Doe", action: "added new product", time: "20 mins ago", icon: <FiBox /> },
  { id: 3, user: "Sarah Smith", action: "registered", time: "1 hour ago", icon: <FiUserCheck /> },
  { id: 4, user: "Admin", action: "updated sales report", time: "2 hours ago", icon: <FiBarChart2 /> },
];

const topProducts = [
  { name: "Premium Plan", sales: 120, revenue: "$14,400" },
  { name: "Standard Plan", sales: 95, revenue: "$8,550" },
  { name: "Basic Plan", sales: 60, revenue: "$3,600" },
];

const dateRanges = [
  { label: "Last 7 days", value: "7" },
  { label: "Last 30 days", value: "30" },
  { label: "Last 90 days", value: "90" },
];

const AdminDashboard = () => {
  const [selectedRange, setSelectedRange] = useState("30");

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Management Dashboard</h1>
          <p className="dashboard-subtitle">
            Welcome back! Here’s your professional system overview.
          </p>
        </div>
        <div className="header-actions">
          <select
            className="date-filter"
            value={selectedRange}
            onChange={e => setSelectedRange(e.target.value)}
          >
            {dateRanges.map(range => (
              <option key={range.value} value={range.value}>{range.label}</option>
            ))}
          </select>
        </div>
      </header>

      <div className="stats-grid">
        {statsData[selectedRange].map((stat, idx) => (
          <div key={idx} className="stat-card">
            <div className="stat-icon-container">{stat.icon}</div>
            <div className="stat-content">
              <h3 className="stat-title">{stat.title}</h3>
              <p className="stat-value">{stat.value}</p>
              <div className={`stat-change ${stat.trend}`}>
                {stat.change}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  {stat.trend === "up" ? (
                    <path d="M12 19V5M5 12l7-7 7 7" />
                  ) : (
                    <path d="M12 5v14M19 12l-7 7-7-7" />
                  )}
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-content">
        <div className="main-content">
          <div className="content-card">
            <div className="card-header">
              <h3>Revenue Overview</h3>
              <button className="view-report">View Report</button>
            </div>
            <div className="chart-placeholder" style={{ height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData[selectedRange]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" hide={selectedRange !== "7"} />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="content-card">
            <div className="card-header">
              <h3>Top Products</h3>
            </div>
            <table className="products-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Sales</th>
                  <th>Revenue</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((product, idx) => (
                  <tr key={idx}>
                    <td>{product.name}</td>
                    <td>{product.sales}</td>
                    <td>{product.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="sidebar">
          <div className="content-card">
            <div className="card-header">
              <h3>Recent Activity</h3>
            </div>
            <div className="activity-list">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-icon">{activity.icon}</div>
                  <div className="activity-details">
                    <p>
                      <span className="activity-user">{activity.user}</span> {activity.action}
                    </p>
                    <p className="activity-time">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
