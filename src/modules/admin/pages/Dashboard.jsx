import React from "react";
import Card from "../components/Card";
import "../styles/Dashboard.css";

// Componentes del Dashboard
import AlertasRenovacion from "../../../components/AlertasRenovacion";
import BienesChart from "../../../components/BienesChart";
import BienesConFallas from "../../../components/BienesConFallas";
import BienesMalEstado from "../../../components/BienesMalEstado";
import RankingResponsables from "../../../components/RankingResponsables";

const data = [
  { title: "Bienes", amount: 500, change: 72.8, isPositive: true, icon: "📦" },
  { title: "Responsables", amount: 20, change: 28.42, isPositive: true, icon: "🧑‍💻" },
  { title: "Becarios", amount: 100, change: -14.82, isPositive: false, icon: "🎓" },
  { title: "Transacciones", amount: 14857, change: 28.14, isPositive: true, icon: "🔄" },
];

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Sección de tarjetas de información */}
      <div className="cards-container">
        {data.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>

      {/* Sección de datos y reportes */}
      <div className="grid-container">
        <div className="grid-item full-width"><AlertasRenovacion /></div>
        <div className="grid-item"><BienesChart /></div>
        <div className="grid-item"><BienesConFallas /></div>
        <div className="grid-item"><BienesMalEstado /></div>
        <div className="grid-item full-width"><RankingResponsables /></div>
      </div>
    </div>
  );
};

export default Dashboard;
