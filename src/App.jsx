import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import { AuthContext, AuthProvider } from "./context/AuthContext";  
import Areas from "./modules/admin/pages/Areas";
import Dashboard from "./modules/admin/pages/Dashboard";
import BienesResponsable from "./modules/responsable/pages/BienesResponsable";
import CargoResponsable from "./modules/responsable/pages/CargoResponsable";
import BienesBecario from "./modules/becario/pages/BienesBecario";
import SolicitarBienBecario from "./modules/becario/pages/SolicitarBienBecario";
import SolicitarBienResponsable from "./modules/responsable/pages/SolicitarBienResponsable";
import Usuarios from "./modules/admin/pages/Usuarios";
import Categorias from "./modules/admin/pages/Categorias";
import Lugares from "./modules/admin/pages/Lugares";
import Marcas from "./modules/admin/pages/Marcas";
import Modelos from "./modules/admin/pages/Modelos";
import TipoBien from "./modules/admin/pages/TipoBien";
import Bajas from "./modules/admin/pages/Bajas"; 
import Bienes from "./modules/admin/pages/Bienes"; // Importa la nueva pantalla
import Sidebar from "./components/SideBar";

const Inicio = () => <h1>Bienvenido al Inicio</h1>;

const AdminRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user?.role === "ROLE_ADMINISTRADOR" ? children : <Navigate to="/" />;
};

const ResponsableRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user?.role === "ROLE_RESPONSABLE" ? children : <Navigate to="/" />;
};

const BecarioRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user?.role === "ROLE_BECARIO" ? children : <Navigate to="/" />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* Rutas para ADMINISTRADOR */}
          <Route
            path="/admin/*"
            element={
              <AdminRoute>
                <div style={{ display: "flex" }}>
                  <Sidebar />
                  <div style={{ marginLeft: "220px", padding: "40px", width: "100%" }}>
                  <Routes>
  <Route path="dashboard" element={<Dashboard />} />
  <Route path="usuarios" element={<Usuarios />} />
  <Route path="lugares" element={<Lugares />} />
  <Route path="areas" element={<Areas />} />
  <Route path="categorias" element={<Categorias />} />
  <Route path="bienes" element={<Bienes />} />
  <Route path="bajas" element={<Bajas />} />
</Routes>


                  </div>
                </div>
              </AdminRoute>
            }
          />

          {/* Rutas para RESPONSABLE */}
          <Route
            path="/responsable/*"
            element={
              <ResponsableRoute>
                <div style={{ display: "flex" }}>
                  <Sidebar />
                  <div style={{ marginLeft: "220px", padding: "40px", width: "100%" }}>
                    <Routes>
                      <Route path="bienes" element={<BienesResponsable />} />
                      <Route path="asignar" element={<SolicitarBienResponsable />} />
                      <Route path="cargo" element={<CargoResponsable />} />
                    </Routes>
                  </div>
                </div>
              </ResponsableRoute>
            }
          />

          {/* Rutas para BECARIO */}
          <Route
            path="/becario/*"
            element={
              <BecarioRoute>
                <div style={{ display: "flex" }}>
                  <Sidebar />
                  <div style={{ marginLeft: "220px", padding: "40px", width: "100%" }}>
                    <Routes>
                      <Route path="bienes" element={<BienesBecario />} />
                      <Route path="asignar" element={<SolicitarBienBecario />} />
                    </Routes>
                  </div>
                </div>
              </BecarioRoute>
            }
          />

          {/* Ruta por defecto */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
