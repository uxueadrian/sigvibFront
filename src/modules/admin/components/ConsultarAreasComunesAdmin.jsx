import React from 'react';

const ConsultarAreasComunesAdmin = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Áreas Comunes</h3>
          <div className="flex space-x-4">
            <button className="bg-purple-600 text-white px-4 py-2 rounded-md">
              Nueva Área
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-purple-600 text-white">
            <tr>
              <th className="px-6 py-3 text-center">Lugar</th>
              <th className="px-6 py-3 text-center">Descripción</th>
              <th className="px-6 py-3 text-center">Bienes asignados</th>
              <th className="px-6 py-3 text-center">Status</th>
              <th className="px-6 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {/* No hay datos aquí aún */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConsultarAreasComunesAdmin;
