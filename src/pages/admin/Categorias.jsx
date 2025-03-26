import React, { useState } from "react";
import { useFetch } from "../../services/useFetch";
import Nabvar from "../../components/NavBar";
import Modals from "../../components/Modals";
import SubirImagen from '../../assets/Subir_Image.svg';

import "../../styles/Vista-BR.css"; 
import "../../styles/Vista.css";
import {adminLinks} from "../../routers/links";
import Sidebar from "../../components/Sidebar";
import {useAuth} from "../../context/AuthContext";

const Categorias = () => {
    const {user} = useAuth();
    const {data, loading, error } = useFetch(
        ""
    );  
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpen2, setModalOpen2] = useState(false);
    const [modalOpen3, setModalOpen3] = useState(false);

    return (
        <div className="container">
            <Nabvar/>

            <h1 className="Titulo">Categorias ||||</h1>

            {user && <h2 className="Subtitulo"> Bienvenido, {user.username} </h2>}
            <Sidebar linksArray={adminLinks}/>

            <input type="text" placeholder="buscar" className="buscador"/>

            <div className="header">
                <div className="child">
                    <button className="boton" onClick={()=> setModalOpen(true)}>Agregar Tipo Bien</button>
                    <button className="boton" onClick={()=> setModalOpen2(true)}>Agregar Modelo</button>
                    <button className="boton" onClick={()=> setModalOpen3(true)}>Agregar Marca</button>
                </div>
            </div>

            <Modals
            isOpen={modalOpen}
            onClose={()=> setModalOpen(false)}
            title="Agregar tipo de bien"
            >
                <form>
                    <input type="text" placeholder="Nombre del tipo de bien"/>  
                </form>
            </Modals>

            <Modals
            isOpen={modalOpen2}
            onClose={()=> setModalOpen2(false)}
            title="Agregar modelo"
            >
                <form>
                    <input type="text" placeholder="Nombre del modelo"/>
                    <input type="file" placeholder="Subir imagen"/>
                    <img src={SubirImagen}/>         
                </form>
            </Modals>

            <Modals
            isOpen={modalOpen3}
            onClose={()=> setModalOpen3(false)}
            title="Agregar marca"
            >
                <form>
                    <input type="text" placeholder="Nombre de la marca"/>
                </form>
            </Modals>
        </div>
    );
};

export default Categorias;


