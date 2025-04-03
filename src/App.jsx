import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Login from "./components/Login"
import { AuthProvider } from "./context/AuthContext"
import Areas from "./modules/admin/pages/Areas"
import Dashboard from "./modules/admin/pages/Dashboard"
import BienesResponsable from "./modules/responsable/pages/BienesResponsable"
import CargoResponsable from "./modules/responsable/pages/CargoResponsable"
import BienesBecario from "./modules/becario/pages/BienesBecario"
import SolicitarBienBecario from "./modules/becario/pages/SolicitarBienBecario"
import SolicitarBienResponsable from "./modules/responsable/pages/SolicitarBienResponsable"
import Usuarios from "./modules/admin/pages/Usuarios"
import Categorias from "./modules/admin/pages/Categorias"
import Lugares from "./modules/admin/pages/Lugares"
import Bajas from "./modules/admin/pages/Bajas"
import Bienes from "./modules/admin/pages/Bienes"
import Layout from "./components/Layout"
import ProtectedRoute from "./components/ProtectedRoute"

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public route */}
          <Route path="/login" element={<Login />} />

          {/* Admin routes */}
          <Route element={<ProtectedRoute roleRequired="ROLE_ADMINISTRADOR" />}>
            <Route element={<Layout />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/usuarios" element={<Usuarios />} />
              <Route path="/admin/lugares" element={<Lugares />} />
              <Route path="/admin/areas" element={<Areas />} />
              <Route path="/admin/categorias" element={<Categorias />} />
              <Route path="/admin/bienes" element={<Bienes />} />
              <Route path="/admin/bajas" element={<Bajas />} />
            </Route>
          </Route>

          {/* Responsable routes */}
          <Route element={<ProtectedRoute roleRequired="ROLE_RESPONSABLE" />}>
            <Route element={<Layout />}>
              <Route path="/responsable/bienes" element={<BienesResponsable />} />
              <Route path="/responsable/asignar" element={<SolicitarBienResponsable />} />
              <Route path="/responsable/cargo" element={<CargoResponsable />} />
            </Route>
          </Route>

          {/* Becario routes */}
          <Route element={<ProtectedRoute roleRequired="ROLE_BECARIO" />}>
            <Route element={<Layout />}>
              <Route path="/becario/bienes" element={<BienesBecario />} />
              <Route path="/becario/asignar" element={<SolicitarBienBecario />} />
            </Route>
          </Route>

          {/* Default route */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App

