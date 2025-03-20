import React from "react";
import "../../styles/Vista.css"; 
import { useFetch } from "../../services/useFetch";
import Sidebar from "../../components/Sidebar";
import {becarioLinks} from "../../routers/links";
import {routersBecario} from "../../routers/routerBecario/routersBecario";
import CardComponent from "../../components/Cards";
import DownloadPDFButton from "../../components/pdf/DownloadPDFButton";

const SolicitarBienBecario = () => {
    const items = [
        { image: "url_to_image1", title: "Laptop HP Series 300", description: "Descripción del producto" },
        // Se pueden agregar mas items por aqui
    ];

    return(
        <div className="container">
            <h1 className="Titulo">Solicitar Bien Becario</h1>
            <h2>Filtros</h2>

            <div className="header">
                <div className="child">
                    
                    <DownloadPDFButton data={items}/>

                    <h3>Marca</h3>
                    <select>
                        <option>Seleccionar marca</option>
                    </select>
                    
                    <h3>Modelo</h3>
                    <select>
                        <option>Seleccionar modelo</option>
                    </select> 

                    <input type="text" placeholder="buscar" className="buscador"/>
                </div>
            </div>

            <div className="image-grid">
                {items.map((item, index) => (
                    <div key={index} className="image-item">
                        <CardComponent image={item.image} title={item.title} description={item.description} />
                    </div>
                ))}
            </div>

        </div>
    );
}

export default SolicitarBienBecario;
    
    