import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css"; // Agregar estilos básicos

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Menú</h2>
      <ul>
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/usuarios">Usuarios</Link>
        </li>
        <li>
          <Link to="/lugares">Lugares</Link>
        </li>
        <li>
          <Link to="/areas">Areas</Link>
        </li>
        <li>
          <Link to="/categorias">Categorias</Link>
        </li>
        <li>
          <Link to="/tipobien">Tipo Bien</Link>
        </li>
        <li>
          <Link to="/modelos">Modelos</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
