import React from "react";
import { useFetch } from "../../services/useFetch";
import CardComponent from "../../components/Cards";
import DownloadPDFButton from "../../components/pdf/DownloadPDFButton";


const BienesResponsable = () => {
    return(
        <div className="container">
            <h1 className="Titulo">Bienes responsable</h1>
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

export default BienesResponsable;
