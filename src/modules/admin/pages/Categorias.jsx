//Aqui solo traemos el componente CantidadBienes
// src/pages/Dashboard.jsx
import React from "react";
import TipoBien from "./TipoBien";

import Stack from '@mui/material/Stack';
import Marcas from "./Marcas";
import Modelos from "./Modelos";


const Categorias = () => {
  return (
    <Stack direction="row" spacing={3}>
      <TipoBien></TipoBien>
      <Marcas></Marcas>
      <Modelos></Modelos>
    </Stack>
    
  );
};



export default Categorias;
