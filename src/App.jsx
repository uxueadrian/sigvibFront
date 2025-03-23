import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from '../src/pages/Login';
import DashboardAdmin from '../src/pages/admin/DashboardAdmin';
import BienesBecario from '../src/pages/becario/BienesBecario';
import BienResponsable from '../src/pages/responsable/BienesResponsable';
import ProtectedRoute from '../src/context/ProtectedRoute';

function App () {
    return (
      <Router>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboardAdmin" element={
                <ProtectedRoute requiredRole="admin">
                    <DashboardAdmin />
                </ProtectedRoute>
            } />
            <Route path="/bienesBecario" element={
                <ProtectedRoute requiredRole="becario">
                    <BienesBecario />
                </ProtectedRoute>
            } />
            <Route path="/bienesResponsable" element={
                <ProtectedRoute requiredRole="responsable">
                    <BienResponsable />
                </ProtectedRoute>
            } />

            <Route path="/" element={<Navigate to="/login" />} />

        </Routes>
      </Router>
    );
};

export default App;

