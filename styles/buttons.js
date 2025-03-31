//../../../styles/buttons.js
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

export const SolicitarBtn = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#00B4DC' : '#00A0C0',
  color: theme.palette.getContrastText(
    theme.palette.mode === 'light' ? '#00B4DC' : '#00A0C0'
  ),
  fontWeight: 500,
  padding: theme.spacing(1, 1),
  borderRadius: '3px',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'light' ? '#0095B6' : '#0080A0',
    transform: 'translateY(-1px)',
    boxShadow: theme.shadows[2],
  },
  '&:active': {
    transform: 'translateY(0)',
  },
}));

export const EliminarBtn = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  color: theme.palette.error.contrastText,
  fontWeight: 500,
  padding: theme.spacing(1, 1),
  borderRadius: '3px',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: theme.palette.error.dark,
    transform: 'translateY(-1px)',
    boxShadow: theme.shadows[2],
  },
  '&:active': {
    transform: 'translateY(0)',
  },
}));
