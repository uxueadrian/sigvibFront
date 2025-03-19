import DashboardIcon from '@mui/icons-material/Dashboard';
import PlaceIcon from '@mui/icons-material/Place';
import CategoryIcon from '@mui/icons-material/Category';
import PeopleIcon from '@mui/icons-material/People';
import ChairIcon from '@mui/icons-material/Chair';
import EventSeatIcon from '@mui/icons-material/EventSeat';

const adminLinks = [
  { label: "DashBoard", icon: <DashboardIcon />, to: "/dashboardAdmin" },
  { label: "Areas", icon: <PlaceIcon />, to: "/consultarAreasComunes" },
  { label: "Categorias", icon: <CategoryIcon />, to: "/categorias" },
  { label: "Usuarios", icon: <PeopleIcon />, to: "/consultarUsuarios" },
  { label: "Lugares", icon: <ChairIcon />, to: "/ConsultarLugares" }
];

const becarioLinks = [
  { label: "Bienes Becario", icon: <ChairIcon />, to: "/bienesBecario" },
  { label: "Solicitar Bien", icon: <ChairIcon />, to: "/solicitarBienBecario" }
];

const responsableLinks = [
  { label: "Bienes Responsable", icon: <EventSeatIcon />, to: "/bienesResponsable" },
  { label: "Solicitar bien Responsable", icon: <EventSeatIcon />, to: "/solicitarBienResponsable" }
];

export { adminLinks, becarioLinks, responsableLinks };

