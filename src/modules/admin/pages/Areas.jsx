import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomTable from "../../../components/CustomTable";

const Areas = () => {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);

  // Definir las columnas
  const columnas = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "nombreArea", headerName: "Área", width: 120 },
    { field: "lugar", headerName: "Lugar", width: 120 },
    { field: "status", headerName: "Estado", width: 120 },
  ];

  // Función para obtener datos de la API
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/areas-comunes/con-lugar") // URL actualizada
      .then((response) => {
        console.log("Datos recibidos:", response.data);

        // Accedemos a 'result' en lugar de 'data'
        const areas = response.data.result.map((area) => ({
          ...area,             // Copiamos todos los datos originales
          id: area.idArea,     // Creamos la propiedad `id`
          lugar: area.lugar.lugar,  // Extraemos el nombre del lugar
        }));

        setAreas(areas); // Guardamos los datos corregidos
      })
      .catch((error) => {
        console.error("Error al obtener las áreas:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <CustomTable columns={columnas} rows={areas} loading={loading} pagina={"Áreas comunes"} />
    </div>
  );
};

export default Areas;
