// theme/theme.js
import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#B0E338', // Verde claro (conservando tu color original)
      contrastText: '#1A1A1A',
    },
    secondary: {
      main: '#7033FF', // Morado del sidebar
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#FF3D57', // Rojo más vibrante
    },
    background: {
      default: '#F8F9FA', // Gris muy claro
      paper: '#FFFFFF',   // Blanco puro
    },
    text: {
      primary: '#1A1A1A', // Casi negro
      secondary: '#4A4A4A', // Gris oscuro
    },
    divider: 'rgba(0, 0, 0, 0.12)',
  
    /*components: {
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
    },*/
  
  },
  
  // ... resto de tu configuración light
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#B0E338', // Mismo verde para consistencia
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#8A63FF', // Morado más claro para mejor contraste en dark
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#FF6B7F', // Rojo más suave
    },
    background: {
      default: '#121212', // Fondo oscuro base
      paper: '#1E1E1E',   // Tarjetas un poco más claras
    },
    text: {
      primary: '#E0E0E0', // Blanco suave
      secondary: '#A0A0A0', // Gris medio
    },
    divider: 'rgba(255, 255, 255, 0.12)',

    /*components: {
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
          }
        }
      }
    },*/

  },
  // ... resto de tu configuración dark
});

export { lightTheme, darkTheme };
