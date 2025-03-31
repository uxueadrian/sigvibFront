// src/styles/components/buttons.js
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

export const SolicitarBtn = styled(Button)(({ theme }) => ({
  backgroundColor: '#00B4DC',
  color: theme.palette.common.white,
  fontWeight: 500,
  padding: theme.spacing(1, 1),
  borderRadius: '3px',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#0095B6',
    transform: 'translateY(-1px)',
    boxShadow: theme.shadows[2],
  },
  '&:active': {
    transform: 'translateY(0)',
  },
}));

export const EliminarBtn = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  color: theme.palette.common.white,
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
