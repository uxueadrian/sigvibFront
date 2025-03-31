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
import Bajas from "./modules/admin/pages/Bajas"; 
import Bienes from "./modules/admin/pages/Bienes"; // Importa la nueva pantalla
import Layout from "./components/Layout";

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
                    <Layout>
                      <Routes>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="usuarios" element={<Usuarios />} />
                        <Route path="lugares" element={<Lugares />} />
                        <Route path="areas" element={<Areas />} />
                        <Route path="categorias" element={<Categorias />} />
                        <Route path="bienes" element={<Bienes />} />
                        <Route path="bajas" element={<Bajas />} />
                      </Routes>
                    </Layout>
                  </AdminRoute>
                } />

              {/* Rutas para RESPONSABLE */}
              <Route
                path="/responsable/*"
                element={
                  <ResponsableRoute>
                    <Layout>
                      <Routes>
                        <Route path="bienes" element={<BienesResponsable />} />
                        <Route path="asignar" element={<SolicitarBienResponsable />} />
                        <Route path="cargo" element={<CargoResponsable />} />
                      </Routes>
                    </Layout>
                  </ResponsableRoute>
                }
              />

              {/* Rutas para BECARIO */}
              <Route
                path="/becario/*"
                element={
                  <BecarioRoute>
                    <Layout>
                      <Routes>
                        <Route path="bienes" element={<BienesBecario />} />
                        <Route path="asignar" element={<SolicitarBienBecario />} />
                      </Routes>
                    </Layout>
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

