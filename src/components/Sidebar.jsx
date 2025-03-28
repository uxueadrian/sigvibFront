import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LogoutIcon from '@mui/icons-material/Logout';
import ComponentSwitch from './Switch';
import "../styles/ComponenteSidebar.css";

const Sidebar = ({ children, linksArray }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isOpen, setIsOpen] = useState(!isMobile); // Abierto por defecto en desktop
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      // Si cambiamos de móvil a desktop o viceversa, ajustar el estado
      if (!mobile && !isOpen) {
        setIsOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); 
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]); //Cuando es mobile me permite abrirlo y cerrarlo con el boton de hamburguesa, pero cuando es close se que da fijo y no me deja ni abrirlo ni cerrarlo

  const handleLogout = () => {
    logout(navigate);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sidebar-layout">
      {/* AppBar único para todas las vistas */}
      <header className="app-bar">
        <button 
          className="menu-btn" 
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <MenuIcon />
        </button>
        <h1>SIGVIB</h1>
      </header>

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <button className="close-btn" onClick={toggleSidebar}>
            <ChevronLeftIcon />
          </button>
        </div>
        
        <nav className="sidebar-nav">
          {linksArray.map(({ icon, label, to }) => (
            <NavLink
              to={to}
              key={label}
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              {icon}
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <LogoutIcon style={{ fontSize: '1.1rem' }} />
            <span>Cerrar sesión</span>
          </button>
          <div className="theme-switch">
            <span>Cambio de modo:</span>
            <ComponentSwitch />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`main-content ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="page-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;