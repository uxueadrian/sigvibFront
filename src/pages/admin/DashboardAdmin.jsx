import React, { useState } from "react";
import { useFetch } from "../../services/useFetch";

import "../../styles/Vista-BR.css"; 
import "../../styles/Vista.css";
import {adminLinks} from "../../routers/links";
import Sidebar from "../../components/Sidebar";
import {useAuth} from "../../context/AuthContext";

const DashboardAdmin = () => {
    const {user} = useAuth();
    const {data, loading, error } = useFetch(
        ""
    );
    return (
        <>
        <div className="container">
        <h1 className="Titulo">DashBoard de Bienes</h1>
            {user && <h2 className="Subtitulo"> Bienvenido, {user.username} </h2>}
            <Sidebar linksArray={adminLinks}/>

            <input type="text" placeholder="buscar" className="buscador"/>
        </div>
            
        <button>Agregar bien</button>    
        </>
    );
}

export default DashboardAdmin;


