import React from 'react';

const ConsultarLugarAdmin = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Consulta de Lugares</h3>
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar..."
              className="border rounded-md pl-3 pr-10 py-2 w-64"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-left">Nombre</th>
              <th className="px-6 py-3 text-left">Tipo</th>
              <th className="px-6 py-3 text-center">Capacidad</th>
              <th className="px-6 py-3 text-left">Responsable</th>
              <th className="px-6 py-3 text-center">Estado</th>
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

export default ConsultarLugarAdmin;
