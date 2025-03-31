// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#B0E338', // Color primario
    },
    secondary: {
      main: '#dc004e', // Color secundario
    },
    error: {
      main: '#f44336', // Color para errores
    },
    background: {
      default: '#f5f5f5', // Color de fondo por defecto
      paper: '#ffffff', // Color de fondo para componentes como Paper
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    // Personaliza otros elementos tipográficos según necesites
  },
  components: {
    // Personalizaciones globales de componentes MUI
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Evita que los textos de botones estén en mayúsculas
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '8px', // Bordes redondeados para Paper
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)', // Sombra más suave
        },
      },
    },
  },
});

export default theme;