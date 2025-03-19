import "../../styles/Vista.css";
import React, { useState } from "react";
import { useFetch } from "../../services/useFetch";
import Nabvar from "../../components/NavBar";
import Modals from "../../components/Modals";

const ConsultarAreasComunes = () => {
    const {data, loading, error } = useFetch(
        ""
    );
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div className="container">
            
            <h1 className="Titulo">Areas</h1>

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