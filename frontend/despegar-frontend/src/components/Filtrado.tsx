import React from 'react';
import type { FiltroTipo } from '../hooks/useFilter';

interface Props {
  filtroActual: FiltroTipo;
  onCambiarFiltro: (nuevoFiltro: FiltroTipo) => void;
}

export const FiltrosBar: React.FC<Props> = ({ filtroActual, onCambiarFiltro }) => {
  const botones: { id: FiltroTipo; label: string; icon: string }[] = [
    { id: 'TODOS', label: 'Todos', icon: '📋' },
    { id: 'ALERTAS', label: 'Alertas', icon: '🚨' }, 
    { id: 'VUELOS', label: 'Vuelos en Alerta', icon: '✈️' },
    { id: 'HOTELES', label: 'Hoteles en Alerta', icon: '🏨' },
    { id: 'RESUELTOS', label: 'Resueltas', icon: '✅' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:flex lg:flex-wrap gap-3 mb-6">
  {botones.map((btn) => (
    <button
      key={btn.id}
      onClick={() => onCambiarFiltro(btn.id)}
      className={`flex items-center gap-2 px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all border shadow-sm whitespace-nowrap active:scale-95 ${
        filtroActual === btn.id
          ? 'bg-[#270570] text-white border-[#270570]'
          : 'bg-white text-gray-400 border-gray-100 hover:border-gray-200'
      }`}
    >
      <span>{btn.icon}</span>
      {btn.label}
    </button>
  ))}
</div>

  );
};