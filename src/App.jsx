import { Routes, Route } from "react-router-dom";
import DashboardAdmin from "./modules/admin/pages/DashboardAdmin";
import DashboardBecario from "./modules/becario/pages/DashboardBecario";
import DashboardResponsable from "./modules/responsable/pages/DashboardResponsable";
import NotFound from "./modules/shared/components/NotFound"; 

function App() {
  return (
    <>
      <Routes>
        <Route path="/dashboardadmin" element={<DashboardAdmin />} />
        <Route path="/dashboardbecario" element={<DashboardBecario />} />
        <Route path="/dashboardresponsable" element={<DashboardResponsable />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;