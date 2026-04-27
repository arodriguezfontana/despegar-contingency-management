import React from 'react';
import type { Reserva } from '../types/Reserva';

interface Props {
  reserva: Reserva;
  onGestionar: (id: number) => void;
  isLoading: boolean;
}

export const ReservaRow: React.FC<Props> = ({ reserva, onGestionar, isLoading }) => {
  const isCritical = reserva.estadoGeneralReserva === 'CON_CONTINGENCIA';

  return (
    <tr className="border-b border-gray-50 hover:bg-blue-50/30 transition-all">
      <td className="p-4">
        <div className="font-bold text-gray-800 text-sm">{reserva.nombreUsuario}</div>
        <div className="text-[10px] text-gray-400 font-bold uppercase">{reserva.perfilUsuario}</div>
      </td>
      <td className="p-4 text-sm">
        {reserva.origen && (
          <div className="mb-2">
            <span className="font-semibold text-gray-700">{reserva.origen} ➔ {reserva.destino}</span>
            <div className={`text-[11px] font-bold ${reserva.estadoVuelo !== 'PROGRAMADO' ? 'text-[#fa503f]' : 'text-gray-400'}`}>
              {reserva.estadoVuelo || 'Vuelo No Asignado'}
            </div>
          </div>
        )}

        {reserva.nombreHotel && (
          <div className="border-t border-gray-100 pt-2">
            <span className="font-semibold text-gray-700">{reserva.nombreHotel}</span>
            <div className={`text-[11px] font-bold ${reserva.estadoHotel === 'NO_DISPONIBLE' ? 'text-[#fa503f]' : 'text-gray-400'}`}>
              {reserva.estadoHotel || 'Estado desconocido'}
            </div>
          </div>
        )}
      </td>
      <td className="p-4">
        <span className={`text-[10px] font-black px-3 py-1 rounded-full border shadow-sm ${isCritical
            ? 'bg-red-50 text-[#fa503f]'
            : 'bg-green-50 text-green-600'
          }`}>
          {reserva.estadoGeneralReserva === 'CON_CONTINGENCIA' ? 'CONTINGENCIA' : 'ACTIVO'}
        </span>
      </td>
      <td className="p-4 text-right">
        <button
          onClick={() => onGestionar(reserva.reservaId)}
          disabled={isLoading}
          className={`relative px-6 py-2 rounded-full text-xs font-bold transition-all min-w-[110px] ${isLoading ? 'bg-gray-400 text-transparent' : 'bg-[#43259e] text-white hover:shadow-lg'
            }`}
        >
          <span className={isLoading ? 'invisible' : 'visible'}>Gestionar</span>

          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            </div>
          )}
        </button>
      </td>
    </tr>
  );
};