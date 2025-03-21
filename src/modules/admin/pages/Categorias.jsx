import React, { useState, useEffect, useContext } from "react";
import Stack from "@mui/material/Stack";
import TipoBien from "./TipoBien";
import Marcas from "./Marcas";
import Modelos from "./Modelos";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import { Button, Modal, TextField, Box, Typography, CircularProgress } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const CrearModal = ({ open, handleClose, fetchData, endpoint, title, includeImage }) => {
  const { token } = useContext(AuthContext);
  const [nombre, setNombre] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imagen, setImagen] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImagen(file);
  };

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
      };

      const formData = new FormData();
      formData.append("nombre", nombre.trim());
      formData.append("status", true);
      if (includeImage && imagen) {
        formData.append("foto", imagen);
      }

      await axios.post(`http://localhost:8080/${endpoint}`, formData, { headers });

      setNombre("");
      setImagen(null);
      handleClose();
      fetchData();
    } catch (err) {
      console.error(`Error al crear ${title.toLowerCase()}: `, err);
      setError(`Hubo un error al crear ${title.toLowerCase()}. Inténtalo de nuevo.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Crear {title}
        </Typography>
        <TextField
          fullWidth
          label="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          error={!!error}
          helperText={error}
          margin="normal"
        />
        {includeImage && (
          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              component="label"
              startIcon={<CloudUploadIcon />}
            >
              Subir Imagen
              <input type="file" hidden onChange={handleImageChange} />
            </Button>
            {imagen && <Typography variant="body2" sx={{ mt: 1 }}>{imagen.name}</Typography>}
          </Box>
        )}
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
  const [modalTipoOpen, setModalTipoOpen] = useState(false);
  const [modalMarcaOpen, setModalMarcaOpen] = useState(false);
  const [modalModeloOpen, setModalModeloOpen] = useState(false);

  const fetchTiposBien = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const tiposRes = await axios.get("http://localhost:8080/tipo-bien", { headers });
      setTiposBien(tiposRes.data.result);
    } catch (error) {
      console.error("Error al obtener los tipos de bien: ", error);
    }
  };

  const fetchMarcas = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const marcasRes = await axios.get("http://localhost:8080/marca", { headers });
      setMarcas(marcasRes.data.result);
    } catch (error) {
      console.error("Error al obtener las marcas: ", error);
    }
  };

  const fetchModelos = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const modelosRes = await axios.get("http://localhost:8080/modelo", { headers });
      setModelos(modelosRes.data.result);
    } catch (error) {
      console.error("Error al obtener los modelos: ", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchTiposBien();
      fetchMarcas();
      fetchModelos();
    }
  }, [token]);

  return (
    <>
      <Stack direction="row" spacing={3}>
        <TipoBien data={tiposBien} loading={loading} />
        <Marcas data={marcas} loading={loading} />
        <Modelos data={modelos} loading={loading} />
      </Stack>
      <Button variant="contained" onClick={() => setModalTipoOpen(true)} sx={{ mt: 2 }}>
        Agregar Tipo de Bien
      </Button>
      <Button variant="contained" onClick={() => setModalMarcaOpen(true)} sx={{ mt: 2, ml: 2 }}>
        Agregar Marca
      </Button>
      <Button variant="contained" onClick={() => setModalModeloOpen(true)} sx={{ mt: 2, ml: 2 }}>
        Agregar Modelo
      </Button>
      <CrearModal open={modalTipoOpen} handleClose={() => setModalTipoOpen(false)} fetchData={fetchTiposBien} endpoint="tipo-bien" title="Tipo de Bien" />
      <CrearModal open={modalMarcaOpen} handleClose={() => setModalMarcaOpen(false)} fetchData={fetchMarcas} endpoint="marca" title="Marca" />
      <CrearModal open={modalModeloOpen} handleClose={() => setModalModeloOpen(false)} fetchData={fetchModelos} endpoint="modelo" title="Modelo" includeImage={true} />
    </>
  );
};

export default Categorias;
