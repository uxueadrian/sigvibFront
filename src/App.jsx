import React from "react";
import Sidebar from "./components/Sidebar";
import {adminLinks, becarioLinks, responsableLinks} from "../src/routers/links";
import {routersAdmin} from "../src/routers/routerAdmin/routersAdmin";
import {routersBecario} from "../src/routers/routerBecario/routersBecario";
import {routersResponsable} from "../src/routers/routerResponsable/routersResponsable";

function App() {
  const userRole = 'becario';

  const roleConfig = {
    admin: { links: adminLinks, routers: routersAdmin() },
    becario: { links: becarioLinks, routers: routersBecario() },
    responsable: { links: responsableLinks, routers: routersResponsable() }
  }

  const { links, routers } = roleConfig[userRole] || { links: [], routers: null };

  return (
    <div>
      <Sidebar linksArray={links} />
      {routers}

  </div>
  );
}

export default App;


