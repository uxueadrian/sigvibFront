import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomTable from "../../../components/CustomTable";
import Button from "@mui/material/Button";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función para cambiar el estado del usuario en la API 
  const cambiarEstadoUsuario = async (id, estadoActual) => {
    const nuevoEstado = !estadoActual; // Cambia el estado (true -> false, false -> true)

    try {
      await axios.patch(`http://localhost:8080/usuarios/${id}/status`, {
        status: nuevoEstado,
      });

      // Actualizar la lista de usuarios localmente después de la actualización en el servidor
      setUsuarios((prevUsuarios) =>
        prevUsuarios.map((usuario) =>
          usuario.id === id ? { ...usuario, status: nuevoEstado } : usuario
        )
      );
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
    }
  };

  // Definir las columnas
  const columnas = [
    { field: "rol", headerName: "Rol", width: 120 },
    { field: "id", headerName: "ID", width: 100 },
    { field: "nombre", headerName: "Nombre", width: 200 },
    { field: "usuario", headerName: "Usuario", width: 200 },
    { field: "lugar", headerName: "Lugar Asignado", width: 120 },
    {
      field: "status",
      headerName: "Estado",
      width: 150,
      renderCell: (params) => {
        const estadoActual = Boolean(params.row.status); // Convertimos a booleano

        return (
          <Button
            variant="outlined"
            color={estadoActual ? "success" : "error"}
            onClick={() => cambiarEstadoUsuario(params.row.id, estadoActual)}
          >
            {estadoActual ? "Activo" : "Inactivo"}
          </Button>
        );
      },
    },
  ];

  // Función para obtener datos de la API
  useEffect(() => {
    axios
      .get("http://localhost:8080/usuarios")
      .then((response) => {
        console.log("Datos recibidos:", response.data);

        const usuarios = response.data.result.map((usuario) => ({
          ...usuario,
          id: usuario.idusuario,
          lugar: usuario.lugar ? usuario.lugar.lugar : "Sin asignar",
        }));

        setUsuarios(usuarios);
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
      <CustomTable
        columns={columnas}
        rows={usuarios}
        loading={loading}
        pagina={"Usuarios"}
      />
    </div>
  );
};

export default Usuarios;
