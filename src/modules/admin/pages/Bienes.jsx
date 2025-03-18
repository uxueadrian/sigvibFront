import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomTable from "../../../components/CustomTable";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  // Definir las columnas
  const columnas = [
    { field: "rol", headerName: "Rol", width: 120 },
    { field: "idUsuario", headerName: "ID", width: 100 },
    { field: "nombre", headerName: "Nombre", width: 200 },
    { field: "usuario", headerName: "Usuario", width: 200 },
    { field: "idLugar", headerName: "Lugar", width: 120 },
    { field: "status", headerName: "Estado", width: 120 },
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
        id: usuario.idusuario // Creamos la propiedad `id`
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
      <h2>Listado de Usuarios</h2>
      <CustomTable columns={columnas} rows={usuarios} loading={loading} />
    </div>
  );
};

export default Usuarios;
