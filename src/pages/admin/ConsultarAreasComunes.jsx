import React, { useState } from "react";
import { useFetch } from "../../services/useFetch";
import Nabvar from "../../components/NavBar";
import Modals from "../../components/Modals";

import "../../styles/Vista-BR.css"; 
import "../../styles/Vista.css";
import {adminLinks} from "../../routers/links";
import Sidebar from "../../components/Sidebar";
import {useAuth} from "../../context/AuthContext";

const ConsultarAreasComunes = () => {
    const {user} = useAuth();
    const {data, loading, error } = useFetch(
        ""
    );
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div className="container">
            <h1 className="Titulo">Areas</h1>

            {user && <h2 className="Subtitulo"> Bienvenido, {user.username} </h2>}
            <Sidebar linksArray={adminLinks}/>

            <div className="header">
                <div className="child">
                    <button className="boton" onClick={()=> setModalOpen(true)}> Agregar area</button>
                    <input type="text" placeholder="buscar" className="buscador"/>
                </div>
            </div>

            <Modals>
                <form>
                    <input type="text" placeholder="Nombre del area comun"/>
                </form>
            </Modals>
        </div>
    );
}

export default ConsultarAreasComunes;

