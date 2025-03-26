import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

// Componente de la tarjeta (si prefieres, crea un archivo separado para esto)
const CardComponent = ({ image, title, description }) => {
  return (
    <div style={{ border: "1px solid #ddd", padding: "10px", margin: "10px", borderRadius: "8px", textAlign: "center" }}>
      <img src={image} alt={title} style={{ width: "100px", height: "100px", objectFit: "cover" }} />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

const CargoResponsable = () => {
  const { user } = useContext(AuthContext);
  const [bienes, setBienes] = useState([]);

  useEffect(() => {
    const fetchBienes = async () => {
      if (!user?.idUsuario) return; // ⚠️ Verifica que idUsuario esté definido
  
      try {
        const response = await fetch(`http://localhost:8080/bienes/responsable/${user.idUsuario}`);
  
        if (!response.ok) {
          throw new Error("Error al obtener los bienes");
        }
  
        const data = await response.json();
        setBienes(data.result || []);
      } catch (error) {
        console.error("Error al obtener los bienes:", error);
      }
    };
  
    fetchBienes();
  }, [user]); // ⚠️ Se ejecutará cuando user cambie
  

  return (
    <div>
      <h2>Bienes asignados a {user?.username}</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {bienes.length > 0 ? (
          bienes.map((bien) => (
            <CardComponent
              key={bien.idBien}
              image={bien.modelo?.foto || "https://via.placeholder.com/100"} // Imagen por defecto si no hay foto
              title={`${bien.tipoBien?.nombre || "Bien"} - ${bien.marca?.nombre || "Sin marca"}`}
              description={`Número de serie: ${bien.nSerie}`}
            />
          ))
        ) : (
          <p>No tienes bienes asignados</p>
        )}
      </div>
    </div>
  );
};

export default CargoResponsable;
