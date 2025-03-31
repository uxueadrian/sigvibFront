//../../../styles/layout.js
import { styled } from "@mui/material/styles";
import { Container, Grid, Paper, Box } from "@mui/material";

export const ContainerResponsiva = styled(Container)(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: '64px', // Ajusta según la altura de tu Navbar
  transition: 'margin 0.3s ease',
  '&.sidebar-open': {
    marginLeft: '240px',
    width: 'calc(100% - 240px)',
  },
  [theme.breakpoints.down('md')]: {
    '&.sidebar-open, &.sidebar-closed': {
      marginLeft: 0,
      width: '100%',
      padding: theme.spacing(2),
    },
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
  },
}));

export const CardsGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
  },
}));

export const CardItem = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
  },
}));

export const PaperResponsiva = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  borderRadius: '12px',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

export const CustomBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '50px'
}));

