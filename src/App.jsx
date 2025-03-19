import React, {useContext} from "react";
import Sidebar from "./components/Sidebar";
import { AuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import {adminLinks, becarioLinks, responsableLinks} from "../src/routers/links";
import {routersAdmin} from "../src/routers/routerAdmin/routersAdmin";
import {routersBecario} from "../src/routers/routerBecario/routersBecario";
import {routersResponsable} from "../src/routers/routerResponsable/routersResponsable";

function App() {
  const { user } = useContext(AuthContext);

  const userRole = user ? user.role : null;

  const roleConfig = {
    admin: { links: adminLinks, routers: routersAdmin() },
    becario: { links: becarioLinks, routers: routersBecario() },
    responsable: { links: responsableLinks, routers: routersResponsable() }
  }

  const { links, routers } = roleConfig[userRole] || { links: [], routers: null };

  return (
    <div>
      {user ? ( 
        <>
          <Sidebar linksArray={links} />
          {routers}
        </>
      ) : ( // Si no está autenticado, muestra el Login
        <Login />
      )}
    </div>
  );
}

export default App;


