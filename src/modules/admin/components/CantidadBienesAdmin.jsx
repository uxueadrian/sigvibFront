import React from "react";

const CantidadBienesAdmin = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b">
        <h3 className="text-xl font-semibold">Resumen de Bienes</h3>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-blue-100 p-4 rounded-lg">
            <p className="text-sm text-blue-800">Total</p>
            <p className="text-2xl font-bold text-blue-800">0</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg">
            <p className="text-sm text-green-800">Disponibles</p>
            <p className="text-2xl font-bold text-green-800">0</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg">
            <p className="text-sm text-yellow-800">En Uso</p>
            <p className="text-2xl font-bold text-yellow-800">0</p>
          </div>
          <div className="bg-red-100 p-4 rounded-lg">
            <p className="text-sm text-red-800">Mantenimiento</p>
            <p className="text-2xl font-bold text-red-800">0</p>
          </div>
        </div>
        
        <h4 className="text-lg font-medium mb-4">Distribución por Categoría</h4>
        <div className="space-y-4">
          {/* Ejemplo de categorías sin datos dinámicos */}
          <div>
            <div className="flex justify-between mb-1">
              <span>Categoría A</span>
              <span>0 (0%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '0%' }}></div>
            </div>
          </div>
        </div>
        
        {/* Botones de acción */}
        <div className="mt-8 flex justify-end space-x-4">
          <button className="bg-purple-600 text-white px-4 py-2 rounded-md">
            Ver Reporte Completo
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
            Exportar Datos
          </button>
        </div>
      </div>
    </div>
  );
};

export default CantidadBienesAdmin;
