import {Routes, Route } from "react-router-dom";
import BienesResponsable from "../../pages/responsable/BienesResponsable";
import SolicitarBienResponsable from "../../pages/responsable/SolicitarBienResponsable";

export function routersResponsable () {
    return(
        <Routes>
            <Route path="/bienResponsable" element={<BienesResponsable/>} /> 
            <Route path="/solicitarBienResponsable" element={<SolicitarBienResponsable/>} />
        </Routes>
    );

}
