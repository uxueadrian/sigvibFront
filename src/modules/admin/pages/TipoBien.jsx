import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomTable from "../../../components/CustomTable";
import Button from "@mui/material/Button"; // Importamos Button

//Seccion de Tipo de bienes
const TipoBien = () => {
  const [tipoBien, setTipoBien] = useState([]);
  const [loading, setLoading] = useState(true);

  // Definir las columnas
  const columnas = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "nombre", headerName: "Tipo de bien", width: 120 },
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
      .get("http://localhost:8080/tipo-bien") // Reemplaza con la URL real de tu API
      .then((response) => {
        console.log("Datos recibidos:", response.data);

      // Extraemos el array de usuarios desde `result`
      const tipos = response.data.result.map((tipobien) => ({
        ...tipobien,           // Copiamos todos los datos originales
        id: tipobien.idTipo // Creamos la propiedad `id`
      }));

      setTipoBien(tipos); // Guardamos los datos corregidos
    })
      .catch((error) => {
        console.error("Error al obtener los tipos de bien:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <CustomTable columns={columnas} rows={tipoBien} loading={loading}  pagina={"Tipo bien"} />
    </div>
  );
};

export default TipoBien;
