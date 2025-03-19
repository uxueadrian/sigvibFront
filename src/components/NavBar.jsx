import React from "react";
import { AppBar, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material";

const Nabvar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return(
    <React.Fragment>

      <AppBar style={{background: "#7033FF"}}>

        <Toolbar>

          <Typography 
            variant="h6"
            component="div"
            sx={{
              flexFlow: 1,
              fontSize: isMobile ? "1.25rem" : "1.5rem"
            }}>
              SIGVIB
            </Typography>

        </Toolbar>
      </AppBar>
      
    </React.Fragment>
  );
}

export default Nabvar;

