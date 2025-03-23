import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomTable from "../../../components/CustomTable";
import { Button } from "@mui/material";

const TipoBien = () => {
  const [tipoBien, setTipoBien] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTipoBien = async () => {
    try {
      const response = await axios.get("http://localhost:8080/tipo-bien");
      const tipoBienData = response.data.result.map((tipo) => ({
        ...tipo,
        id: tipo.idTipo,
      }));
      setTipoBien(tipoBienData);
    } catch (error) {
      console.error("Error al obtener los tipos de bien:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTipoBien();
  }, []);

  const cambiarEstado = async (idTipo) => {
    try {
      await axios.put(`http://localhost:8080/tipo-bien/cambiar-status/${idTipo}`);
      fetchTipoBien();
    } catch (error) {
      console.error("Error al cambiar el estado:", error);
    }
  };

  const columnas = [
    { field: "nombre", headerName: "Tipo de bien", width: 120 },
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

  return <CustomTable columns={columnas} rows={tipoBien} loading={loading} pagina={"Tipo bien"} />;
};

export default TipoBien;
