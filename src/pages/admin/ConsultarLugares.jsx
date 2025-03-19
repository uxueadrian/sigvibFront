import "../../styles/Vista.css";
import React, { useState } from "react";
import { useFetch } from "../../services/useFetch";
import Nabvar from "../../components/NavBar";
import Modals from "../../components/Modals";

const ConsultarLugares = () => {
    const {data, loading, error } = useFetch(
        ""
    );
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div className="container">

            <h1 className="Titulo">Lugares</h1>
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

