import { useState, useEffect } from "react";
import axios from "axios";

const BienesResponsable = ({ user }) => {
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
                fetchBienes(); // Refrescar lista de bienes
            } else {
                alert("No se pudo eliminar el lugar del bien.");
            }
        } catch (error) {
            alert("Error al eliminar el lugar del bien.");
        }
    };

    useEffect(() => {
        console.log("ID Lugar obtenido:", idLugar);
        if (!idLugar) {
            setError("No se encontró el ID del lugar.");
            setLoading(false);
            return;
        }
        fetchBienes();
    }, [idLugar]);

    return (
        <div>
            {loading && <p>Cargando bienes...</p>}
            {error && <p>{error}</p>}
            <div >
                {bienes.map((bien) => (
                    <div key={bien.idBien} >
                        <img src={bien.modelo.foto} alt={bien.tipoBien.nombre} />
                        <h3>{bien.tipoBien.nombre}</h3>
                        <p><strong>Marca:</strong> {bien.marca.nombre}</p>
                        <p><strong>Modelo:</strong> {bien.modelo.nombreModelo}</p>
                        <button onClick={() => eliminarLugarDeBien(bien.idBien)} > Eliminar Lugar </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BienesResponsable;
