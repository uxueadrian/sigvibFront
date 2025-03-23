import {Routes, Route } from "react-router-dom";

import DashboardAdmin from "../../pages/admin/DashboardAdmin";
import ConsultarUsuarios from "../../pages/admin/ConsultarUsuarios";
import ConsultarLugares from "../../pages/admin/ConsultarLugares";
import ConsultarBien from "../../pages/admin/ConsultarBien";
import ConsultarAreasComunes from "../../pages/admin/ConsultarAreasComunes";
import Categorias from "../../pages/admin/Categorias";

import ProtectedRoute from "../../context/ProtectedRoute";
import Login from "../../pages/Login";

export function routersAdmin(){
    return(
        <Routes>
                <Route path="/login" element={ <Login/> } />
                <Route path="/dashboardAdmin" element={ 
                    <ProtectedRoute requiredRole="admin">
                        <DashboardAdmin/> 
                    </ProtectedRoute>
                } />

                <Route path="/consultarUsuarios" element = { 
                    <ProtectedRoute requiredRole="admin">
                        <ConsultarUsuarios/> 
                    </ProtectedRoute>
                } />

                <Route path="/consultarLugares" element= { 
                    <ProtectedRoute requiredRole="admin">
                        <ConsultarLugares/> 
                    </ProtectedRoute>
                } />

                <Route path="/consultarBien" element={ 
                    <ProtectedRoute requiredRole="admin">
                        <ConsultarBien/> 
                    </ProtectedRoute>
                } />

                <Route path="/consultarAreasComunes" element={ 
                    <ProtectedRoute requiredRole="admin">       
                        <ConsultarAreasComunes/> 
                    </ProtectedRoute>           
                } />

                <Route path="/categorias" element = { 
                    <ProtectedRoute>
                        <Categorias/> 
                    </ProtectedRoute>
                }/>
        </Routes>
    );
}

