import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { useTheme } from './context/ThemeContext';
import { ThemeProvider } from './context/ThemeContext';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from '../theme/theme.js';

function Root() {
  const { darkMode } = useTheme();
  
  return (
    <MuiThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <App />
    </MuiThemeProvider>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <Root />
    </ThemeProvider>
  </StrictMode>
);
