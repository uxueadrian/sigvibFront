import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LogoutIcon from '@mui/icons-material/Logout';
import ComponentSwitch from './Switch';

import "../styles/ComponenteSidebar.css";

const Sidebar = ({ children, linksArray }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(navigate);
  };

  return (
    <div className="sidebar-layout">
      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <button className="close-btn" onClick={() => setIsOpen(false)}>
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
        {/* Mobile Header */}
        <header className="mobile-header">
          <button className="menu-btn" onClick={() => setIsOpen(true)}>
            <MenuIcon />
          </button>
          <h1>SIGVIB</h1>
        </header>
        
        {/* Page Content */}
        <div className="page-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

