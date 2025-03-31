import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext"; // Importar el contexto de autenticación

const CardComponent = ({ image, title, description, onSolicitar }) => {
    return (
        <div >
            <img src={image} alt={title} />
            <h3  >{title}</h3>
            <p >{description}</p>
            <button onClick={onSolicitar} >
                Solicitar
            </button>
        </div>
    );
};

const SolicitarBienBecario = () => {
    const { user, token } = useContext(AuthContext);
    const [bienes, setBienes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBienesLibres();
    }, []);

    const fetchBienesLibres = async () => {
        try {
            const response = await axios.get("http://localhost:8080/bienes");
            console.log("Bienes recibidos:", response.data.result); // Verifica la estructura
            const bienesLibres = response.data.result.filter(bien => bien.idBien && !bien.lugar);
            setBienes(bienesLibres);
        } catch (error) {
            console.error("Error al obtener los bienes:", error);
            setError("Error al obtener los bienes.");
        } finally {
            setLoading(false);
        }
    };
    

    const handleSolicitar = async (idBien) => {
        console.log("Solicitando bien con ID:", idBien); // Verifica que no sea undefined
    
        if (!idBien) {
            console.error("Error: ID de bien es undefined");
            alert("Error: No se pudo obtener el ID del bien.");
            return;
        }
    
        if (!user || !user.idLugar) {
            alert("No se pudo obtener la información del usuario.");
            return;
        }
    
        try {
            await axios.patch(
                `http://localhost:8080/bienes/${idBien}/asignar-lugar/${user.idLugar}`, 
                {}, 
                { headers: { Authorization: `Bearer ${token}` } }
            );
    
            setBienes(prevBienes => prevBienes.filter(bien => bien.idBien !== idBien));
            alert("Bien asignado correctamente.");
        } catch (error) {
            console.error("Error al solicitar el bien:", error);
            alert("Hubo un error al solicitar el bien.");
        }
    };
    
    
    

    return (
        <div >
            <h1 >Bienes Becario</h1>

            {loading && <p>Cargando bienes...</p>}
            {error && <p>{error}</p>}

            <div >
                {bienes.length > 0 ? (
                    bienes.map((item) => (
                        <CardComponent 
                            key={item.id} 
                            image={item.modelo?.foto || "default_image_url"} 
                            title={item.tipoBien?.nombre || "Sin asignar"} 
                            description={`Marca: ${item.marca?.nombre || "Sin asignar"} | Modelo: ${item.modelo?.nombreModelo || "Sin asignar"}`} 
                            onSolicitar={() => {
                                if (!item.idBien) {
                                    console.error("Error: Bien sin ID:", item);
                                    alert("Error: No se puede solicitar este bien porque no tiene ID.");
                                    return;
                                }
                                handleSolicitar(item.idBien);
                            }}
                            
                        />
                    ))
                ) : (
                    <p>No hay bienes libres disponibles.</p>
                )}
            </div>
        </div>
    );
};

export default SolicitarBienBecario;
