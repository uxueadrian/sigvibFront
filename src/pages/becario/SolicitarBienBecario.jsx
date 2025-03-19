import React from "react";
import { useFetch } from "../../services/useFetch";
import Sidebar from "../../components/Sidebar";
import {becarioLinks} from "../../routers/links";
import {routersBecario} from "../../routers/routerBecario/routersBecario";

const SolicitarBienBecario = () => {
    return(
        <div>
            <Sidebar linksArray={becarioLinks}/>
            {routersBecario()}  
        </div>
    );
}

export default SolicitarBienBecario;
    
    