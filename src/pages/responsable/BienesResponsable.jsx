import React from "react";
import { responsableLinks } from "../../routers/links";
import CardComponent from "../../components/Cards";
import DownloadPDFButton from "../../components/pdf/DownloadPDFButton";
import "../../styles/Vista-BR.css";
import "../../styles/Vista.css";
import Sidebar from "../../components/Sidebar";

import {useAuth} from "../../context/AuthContext";

const BienesResponsable = () => {
    const {user} = useAuth();
    const items = []; // Tus datos aquí
    
    return (
        <Sidebar linksArray={responsableLinks}>
            <div className="page-content">
                <div className="vista-header">
                    <h1 className="titulo-verde">Bienes Responsable</h1>
                    {user && <h2 className="subtitulo">Bienvenido, {user.username}</h2>}
                </div>
                
                <div className="top-section">
                    <DownloadPDFButton data={items}/>
                    <input type="text" placeholder="Buscar..." className="buscador"/>
                </div>
                
                <div className="filters-section">
                    <h2 className="subtitulo">Filtros</h2>
                    <div className="filter-group">
                        <div className="filter-item">
                            <h3>Tipo</h3>
                            <select className="btnSelect">
                                <option>Seleccionar tipo de bien</option>
                            </select>  
                        </div>
                        <div className="filter-item">
                            <h3>Marca</h3>
                            <select className="btnSelect">
                                <option>Seleccionar marca</option>
                            </select>
                        </div>
                        <div className="filter-item">
                            <h3>Modelo</h3>
                            <select className="btnSelect">
                                <option>Seleccionar modelo</option>
                            </select> 
                        </div>                          
                    </div>
                </div>
                
                <div className="image-grid">
                    {items.map((item, index) => (
                        <div key={index} className="image-item">
                            <CardComponent 
                                image={item.image} 
                                title={item.title} 
                                description={item.description} 
                            />
                        </div>
                    ))}
                </div>
            </div>
        </Sidebar>
    );
};

export default BienesResponsable;
