import {Routes, Route } from "react-router-dom";
import BienesBecario from "../../pages/becario/BienesBecario"
import SolicitarBienBecario from "../../pages/becario/SolicitarBienBecario";

import ProtectedRoute from "../../context/ProtectedRoute";
import Login from "../../pages/Login";

export function routersBecario () {
    return(
        <Routes>
            <Route path="/login" element= { <Login/> } />
            <Route path="/bienesBecario" element={
                <ProtectedRoute requiredRole="becario">
                    <BienesBecario/>
                </ProtectedRoute>
            } />
            <Route path="/solicitarBienBecario" element={
                <ProtectedRoute requiredRole="becario">
                    <SolicitarBienBecario/>
                </ProtectedRoute>
            } />
        </Routes>
    );
}


