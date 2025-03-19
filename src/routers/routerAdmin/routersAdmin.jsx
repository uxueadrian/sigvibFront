import {Routes, Route } from "react-router-dom";

import DashboardAdmin from "../../pages/admin/DashboardAdmin";
import ConsultarUsuarios from "../../pages/admin/ConsultarUsuarios";
import ConsultarLugares from "../../pages/admin/ConsultarLugares";
import ConsultarBien from "../../pages/admin/ConsultarBien";
import ConsultarAreasComunes from "../../pages/admin/ConsultarAreasComunes";
import Categorias from "../../pages/admin/Categorias";

export function routersAdmin(){
    return(
        <Routes>
                <Route path="/dashboardAdmin" element={ <DashboardAdmin/> } />
                <Route path="/consultarUsuarios" element = { <ConsultarUsuarios/> } />
                <Route path="/consultarLugares" element= { <ConsultarLugares/> } />
                <Route path="/consultarBien" element={ <ConsultarBien/> } />
                <Route path="/consultarAreasComunes" element={ <ConsultarAreasComunes/> } />
                <Route path="/categorias" element = {<Categorias/> }/>
        </Routes>
    );
}

