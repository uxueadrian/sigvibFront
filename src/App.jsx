import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from '../src/pages/Login';

import DashboardAdmin from '../src/pages/admin/DashboardAdmin';
import ConsultarAreasComunes from "../src/pages/admin/ConsultarAreasComunes";
import ConsultarBien from "../src/pages/admin/ConsultarAreasComunes";
import ConsultarLugares from "../src/pages/admin/ConsultarAreasComunes";
import ConsultarUsuarios from "../src/pages/admin/ConsultarAreasComunes";
import Categorias from "../src/pages/admin/ConsultarAreasComunes";

import BienesBecario from '../src/pages/becario/BienesBecario';
import SolicitarBienBecario from "../src/pages/becario/SolicitarBienBecario";

import BienResponsable from '../src/pages/responsable/BienesResponsable';
import SolicitarBienResponsable from '../src/pages/responsable/SolicitarBienResponsable';

import ProtectedRoute from '../src/context/ProtectedRoute';

function App () {
    return (
      <Router>
        <Routes>
            <Route path="/login" element={<Login />} />

            {/*Todas estas rutas son para el admin, de aqui hasta abajo*/}
            <Route path="/dashboardAdmin" element={
                <ProtectedRoute requiredRole="ADMINISTRADOR">
                    <DashboardAdmin />
                </ProtectedRoute>
            } />

            <Route path="/consultarUsuarios" element = { 
                <ProtectedRoute requiredRole="ADMINISTRADOR">
                    <ConsultarUsuarios/> 
                </ProtectedRoute>
            } />

            <Route path="/consultarLugares" element= { 
                <ProtectedRoute requiredRole="ADMINISTRADOR">
                    <ConsultarLugares/> 
                </ProtectedRoute>
            } />

            <Route path="/consultarBien" element={ 
                <ProtectedRoute requiredRole="ADMINISTRADOR">
                    <ConsultarBien/> 
                </ProtectedRoute>
            } />

            <Route path="/consultarAreasComunes" element={ 
                <ProtectedRoute requiredRole="ADMINISTRADOR"> 
                    <ConsultarAreasComunes/> 
                </ProtectedRoute>           
            } />

            <Route path="/categorias" element = { 
                <ProtectedRoute requiredRole="ADMINISTRADOR">
                    <Categorias/> 
                </ProtectedRoute>
            }/>

            {/*Todas estas rutas son para becario, de aqui hasta abajo*/}
            <Route path="/bienesBecario" element={
                <ProtectedRoute requiredRole="BECARIO">
                    <BienesBecario />
                </ProtectedRoute>
            } />

            <Route path="/solicitarBienBecario" element={
                <ProtectedRoute requiredRole="BECARIO">
                    <SolicitarBienBecario/>
                </ProtectedRoute>
            } />

            {/*Todas estas rutas son para el responsable, de aqui hasta abajo*/}
            <Route path="/bienesResponsable" element={
                <ProtectedRoute requiredRole="RESPONSABLE">
                    <BienResponsable />
                </ProtectedRoute>
            } />

            <Route path="/solicitarBienResponsable" element={
                <ProtectedRoute requiredRole="RESPONSABLE">
                    <SolicitarBienResponsable/>
                </ProtectedRoute>
            } />

            <Route path="/" element={<Navigate to="/login" />} />

        </Routes>
      </Router>
    );
};

export default App;

