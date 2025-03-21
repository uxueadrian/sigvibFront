import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Importamos useNavigate
import "./Sidebar.css"; // Agregar estilos básicos

const Sidebar = () => {
  const navigate = useNavigate(); // Inicializamos useNavigate

  const handleLogout = () => {
    // Eliminar el token del almacenamiento local
    localStorage.removeItem("token");

    // Redirigir al login
    navigate("/login");
  };

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
      </ul>
      {/* Agregar el botón de cerrar sesión */}
      <button onClick={handleLogout} className="logout-btn">Cerrar sesión</button>
    </div>
  );
};

export default Sidebar;
