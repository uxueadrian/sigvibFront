import "../../styles/Vista.css"; 
import React, { useState } from "react";
import { useFetch } from "../../services/useFetch";
import Nabvar from "../../components/NavBar";
import Modals from "../../components/Modals";
import Sidebar from "../../components/Sidebar";

const ConsultarBien = () => {
    const { data, loading, error } = useFetch();
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div className="container">
            <Sidebar/>
            
            <h1 className="Titulo">Bienes</h1>

            <div className="header">
                <div className="child">
                    <button className="boton" onClick= {()=> setModalOpen(true)}> Agregar bien</button>

                    <input type="text" placeholder="buscar" className="buscador"/>
                </div>
            </div>

            <Modals isOpen={modalOpen} onClose={()=> setModalOpen(false)} title="Agregar nuevo bien">
                <form>
                    <input type="text" placeholder="Numero de serie"/>

                    <select name="seleccionarTipoBien">
                        <option>Seleccionar tipo de bien</option>
                        <option>Electronica</option>
                        <option>Articulos de oficina</option>
                    </select> 

                    <input type="text" placeholder="Codigo de barras"/>

                    <select name="seleccionarUsuario">
                        <option>Seleccionar usuario</option>
                        <option>Becario</option>
                        <option>Responsable</option>
                    </select>

                    <select name="seleccionarModelo">
                        <option>Seleccionar modelo</option>
                        <option>F1321</option>
                        <option>GA14</option>
                    </select>

                    <select name="seleccionarMarca">
                        <option>Seleccionar marca</option>
                        <option>HP</option>
                        <option>Lenovo</option>
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

export default ConsultarBien;


