import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomTable from "../../../components/CustomTable";

const Areas = () => {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);

  // Definir las columnas
  const columnas = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "nombreArea", headerName: "Lugar", width: 120 },
    { field: "status", headerName: "Estado", width: 120 },
    
  ];

  // Función para obtener datos de la API
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/areas-comunes") // Reemplaza con la URL real de tu API
      .then((response) => {
        console.log("Datos recibidos:", response.data);

      // Extraemos el array de usuarios desde `result`
      const areas= response.data.result.map((area) => ({
        ...area,           // Copiamos todos los datos originales
        id: area.idArea // Creamos la propiedad `id`
      }));

      setAreas(areas); // Guardamos los datos corregidos
    })
      .catch((error) => {
        console.error("Error al obtener las areas:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <CustomTable columns={columnas} rows={areas} loading={loading}  pagina={"Areas"} />
    </div>
  );
};

export default Areas;
