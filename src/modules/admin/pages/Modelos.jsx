import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomTable from "../../../components/CustomTable";
import Button from "@mui/material/Button";
import { Avatar } from "@mui/material"; // Importamos Avatar para la imagen

const Modelos = () => {
  const [modelos, setModelos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Definir las columnas
  const columnas = [
  
    { field: "nombreModelo", headerName: "Modelo", width: 120 },
    {
      field: "foto",
      headerName: "Imagen",
      width: 150,
      renderCell: (params) => (
        params.row.foto ? (
          <Avatar src={params.row.foto} alt={params.row.nombreModelo} sx={{ width: 56, height: 56 }} />
        ) : (
          "Sin imagen"
        )
      ),
    },
    {
      field: "status",
      headerName: "Estado",
      width: 150,
      renderCell: (params) => {
        console.log("Estado recibido:", params.row.status);

        const estado = String(params.row.status).toLowerCase();

        return estado === "true" ? (
          <Button variant="outlined" color="success">Activo</Button>
        ) : (
          <Button variant="outlined" color="error">Inactivo</Button>
        );
      },
    },
  ];

  // Función para obtener datos de la API
  useEffect(() => {
    axios
      .get("http://localhost:8080/modelo")
      .then((response) => {
        console.log("Datos recibidos:", response.data);

        const modelos = response.data.result.map((modelo) => ({
          ...modelo,
          id: modelo.idModelo, // Ajustamos el ID
        }));

        setModelos(modelos);
      })
      .catch((error) => {
        console.error("Error al obtener los modelos:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <CustomTable columns={columnas} rows={modelos} loading={loading} pagina={"Modelos"} />
    </div>
  );
};

export default Modelos;
