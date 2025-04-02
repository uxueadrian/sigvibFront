import { createTheme } from "@mui/material/styles"

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#6a1b9a", // Morado del header
      light: "#9c4dcc",
      dark: "#38006b",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#bb86fc", // Morado claro para elementos secundarios
      light: "#eeb8ff",
      dark: "#8b57c9",
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#ff1744",
      light: "#ff616f",
      dark: "#c4001d",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#F8F9FA", // Gris muy claro
      paper: "#FFFFFF", // Blanco puro
    },
    text: {
      primary: "#1A1A1A", // Casi negro
      secondary: "#4A4A4A", // Gris oscuro
    },
    divider: "rgba(0, 0, 0, 0.12)",
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: "-0.5px",
    },
    h2: {
      fontWeight: 700,
      letterSpacing: "-0.5px",
    },
    button: {
      fontWeight: 600,
      letterSpacing: "0.5px",
    },
  },
  shadows: [
    "none",
    "0px 2px 4px rgba(0, 0, 0, 0.05)",
    "0px 4px 8px rgba(0, 0, 0, 0.08)",
    "0px 6px 12px rgba(0, 0, 0, 0.1)",
    "0px 8px 16px rgba(0, 0, 0, 0.12)",
    "0px 10px 20px rgba(0, 0, 0, 0.14)",
    "0px 12px 24px rgba(0, 0, 0, 0.16)",
    "0px 14px 28px rgba(0, 0, 0, 0.18)",
    "0px 16px 32px rgba(0, 0, 0, 0.2)",
    "0px 18px 36px rgba(0, 0, 0, 0.22)",
    "0px 20px 40px rgba(0, 0, 0, 0.24)",
    "0px 22px 44px rgba(0, 0, 0, 0.26)",
    "0px 24px 48px rgba(0, 0, 0, 0.28)",
    "0px 26px 52px rgba(0, 0, 0, 0.3)",
    "0px 28px 56px rgba(0, 0, 0, 0.32)",
    "0px 30px 60px rgba(0, 0, 0, 0.34)",
    "0px 32px 64px rgba(0, 0, 0, 0.36)",
    "0px 34px 68px rgba(0, 0, 0, 0.38)",
    "0px 36px 72px rgba(0, 0, 0, 0.4)",
    "0px 38px 76px rgba(0, 0, 0, 0.42)",
    "0px 40px 80px rgba(0, 0, 0, 0.44)",
    "0px 42px 84px rgba(0, 0, 0, 0.46)",
    "0px 44px 88px rgba(0, 0, 0, 0.48)",
    "0px 46px 92px rgba(0, 0, 0, 0.5)",
    "0px 48px 96px rgba(0, 0, 0, 0.52)",
  ],
})

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#6a1b9a", // Morado intenso para mantener coherencia
      light: "#9c4dcc",
      dark: "#38006b",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#bb86fc", // Morado claro para mejor contraste
      light: "#eeb8ff",
      dark: "#8b57c9",
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#ff1744",
      light: "#ff616f",
      dark: "#c4001d",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#121212", // Fondo oscuro base
      paper: "#1E1E1E", // Tarjetas un poco más claras
    },
    text: {
      primary: "#E0E0E0", // Blanco suave
      secondary: "#A0A0A0", // Gris medio
    },
    divider: "rgba(255, 255, 255, 0.12)",
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: "-0.5px",
    },
    h2: {
      fontWeight: 700,
      letterSpacing: "-0.5px",
    },
    button: {
      fontWeight: 600,
      letterSpacing: "0.5px",
    },
  },
  shadows: [
    "none",
    "0px 2px 4px rgba(0, 0, 0, 0.2)",
    "0px 4px 8px rgba(0, 0, 0, 0.25)",
    "0px 6px 12px rgba(0, 0, 0, 0.3)",
    "0px 8px 16px rgba(0, 0, 0, 0.35)",
    "0px 10px 20px rgba(0, 0, 0, 0.4)",
    "0px 12px 24px rgba(0, 0, 0, 0.45)",
    "0px 14px 28px rgba(0, 0, 0, 0.5)",
    "0px 16px 32px rgba(0, 0, 0, 0.55)",
    "0px 18px 36px rgba(0, 0, 0, 0.6)",
    "0px 20px 40px rgba(0, 0, 0, 0.65)",
    "0px 22px 44px rgba(0, 0, 0, 0.7)",
    "0px 24px 48px rgba(0, 0, 0, 0.75)",
    "0px 26px 52px rgba(0, 0, 0, 0.8)",
    "0px 28px 56px rgba(0, 0, 0, 0.85)",
    "0px 30px 60px rgba(0, 0, 0, 0.9)",
    "0px 32px 64px rgba(0, 0, 0, 0.95)",
    "0px 34px 68px rgba(0, 0, 0, 1)",
    "0px 36px 72px rgba(0, 0, 0, 1)",
    "0px 38px 76px rgba(0, 0, 0, 1)",
    "0px 40px 80px rgba(0, 0, 0, 1)",
    "0px 42px 84px rgba(0, 0, 0, 1)",
    "0px 44px 88px rgba(0, 0, 0, 1)",
    "0px 46px 92px rgba(0, 0, 0, 1)",
    "0px 48px 96px rgba(0, 0, 0, 1)",
  ],
})

export { lightTheme, darkTheme }

