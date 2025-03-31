import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import { ThemeProvider, CssBaseline } from '@mui/material'; // Importa los componentes necesarios
import theme from '../theme/theme.js'; // Importa tu tema personalizado


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Esto es esencial para el reset de estilos */}
      <App />
    </ThemeProvider>
  </StrictMode>,
)


