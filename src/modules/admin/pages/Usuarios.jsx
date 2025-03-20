import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomTable from "../../../components/CustomTable";
import Button from "@mui/material/Button"; // Importamos Button

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  // Definir las columnas
  const columnas = [
    { field: "rol", headerName: "Rol", width: 120 },
    { field: "id", headerName: "ID", width: 100 },
    { field: "nombre", headerName: "Nombre", width: 200 },
    { field: "usuario", headerName: "Usuario", width: 200 },
    { field: "lugar", headerName: "Lugar Asignado", width: 120 },
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
      .get("http://localhost:8080/usuarios") // Reemplaza con la URL real de tu API
      .then((response) => {
        console.log("Datos recibidos:", response.data);

      // Extraemos el array de usuarios desde `result`
      const usuarios = response.data.result.map((usuario) => ({
        ...usuario,           // Copiamos todos los datos originales
        id: usuario.idusuario, // Creamos la propiedad `id`
        lugar: usuario.lugar ? usuario.lugar.lugar : "Sin asignar", // Extraemos solo el nombre del lugar
      }));

      setUsuarios(usuarios); // Guardamos los datos corregidos
    })
      .catch((error) => {
        console.error("Error al obtener los usuarios:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <CustomTable columns={columnas} rows={usuarios} loading={loading} pagina={"Usuarios"} />
    </div>
  );
};

export default Usuarios;
