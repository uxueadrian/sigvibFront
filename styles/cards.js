// src/styles/components/cards.js
import { styled } from "@mui/material/styles";
import { Card, CardMedia, CardContent } from "@mui/material";

export const BienCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderRadius: '12px',
  transition: 'all 0.3s ease',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  '&:hover': {
    transform: 'translateY(-1px)',
    boxShadow: theme.shadows[4],
  },
  [theme.breakpoints.down('sm')]: {
    borderRadius: '8px',
  },
}));

export const CardMediaResponsiva = styled(CardMedia)(({ theme }) => ({
  height: 0,
  paddingTop: '56.25%', // Relación 16:9
  position: 'relative',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundColor: '#f5f5f5',
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const CardContentResponsiva = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(2),
  '& .MuiTypography-root': {
    marginBottom: theme.spacing(1),
    '&:last-child': {
      marginBottom: 0,
    },
  },
}));

