import {Routes, Route } from "react-router-dom";
import BienesResponsable from "../../pages/responsable/BienesResponsable";
import SolicitarBienResponsable from "../../pages/responsable/SolicitarBienResponsable";

import ProtectedRoute from "../../context/ProtectedRoute";
import Login from "../../pages/Login";

export function routersResponsable () {
    return(
        <Routes>
            <Route path="/login" element= { <Login/> } />

            <Route path="/bienResponsable" element={
                <ProtectedRoute requiredRole="RESPONSABLE">
                    <BienesResponsable/>
                </ProtectedRoute>
            } /> 

            <Route path="/solicitarBienResponsable" element={
                <ProtectedRoute requiredRole="RESPONSABLE">
                    <SolicitarBienResponsable/>
                </ProtectedRoute>
            } />
            
        </Routes>
    );

}
