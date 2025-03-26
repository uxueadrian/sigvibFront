import React, { useState } from "react";
import { useFetch } from "../../services/useFetch";
import Nabvar from "../../components/NavBar";
import Modals from "../../components/Modals";

import "../../styles/Vista-BR.css"; 
import "../../styles/Vista.css";
import {adminLinks} from "../../routers/links";
import Sidebar from "../../components/Sidebar";
import {useAuth} from "../../context/AuthContext";

const ConsultarLugares = () => {
    const {user} = useAuth();
    const {data, loading, error } = useFetch(
        ""
    );
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div className="container">
            <h1 className="Titulo">Lugares 11111</h1>

            {user && <h2 className="Subtitulo"> Bienvenido, {user.username} </h2>}
            <Sidebar linksArray={adminLinks}/>

            <div className="header">
                <div className="child">
                    <button className="boton" onClick={()=> setModalOpen(true)}>Agregar lugar</button>
                    <input type="text" placeholder="buscar" className="buscador"/>
                </div>
            </div>

            <Modals>
                <form>
                    <input type="text" placeholder="Nombre del lugar"/>  
                </form>
            </Modals>
        </div>
    );
}

export default ConsultarLugares;

