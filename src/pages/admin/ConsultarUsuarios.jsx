import "../../styles/Vista.css";
import React, { useState } from "react";
import { useFetch } from "../../services/useFetch";
import Nabvar from "../../components/NavBar";
import Modals from "../../components/Modals";

const ConsultarUsuarios = () => {
    const {data, loading, error } = useFetch(
        ""
    );
    const [modalOpen, setModalOpen] = useState(false);

    return(
        <div className="container">

            <h1 className="Titulo">Usuarios</h1>
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