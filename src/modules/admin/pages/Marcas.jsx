import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomTable from "../../../components/CustomTable";
import { Button } from "@mui/material";

const Marcas = () => {
  const [marcas, setMarcas] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMarcas = async () => {
    try {
      const response = await axios.get("http://localhost:8080/marca");
      const marcasData = response.data.result.map((marca) => ({
        ...marca,
        id: marca.idmarca,
      }));
      setMarcas(marcasData);
    } catch (error) {
      console.error("Error al obtener las marcas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarcas();
  }, []);

  const cambiarEstado = async (idMarca) => {
    try {
      const token = localStorage.getItem("token"); // O donde almacenes el token
      if (!token) {
        console.error("No hay token disponible");
        return;
      }
  
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
  
      await axios.patch(`http://localhost:8080/marca/cambiar-status/${idMarca}`, {}, { headers });
  
      fetchMarcas(); // Actualizar la lista después del cambio
    } catch (error) {
      console.error("Error al cambiar el estado:", error.response?.data || error.message);
    }
  };
  
  

  const columnas = [
    { field: "nombre", headerName: "Marca", width: 120 },
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

  return <CustomTable columns={columnas} rows={marcas} loading={loading} pagina={"Marcas"} />;
};

export default Marcas;
