import React, { useState, useEffect } from "react";
import axios from "axios";

const CardComponent = ({ image, title, description }) => {
    return (
        <div style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "10px",
            backgroundColor: "#fff",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
        }}>
            <img src={image} alt={title} style={{ width: "100%", height: "auto", borderRadius: "8px" }} />
            <h3 style={{ margin: "10px 0", fontSize: "1.2em", textAlign: "center" }}>{title}</h3>
            <p style={{ margin: 0, fontSize: "0.9em", color: "#555", textAlign: "center" }}>{description}</p>
        </div>
    );
};

const BienesBecario = ({ user }) => {
    const [bienes, setBienes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Obtener el idLugar desde el usuario o localStorage
    const idLugar = user?.idLugar || localStorage.getItem("idLugar");

    // Función para obtener los bienes asociados al idLugar
    const fetchBienes = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/lugares/${idLugar}/bienes`);
            if (response.status === 200 && response.data.type === "SUCCESS") {
                setBienes(response.data.result); // Acceder correctamente a la data
            } else {
                setError("No se encontraron bienes.");
            }
        } catch (error) {
            setError("Error al obtener los bienes.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!idLugar) {
            setError("No se encontró el ID del lugar.");
            setLoading(false);
            return;
        }

        fetchBienes(); // Ejecutar la función para obtener los bienes
    }, [idLugar]);

    return (
        <div style={{
            backgroundColor: "rgb(255, 207, 74)",
            fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
            padding: "40px",
            display: "flex",
            flexDirection: "column",
            gap: "10px"
        }}>
            <h1 style={{ marginBottom: "10px", color: "#B0E338" }}>Bienes Becario</h1>

            <div style={{ display: "flex", alignItems: "center", gap: "40px", marginBottom: "5px" }}>
                <button style={{ background: "#7033FF", borderRadius: "4px", height: "40px", width: "140px", color: "white", border: "none", cursor: "pointer" }}>Descargar PDF</button>
                <input type="text" placeholder="Buscar" style={{ width: "300px", height: "40px", padding: "5px", border: "1px solid #ddd", borderRadius: "4px" }} />
            </div>

            {loading && <p>Cargando bienes...</p>}
            {error && <p>{error}</p>}

            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "flex-start" }}>
                {bienes.length > 0 ? (
                    bienes.map((bien) => (
                        <div key={bien.idBien} style={{ flex: "1 1 calc(20% - 20px)", maxWidth: "calc(20% - 20px)" }}>
                            <CardComponent
                                image={bien.modelo.foto}
                                title={bien.tipoBien.nombre}
                                description={`Marca: ${bien.marca.nombre} | Modelo: ${bien.modelo.nombreModelo}`}
                            />
                        </div>
                    ))
                ) : (
                    <p>No hay bienes disponibles.</p>
                )}
            </div>
        </div>
    );
};

export default BienesBecario;
