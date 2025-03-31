//../../../styles/cards.js
import { styled } from "@mui/material/styles";
import { Card, CardMedia, CardContent } from "@mui/material";

export const BienCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
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
  paddingTop: '56.25%',
  position: 'relative',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundColor: theme.palette.mode === 'light' ? '#f5f5f5' : '#2A2A2A',
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const CardContentResponsiva = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(2),
  '& .MuiTypography-root': {
    marginBottom: theme.spacing(1),
    color: theme.palette.text.primary,
    '&:last-child': {
      marginBottom: 0,
    },
  },
}));