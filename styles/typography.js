import { styled } from "@mui/material/styles"
import { Typography } from "@mui/material"

export const Tituloh1 = styled(Typography)(({ theme }) => ({
  color: theme.palette.mode === "light" ? theme.palette.primary.main : "#fff",
  fontSize: "2.5rem",
  fontWeight: 700,
  marginBottom: theme.spacing(4),
  textAlign: "center",
  letterSpacing: "-0.5px",
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: "-12px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "60px",
    height: "4px",
    backgroundColor: theme.palette.secondary.main,
    borderRadius: "2px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "2rem",
    marginBottom: theme.spacing(3.5),
    "&::after": {
      width: "50px",
      bottom: "-10px",
    },
  },
}))

