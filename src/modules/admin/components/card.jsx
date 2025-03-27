// src/components/Card.jsx
import React from "react";
import "../styles/Card.css"; // Importamos los estilos

const Card = ({ title, amount, change, isPositive, icon, bgColor }) => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="icon" style={{ backgroundColor: bgColor }}>{icon}</div>
        <div className="options">⋮</div>
      </div>
      <h3>{title}</h3>
      <p className="amount">{amount.toLocaleString()}</p>
      <p className={`change ${isPositive ? "positive" : "negative"}`}>
        <span className="arrow">{isPositive ? "⬆" : "⬇"}</span>
        {change}%
      </p>
    </div>
  );
};

export default Card;
