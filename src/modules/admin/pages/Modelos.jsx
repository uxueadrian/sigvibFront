import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomTable from "../../../components/CustomTable";
import { Button, Avatar } from "@mui/material";

const Modelos = ({ onChangeStatus }) => {
  const [modelos, setModelos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchModelos = async () => {
    try {
      const response = await axios.get("http://localhost:8080/modelo");
      const modelosData = response.data.result.map((modelo) => ({
        ...modelo,
        id: modelo.idModelo,
      }));
      setModelos(modelosData);
    } catch (error) {
      console.error("Error al obtener los modelos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModelos();
  }, []);

  const cambiarEstado = async (idModelo) => {
    try {
      await axios.patch(`http://localhost:8080/modelo/cambiar-status/${idModelo}`);
      fetchModelos(); // Actualizar la lista después del cambio
    } catch (error) {
      console.error("Error al cambiar el estado:", error);
    }
  };

  const columnas = [
    { field: "nombreModelo", headerName: "Modelo", width: 120 },
    {
      field: "foto",
      headerName: "Imagen",
      width: 150,
      renderCell: (params) =>
        params.row.foto ? (
          <Avatar src={params.row.foto} alt={params.row.nombreModelo} sx={{ width: 56, height: 56 }} />
        ) : (
          "Sin imagen"
        ),
    },
    {
      field: "status",
      headerName: "Estado",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color={params.row.status ? "success" : "error"}
          onClick={() => cambiarEstado(params.row.id)}
        >
          {params.row.status ? "Activo" : "Inactivo"}
        </Button>
      ),
    },
  ];

  return <CustomTable columns={columnas} rows={modelos} loading={loading} pagina={"Modelos"} />;
};

export default Modelos;
