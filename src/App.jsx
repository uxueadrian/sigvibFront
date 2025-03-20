import React, { useContext } from "react";
import Sidebar from "./components/Sidebar";
import { AuthContext } from "./context/AuthContext";
import { becarioLinks } from "../src/routers/links";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SolicitarBienBecario from "../src/pages/becario/SolicitarBienBecario";
import BienesBecario from "../src/pages/becario/BienesBecario";

function App() {
  const { user } = useContext(AuthContext);
  const userRole = user ? user.role : "becario"; // Por ahora, forzamos el rol de becario

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <Sidebar linksArray={becarioLinks} />

      {/* Contenido principal */}
      <div style={{ flexGrow: 1, padding: "20px" }}>
        <Routes>
          <Route path="/bienesBecario" element={<BienesBecario />} />
          <Route path="/solicitarBienBecario" element={<SolicitarBienBecario />} />
          {/* Otras rutas del becario */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
