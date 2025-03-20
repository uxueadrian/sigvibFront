import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/SideBar";
import Usuarios from "./modules/admin/pages/Usuarios";
import Lugares from "./modules/admin/pages/Lugares";
import Areas from "./modules/admin/pages/Areas";
import Categorias from "./modules/admin/pages/Categorias";
import TipoBien from "./modules/admin/pages/TipoBien";
import Modelos from "./modules/admin/pages/Modelos";



// Simulación de páginas
const Inicio = () => <h1>Bienvenido al Inicio</h1>;

const Configuracion = () => <h1>Configuración</h1>;

const App = () => {
  return (
    
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ marginLeft: "220px", padding: "40px", width: "100%" }}>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="usuarios" element={<Usuarios />} />
            <Route path="/lugares" element={<Lugares />} />
            <Route path="/areas" element={<Configuracion />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/tipobien" element={<TipoBien />} />
            <Route path="/modelos" element={<Modelos />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
