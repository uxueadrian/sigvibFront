import React, { useState } from "react";
import { useFetch } from "../../services/useFetch";
import Nabvar from "../../components/NavBar";
import Modals from "../../components/Modals";

import "../../styles/Vista-BR.css"; 
import "../../styles/Vista.css";
import {adminLinks} from "../../routers/links";
import Sidebar from "../../components/Sidebar";
import {useAuth} from "../../context/AuthContext";

const ConsultarUsuarios = () => {
    const {user} = useAuth();
    const {data, loading, error } = useFetch(
        ""
    );
    const [modalOpen, setModalOpen] = useState(false);

    return(
        <div className="container">
            <h1 className="Titulo">Usuarios</h1>

            {user && <h2 className="Subtitulo"> Bienvenido, {user.username} </h2>}
            <Sidebar linksArray={adminLinks}/>

            <div className="header">
                <div className="child">
                    <button className="boton" onClick={()=> setModalOpen(true)}>Agregar usuario</button>
                    <input type="text" placeholder="buscar" className="buscador"/>
                </div>
            </div>

            <Modals>
                <form>
                    <input type="text" placeholder="Username"/>
                    <input type="text" placeholder="Nombre completo"/>
                    <input type="password" placeholder="Contraseñan"/>
                    
                    <select name="seleccionarRol">
                        <option>Seleccionar rol</option>
                        <option>Becario</option>
                        <option>Responsable</option>
                    </select>

                    <select name="seleccionarLugar">
                        <option>Seleccionar lugar</option>
                        <option>Modulo 1</option>
                        <option>Comedor</option>
                    </select>
                </form>
            </Modals>

        </div>
    );
}

export default ConsultarUsuarios;