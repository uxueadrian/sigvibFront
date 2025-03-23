import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, TextField, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle, Switch, Box, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Barcode from 'react-barcode';

const Bienes = () => {
  const [bienes, setBienes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [openBaja, setOpenBaja] = useState(false);
  const [selectedBien, setSelectedBien] = useState(null);
  const [motivoBaja, setMotivoBaja] = useState("");
  const [lugares, setLugares] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [tiposBien, setTiposBien] = useState([]);
  const [nuevoBien, setNuevoBien] = useState({
    codigoBarras: "",
    nSerie: "",
    idTipo: "",
    idLugar: "",
    idModelo: "",
    idMarca: ""
  });
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8080/bienes")
      .then(response => {
        const bienesData = response.data.result
          .filter(bien => bien.status) // Filtrar solo bienes con status true
          .map(bien => ({
            ...bien,
            id: bien.idBien,
            tipoBien: bien.tipoBien ? bien.tipoBien.nombre : "Sin asignar",
            modelo: bien.modelo ? bien.modelo.nombreModelo : "Sin asignar",
            marca: bien.marca.nombre,
            lugar: bien.lugar ? bien.lugar.lugar : "Sin asignar",
            imagen: bien.modelo.foto,
            codigoBarras: bien.codigoBarras,
          }));
        setBienes(bienesData);
      })
      .catch(error => console.error("Error al obtener bienes:", error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8080/usuarios/lugares-sin-usuarios")
      .then(response => setLugares(response.data.result))
      .catch(error => console.error("Error al obtener lugares:", error));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8080/tipo-bien")
      .then(response => setTiposBien(response.data.result))
      .catch(error => console.error("Error al obtener tipo bien:", error));

    axios.get("http://localhost:8080/modelo")
      .then(response => setModelos(response.data.result))
      .catch(error => console.error("Error al obtener modelos:", error));

    axios.get("http://localhost:8080/marca")
      .then(response => setMarcas(response.data.result))
      .catch(error => console.error("Error al obtener marcas:", error));
  }, []);

  const handleChange = (e) => {
    setNuevoBien({ ...nuevoBien, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const bienFormateado = {
      nSerie: nuevoBien.nSerie,
      idTipoBien: parseInt(nuevoBien.idTipo),
      idUsuario: 3, // Ajusta según corresponda
      status: true,
      idModelo: parseInt(nuevoBien.idModelo),
      idMarca: parseInt(nuevoBien.idMarca),
      idLugar: parseInt(nuevoBien.idLugar),
      fecha: new Date().toISOString().split("T")[0] + "T00:00:00Z"
    };

    axios.post("http://localhost:8080/bienes", bienFormateado, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(response => {
        setBienes([...bienes, { ...response.data.result, id: response.data.result.idBien }]);
        setOpen(false);
      })
      .catch(error => console.error("Error al crear bien:", error.response?.data || error.message));
  };

  const handleDarDeBaja = () => {
    if (!selectedBien || !motivoBaja.trim()) return;

    const bajaData = {
      idBien: selectedBien.id,
      motivo: motivoBaja,
      fecha: new Date().toISOString()
    };

    axios.post("http://localhost:8080/bajas", bajaData)
      .then(() => {
        setBienes(bienes.filter(bien => bien.id !== selectedBien.id));
        setOpenBaja(false);
        setSelectedBien(null);
        setMotivoBaja("");
      })
      .catch(error => console.error("Error al dar de baja:", error.response?.data || error.message));
  };

  const columns = [
    {
      field: "codigoBarras",
      headerName: "Código de Barras",
      width: 180,
      renderCell: (params) => <Barcode value={params.value} />,
    },
    { field: "nSerie", headerName: "Número de Serie", width: 180 },
    { field: "tipoBien", headerName: "Tipo de Bien", width: 180 },
    { field: "modelo", headerName: "Modelo", width: 180 },
    { field: "marca", headerName: "Marca", width: 180 },
    { field: "lugar", headerName: "Lugar", width: 180 },
    {
      field: "imagen", headerName: "Imagen", width: 180,
      renderCell: (params) => <img src={params.value} alt="modelo" style={{ width: "100px", height: "auto" }} />
    },
    {
      field: "actions",
      headerName: "Acciones",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            setSelectedBien(params.row);
            setOpenBaja(true);
          }}
        >
          Dar de Baja
        </Button>
      )
    }
  ];

  return (
    <div style={{ padding: "20px", minHeight: "100vh", backgroundColor: darkMode ? "#1E1E1E" : "#F3F4F6" }}>
      <h1 style={{ color: darkMode ? "#AED581" : "#7CB342" }}>Bienes</h1>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>Agregar Bien</Button>
        <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
      </div>

      <Box sx={{ height: 400, width: "100%", margin: "20px auto" }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <DataGrid
            rows={bienes}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            autoHeight
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: darkMode ? "#333" : "#6A1B9A",
                color: "#FFF",
              },
              "& .MuiDataGrid-row": {
                backgroundColor: darkMode ? "#1E1E1E" : "#FFF",
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: darkMode ? "#333" : "#6A1B9A",
                color: "#FFF",
              },
            }}
          />
        )}
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Agregar Bien</DialogTitle>
        <DialogContent>
          <TextField label="Número de Serie" name="nSerie" fullWidth onChange={handleChange} margin="dense" />
          <TextField
            select
            label="Tipo de Bien"
            name="idTipo"
            value={nuevoBien.idTipo}
            fullWidth
            onChange={handleChange}
            margin="dense"
          >
            {tiposBien.map(tipo => (
              <MenuItem key={tipo.idTipo} value={tipo.idTipo}>{tipo.nombre}</MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Modelo"
            name="idModelo"
            value={nuevoBien.idModelo}
            fullWidth
            onChange={handleChange}
            margin="dense"
          >
            {modelos.map(modelo => (
              <MenuItem key={modelo.idModelo} value={modelo.idModelo}>{modelo.nombreModelo}</MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Marca"
            name="idMarca"
            value={nuevoBien.idMarca}
            fullWidth
            onChange={handleChange}
            margin="dense"
          >
            {marcas.map(marca => (
              <MenuItem key={marca.idmarca} value={marca.idmarca}>{marca.nombre}</MenuItem>
            ))}
          </TextField>

<TextField
  select
  label="Lugar Asignado"
  name="idLugar"
  value={nuevoBien.idLugar}
  fullWidth
  onChange={handleChange}
  margin="dense"
>
  {lugares.length === 0 ? (
    <MenuItem disabled>Cargando Lugares...</MenuItem>
  ) : (
    lugares.map(lugar => (
      <MenuItem key={lugar.idlugar} value={lugar.idlugar}>
        {lugar.lugar}
      </MenuItem>
    ))
  )}
</TextField>

        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleSubmit} color="primary">Guardar</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openBaja} onClose={() => setOpenBaja(false)}>
  <DialogTitle>Dar de Baja</DialogTitle>
  <DialogContent>
    <TextField
      label="Motivo de Baja"
      fullWidth
      multiline
      rows={4}
      value={motivoBaja}
      onChange={(e) => setMotivoBaja(e.target.value)}
      margin="dense"
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOpenBaja(false)}>Cancelar</Button>
    <Button onClick={handleDarDeBaja} color="primary">
      Confirmar Baja
    </Button>
  </DialogActions>
</Dialog>

    </div>
  );
};

export default Bienes;
