import React from 'react';
import CantidadBienesAdmin from './../components/CantidadBienesAdmin'; 
import ConsultarAreasComunesAdmin from './../components/ConsultarAreasComunesAdmin';  
import ConsultarLugarAdmin from './../components/ConsultarLugarAdmin';  

const DashboardAdmin = () => {
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">Panel de Administración</h1>
      
      <div className="space-y-6">
        <CantidadBienesAdmin />
        
        <ConsultarAreasComunesAdmin />
        
        <ConsultarLugarAdmin />
      </div>
    </div>
  );
};

export default DashboardAdmin;
