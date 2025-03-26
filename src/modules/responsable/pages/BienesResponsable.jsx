import { useState, useEffect } from "react";
import axios from "axios";

const BienesResponsable = ({ user }) => {
    const [bienes, setBienes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Obtener el idLugar desde el usuario o localStorage
    const idLugar = user?.idLugar || localStorage.getItem("idLugar");

    // 🔹 Definir fetchBienes antes del useEffect
    const fetchBienes = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/lugares/${idLugar}/bienes`);
            if (response.status === 200 && response.data.type === "SUCCESS") {
                setBienes(response.data.result); // ✅ Acceder correctamente a la data
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
        console.log("ID Lugar obtenido:", idLugar);

        if (!idLugar) {
            setError("No se encontró el ID del lugar.");
            setLoading(false);
            return;
        }

        fetchBienes(); // ✅ Aquí ya está definida la función y se ejecuta correctamente
    }, [idLugar]);

    return (
        <div>
            {loading && <p>Cargando bienes...</p>}
            {error && <p>{error}</p>}
            {bienes.length > 0 && (
                <ul>
                    {bienes.map((bien) => (
                        <li key={bien.idBien}>
                            <img src={bien.modelo.foto} alt={bien.tipoBien.nombre} width={100} />
                            <p>{bien.tipoBien.nombre}</p>
                            <p>Marca: {bien.marca.nombre}</p>
                            <p>Modelo: {bien.modelo.nombreModelo}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default BienesResponsable;
