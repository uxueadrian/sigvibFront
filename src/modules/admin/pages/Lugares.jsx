import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomTable from "../../../components/CustomTable";
import Button from "@mui/material/Button"; // Importamos Button


const Lugares = () => {
  const [lugares, setLugares] = useState([]);
  const [loading, setLoading] = useState(true);

  // Definir las columnas
  const columnas = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "lugar", headerName: "Lugar", width: 120 },
    { field: "status", headerName: "Estado", 
      width: 150,
      renderCell: (params) => {
          console.log("Estado recibido:", params.row.status); // Verificar qué llega
  
          // Convertimos el estado a minúsculas para evitar problemas de mayúsculas
          const estado = String(params.row.status).toLowerCase(); 
  
          return estado === "true" ? (
              <Button variant="outlined" color="success">
              Activo
            </Button>
          ) : (
            <Button variant="outlined" color="error">
              Inactivo
            </Button>
          );
        }
   },
    
  ];

  // Función para obtener datos de la API
  useEffect(() => {
    axios
      .get("http://localhost:8080/lugares") // Reemplaza con la URL real de tu API
      .then((response) => {
        console.log("Datos recibidos:", response.data);

      // Extraemos el array de usuarios desde `result`
      const lugares = response.data.result.map((lugar) => ({
        ...lugar,           // Copiamos todos los datos originales
        id: lugar.idlugar // Creamos la propiedad `id`
      }));

      setLugares(lugares); // Guardamos los datos corregidos
    })
      .catch((error) => {
        console.error("Error al obtener los lugares:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <CustomTable columns={columnas} rows={lugares} loading={loading}  pagina={"Lugares"} />
    </div>
  );
};

export default Lugares;
