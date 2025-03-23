import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import { AuthContext, AuthProvider } from "./context/AuthContext";  
import Areas from "./modules/admin/pages/Areas";
import Usuarios from "./modules/admin/pages/Usuarios";
import Categorias from "./modules/admin/pages/Categorias";
import Lugares from "./modules/admin/pages/Lugares";
import Marcas from "./modules/admin/pages/Marcas";
import Modelos from "./modules/admin/pages/Modelos";
import TipoBien from "./modules/admin/pages/TipoBien";
import Bajas from "./modules/admin/pages/Bajas"; 
import Bienes from "./modules/admin/pages/Bienes"; // Importa la nueva pantalla

const Inicio = () => <h1>Bienvenido al Inicio</h1>;

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <div style={{ display: "flex" }}>
                  <Sidebar />
                  <div style={{ marginLeft: "220px", padding: "40px", width: "100%" }}>
                    <Routes>
                      <Route path="/" element={<Inicio />} />
                      <Route path="/areas" element={<Areas />} />
                      <Route path="/usuarios" element={<Usuarios />} />
                      <Route path="/categorias" element={<Categorias />} />
                      <Route path="/lugares" element={<Lugares />} />
                      <Route path="/marcas" element={<Marcas />} />
                      <Route path="/modelos" element={<Modelos />} />
                      <Route path="/tipobien" element={<TipoBien />} />
                      <Route path="/bienes" element={<Bienes />} /> {/* Nueva ruta */}
                      <Route path="/bajas" element={<Bajas />} /> {/* Nueva ruta */}
                    </Routes>
                  </div>
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
