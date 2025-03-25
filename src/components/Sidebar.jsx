import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const adminLinks = (
    <>
      <li><Link to="/admin/dashboard">Dashboard</Link></li>
      <li><Link to="/admin/usuarios">Usuarios</Link></li>
      <li><Link to="/admin/lugares">Lugares</Link></li>
      <li><Link to="/admin/areas">Áreas</Link></li>
      <li><Link to="/admin/categorias">Categorías</Link></li>
      <li><Link to="/admin/bienes">Bienes</Link></li>
      <li><Link to="/admin/bajas">Bajas</Link></li>
    </>
  );

  const responsableLinks = (
    <>
    <li><Link to="/responsable/bienes">Mis Bienes</Link></li>
    <li><Link to="/responsable/asignar">Solicitar</Link></li>
    <li><Link to="/responsable/cargo">Bienes a cargo</Link></li>
    </>
  );

  const becarioLinks = (
    <>
    <li><Link to="/becario/bienes">Bienes Becario</Link></li>
    <li><Link to="/becario/asignar">Solicitar</Link></li>
    </>
  );

  return (
    <div className="sidebar">
      <h2>Menú</h2>
      <ul>
        {user?.role === "ROLE_ADMINISTRADOR" && adminLinks}
        {user?.role === "ROLE_RESPONSABLE" && responsableLinks}
        {user?.role === "ROLE_BECARIO" && becarioLinks}
      </ul>
      <button onClick={handleLogout} className="logout-btn">Cerrar sesión</button>
    </div>
  );
};

export default Sidebar;
