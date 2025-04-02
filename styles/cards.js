import { styled } from "@mui/material/styles";
import { Card, CardMedia, CardContent } from "@mui/material";

export const BienCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? theme.palette.background.paper : '#2d2d2d',
  borderRadius: '16px',
  transition: 'all 0.3s ease',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  boxShadow: theme.palette.mode === 'light' 
    ? '0 4px 20px rgba(106, 27, 154, 0.2)' 
    : '0 8px 16px rgba(0, 0, 0, 0.3)',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.palette.mode === 'light'
      ? '0 8px 30px rgba(106, 27, 154, 0.3)'
      : '0 12px 28px rgba(0, 0, 0, 0.4)',
  },
  [theme.breakpoints.down('sm')]: {
    borderRadius: '12px',
  },
}));

export const CardMediaResponsiva = styled(CardMedia)(({ theme }) => ({
  height: 0,
  paddingTop: '56.25%',
  position: 'relative',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundColor: theme.palette.mode === 'light' ? '#f5f5f5' : '#424242',
  borderBottom: `2px solid ${theme.palette.secondary.main}`,
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.02)',
  },
}));

export const CardContentResponsiva = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(2.5),
  backgroundColor: theme.palette.mode === 'light' ? theme.palette.background.paper : '#2d2d2d',
  '& .MuiTypography-root': {
    marginBottom: theme.spacing(1.5),
    color: theme.palette.mode === 'light' ? theme.palette.text.primary : '#fff',
    fontWeight: 600,
    '&:last-child': {
      marginBottom: 0,
    },
  },
  '& .MuiTypography-body2': {
    color: theme.palette.mode === 'light' ? theme.palette.text.secondary : '#e0e0e0',
  },
}));
