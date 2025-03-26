import React, { useState, useEffect } from "react";
import axios from "axios";

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

const SolicitarBienBecario = () => {
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
        <div style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            padding: "40px",
            gap: "10px",
            backgroundColor: "rgb(99, 134, 160)",
            fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif"
        }}>
            <h1 style={{ marginBottom: "10px", color: "rgb(56, 161, 227)" }}>Bienes becario</h1>

            <div style={{ display: "flex", alignItems: "center", gap: "40px", marginBottom: "5px" }}>
                <button style={{ background: "#7033FF", borderRadius: "4px", height: "40px", width: "140px", color: "white", border: "none", cursor: "pointer" }}>Descargar PDF</button>
                <input type="text" placeholder="Buscar" style={{ width: "100%", height: "40px", maxWidth: "300px", padding: "5px", border: "1px solid #ddd", borderRadius: "4px" }} />
            </div>

            {loading && <p>Cargando bienes...</p>}
            {error && <p>{error}</p>}

            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "flex-start" }}>
                {bienes.length > 0 ? (
                    bienes.map((item, index) => (
                        <div key={index} style={{ flex: "1 1 calc(20% - 20px)", maxWidth: "calc(20% - 20px)", boxSizing: "border-box" }}>
                            <CardComponent image={item.modelo?.foto || "default_image_url"} title={item.tipoBien?.nombre || "Sin asignar"} description={`Marca: ${item.marca?.nombre || "Sin asignar"} | Modelo: ${item.modelo?.nombreModelo || "Sin asignar"}`} />
                        </div>
                    ))
                ) : (
                    <p>No hay bienes libres disponibles.</p>
                )}
            </div>
        </div>
    );
};

export default SolicitarBienBecario;
