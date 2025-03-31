import { AppBar, Toolbar, Typography, styled, Box } from '@mui/material';
import { APP_BAR_HEIGHT, APP_BAR_HEIGHT_MOBILE } from '../constants/layout';

const CustomAppBar = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: '#7033FF',
  width: '100%',
  boxShadow: 'none',
  borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
  borderRadius: 0,
}));

const CustomToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: APP_BAR_HEIGHT,
  padding: theme.spacing(0, 3),
  [theme.breakpoints.down('sm')]: {
    minHeight: APP_BAR_HEIGHT_MOBILE,
    padding: theme.spacing(0, 2),
  },
}));

const NavbarTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  letterSpacing: '1px',
  flexGrow: 1,
  textAlign: 'center', // Siempre centrado
  fontSize: '1.5rem',
  [theme.breakpoints.up('md')]: {
    fontSize: '1.75rem', // Mantenemos centrado "SIGVIB" también en desktop
  },
}));

const Navbar = () => {
  return (
    <CustomAppBar position="fixed">
      <CustomToolbar>
        <Box sx={{ 
          width: { xs: '48px', md: '0px' },
          transition: 'width 0.3s ease'
        }} />
        <NavbarTitle variant="h6" sx={{ color: "white" }}>
          SIGVIB
        </NavbarTitle>
      </CustomToolbar>
    </CustomAppBar>
  );
};

export default Navbar;

