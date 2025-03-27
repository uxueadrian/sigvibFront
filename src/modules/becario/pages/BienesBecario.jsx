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

    const idLugar = user?.idLugar || localStorage.getItem("idLugar");

    const fetchBienes = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/lugares/${idLugar}/bienes`);
            if (response.status === 200 && response.data.type === "SUCCESS") {
                setBienes(response.data.result);
            } else {
                setError("No se encontraron bienes.");
            }
        } catch (error) {
            setError("Error al obtener los bienes.");
        } finally {
            setLoading(false);
        }
    };

    const eliminarLugarDeBien = async (idBien) => {
        try {
            const response = await axios.patch(`http://localhost:8080/bienes/${idBien}/eliminar-lugar`);
            if (response.status === 200 && response.data.type === "SUCCESS") {
                alert("Lugar eliminado exitosamente del bien.");
                fetchBienes(); // Refrescar la lista de bienes
            } else {
                alert("No se pudo eliminar el lugar del bien.");
            }
        } catch (error) {
            alert("Error al eliminar el lugar del bien.");
        }
    };

    useEffect(() => {
        if (!idLugar) {
            setError("No se encontró el ID del lugar.");
            setLoading(false);
            return;
        }

        fetchBienes();
    }, [idLugar]);

    return (
        <div style={{ padding: "40px", backgroundColor: "rgb(255, 207, 74)" }}>
            <h1>Bienes Becario</h1>
            {loading && <p>Cargando bienes...</p>}
            {error && <p>{error}</p>}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                {bienes.length > 0 ? (
                    bienes.map((bien) => (
                        <div key={bien.idBien} style={{ flex: "1 1 calc(20% - 20px)", maxWidth: "calc(20% - 20px)" }}>
                            <CardComponent
                                image={bien.modelo.foto}
                                title={bien.tipoBien.nombre}
                                description={`Marca: ${bien.marca.nombre} | Modelo: ${bien.modelo.nombreModelo}`}
                            />
                            <button
                                style={{
                                    marginTop: "10px",
                                    padding: "8px 12px",
                                    backgroundColor: "#FF5733",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                }}
                                onClick={() => eliminarLugarDeBien(bien.idBien)}
                            >
                                Eliminar Lugar
                            </button>
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

