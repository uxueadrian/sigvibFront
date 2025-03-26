import React, { useState, useEffect } from "react";
import axios from "axios";

// Componente de tarjeta
const CardComponent = ({ image, title, description }) => {
    const cardStyle = {
        border: "1px solid #ddd",
        borderRadius: "8px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "10px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
    };

    const buttonStyle = {
        marginTop: "10px",
        padding: "5px 10px",
        backgroundColor: "#7033FF",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer"
    };

    return (
        <div style={cardStyle}>
            <img src={image} alt={title} style={{ width: "100%", height: "auto", borderRadius: "8px" }} />
            <h3 style={{ margin: "10px 0", fontSize: "1.2em", textAlign: "center" }}>{title}</h3>
            <p style={{ margin: 0, fontSize: "0.9em", color: "#555", textAlign: "center" }}>{description}</p>
            <button style={buttonStyle}>Solicitar</button>
        </div>
    );
};

// Componente principal para solicitar bienes
const SolicitarBienResponsable = () => {
    const [bienes, setBienes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Obtener los bienes libres (sin lugar asignado)
    const fetchBienesLibres = async () => {
        try {
            const response = await axios.get("http://localhost:8080/bienes"); // Ajusta la URL según tu API
            const bienesLibres = response.data.result.filter(bien => !bien.lugar); // Filtrar bienes sin lugar asignado
            setBienes(bienesLibres);
        } catch (error) {
            setError("Error al obtener los bienes.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBienesLibres(); // Cargar los bienes libres al cargar el componente
    }, []);

    return (
        <div className="container">
            <h1 className="Titulo">Solicitar bien</h1>

            <div className="top-section">
                <button className="boton">Descargar PDF</button>
                <input type="text" placeholder="Buscar" className="buscador" />
            </div>

            <div className="filters-section">
                <h2 className="Subtitulo">Filtros</h2>

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

            {loading && <p>Cargando bienes...</p>}
            {error && <p>{error}</p>}

            <div className="image-grid">
                {bienes.length > 0 ? (
                    bienes.map((item, index) => (
                        <div key={index} className="image-item">
                            <CardComponent
                                image={item.modelo?.foto || "default_image_url"}
                                title={item.tipoBien?.nombre || "Sin asignar"}
                                description={`Marca: ${item.marca?.nombre || "Sin asignar"} | Modelo: ${item.modelo?.nombreModelo || "Sin asignar"}`}
                            />
                        </div>
                    ))
                ) : (
                    <p>No hay bienes libres disponibles.</p>
                )}
            </div>
        </div>
    );
};

export default SolicitarBienResponsable;

// CSS
const styles = `
* {
    background-color: rgb(255, 207, 74);
    font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.container {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 40px;
    gap: 10px;
}

.container h1 {
    margin-bottom: 10px;
    color: #B0E338;
}

.top-section {
    display: flex;
    align-items: center;
    gap: 40px;
    margin-bottom: 5px;
}

.filters-section {
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid #ddd;
}

.filter-group {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    align-items: center;
}

.filter-item {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.filter-item h3 {
    color: #555;
    margin-bottom: 5px;
}

.btnSelect {
    height: 40px; 
    width: 200px; 
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.buscador {
    width: 100%;
    height: 40px;
    max-width: 300px;
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.boton {
    background: #7033FF;
    border-radius: 4px;
    height: 40px;
    width: 140px;
    color: white;
    border: none;
    cursor: pointer;
}

.image-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: flex-start;
}

.image-item {
    flex: 1 1 calc(20% - 20px); 
    max-width: calc(20% - 20px);
    box-sizing: border-box;
}

.card {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card img {
    width: 100%;
    height: auto;
    border-radius: 8px;
}

.card h3 {
    margin: 10px 0;
    font-size: 1.2em;
    text-align: center;
}

.card p {
    margin: 0;
    font-size: 0.9em;
    color: #555;
    text-align: center;
}

.card button {
    margin-top: 10px;
    padding: 5px 10px;
    background-color: #7033FF;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

@media (max-width: 1024px) {
    .image-item {
        flex: 1 1 calc(25% - 20px); 
        max-width: calc(25% - 20px);
    }
}

@media (max-width: 768px) {
    .image-item {
        flex: 1 1 calc(33.33% - 20px); 
        max-width: calc(33.33% - 20px);
    }

    .btnSelect, .buscador {
        width: 100%;
        max-width: 100%;
    }
}

@media (max-width: 480px) {
    .image-item {
        flex: 1 1 calc(50% - 20px); 
        max-width: calc(50% - 20px);
    }

    .container {
        padding: 20px;
    }
}

@media (max-width: 320px) {
    .image-item {
        flex: 1 1 calc(100% - 20px); 
        max-width: calc(100% - 20px);
    }
}`;

export const CSS = styles;
