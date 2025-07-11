import React from "react";
import "./Notification.css";

const Notification = ({ type, message, onClose }) => {
  return (
    <div className={`notification ${type}`}>
      <div className="notification-content">
        <span className="notification-icon">
          {type === "success" && "✅"}
          {type === "error" && "❌"}
          {type === "warning" && "⚠️"}
          {type === "info" && "ℹ️"}
        </span>
        <p>{message}</p>
      </div>
      {onClose && (
        <button onClick={onClose} className="notification-close">
          ✕
        </button>
      )}
    </div>
  );
};

export default Notification;