import {Routes, Route } from "react-router-dom";
import BienesBecario from "../../pages/becario/BienesBecario"
import SolicitarBienBecario from "../../pages/becario/SolicitarBienBecario";

export function routersBecario () {
    return(
        <Routes>
            <Route path="/bienesBecario" element={<BienesBecario/>} />
            <Route path="/solicitarBienBecario" element={<SolicitarBienBecario/>} />
        </Routes>
    );
}


