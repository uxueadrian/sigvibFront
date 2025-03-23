import React, { useState, useEffect, useContext } from "react";
import Stack from "@mui/material/Stack";
import TipoBien from "./TipoBien";
import Marcas from "./Marcas";
import Modelos from "./Modelos";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import { Button, Modal, TextField, Box, Typography, CircularProgress } from "@mui/material";

const CrearEntidadModal = ({ open, handleClose, fetchData, endpoint, entidad }) => {
  const { token } = useContext(AuthContext);
  const [nombre, setNombre] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreate = async () => {
    if (nombre.trim() === "") {
      setError("El nombre es obligatorio.");
      return;
    }
  
    setLoading(true);
    setError(null);
  
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
  
      const data = entidad === "Modelo" 
        ? { nombreModelo: nombre.trim(), foto: "URL_DEFAULT_O_CAMPO_DE_ENTRADA" }
        : { nombre: nombre.trim(), status: true };
  
      await axios.post(endpoint, data, { headers });
      setNombre("");
      handleClose();
      fetchData();
    } catch (err) {
      console.error(`Error al crear ${entidad}: `, err);
      setError(`Hubo un error al crear ${entidad}. Inténtalo de nuevo.`);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", boxShadow: 24, p: 4, borderRadius: 2 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Crear {entidad}
        </Typography>
        <TextField fullWidth label="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} error={!!error} helperText={error} margin="normal" />
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button variant="outlined" onClick={handleClose} disabled={loading}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleCreate} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Crear"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

const Categorias = () => {
  const { token } = useContext(AuthContext);
  const [tiposBien, setTiposBien] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(null);

  const fetchData = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const [tiposRes, marcasRes, modelosRes] = await Promise.all([
        axios.get("http://localhost:8080/tipo-bien", { headers }),
        axios.get("http://localhost:8080/marca", { headers }),
        axios.get("http://localhost:8080/modelo", { headers }),
      ]);

      setTiposBien(tiposRes.data.result);
      setMarcas(marcasRes.data.result);
      setModelos(modelosRes.data.result);
    } catch (error) {
      console.error("Error al obtener los datos: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchData();
  }, [token]);

  return (
    <>
      <Stack direction="row" spacing={3}>
        <TipoBien data={tiposBien} loading={loading} />
        <Marcas data={marcas} loading={loading} />
        <Modelos data={modelos} loading={loading} />
      </Stack>

      <Button variant="contained" onClick={() => setModalOpen("tipo-bien")} sx={{ mt: 2 }}>
        Agregar Tipo de Bien
      </Button>
      <Button variant="contained" onClick={() => setModalOpen("marca")} sx={{ mt: 2, ml: 2 }}>
        Agregar Marca
      </Button>
      <Button variant="contained" onClick={() => setModalOpen("modelo")} sx={{ mt: 2, ml: 2 }}>
        Agregar Modelo
      </Button>

      {modalOpen === "tipo-bien" && (
        <CrearEntidadModal open handleClose={() => setModalOpen(null)} fetchData={fetchData} endpoint="http://localhost:8080/tipo-bien" entidad="Tipo de Bien" />
      )}
      {modalOpen === "marca" && (
        <CrearEntidadModal open handleClose={() => setModalOpen(null)} fetchData={fetchData} endpoint="http://localhost:8080/marca" entidad="Marca" />
      )}
      {modalOpen === "modelo" && (
        <CrearEntidadModal open handleClose={() => setModalOpen(null)} fetchData={fetchData} endpoint="http://localhost:8080/modelo" entidad="Modelo" />
      )}
    </>
  );
};

export default Categorias;
