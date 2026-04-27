import React from 'react';
import type { Reserva } from '../types/Reserva';

interface Props {
  reserva: Reserva;
  onGestionar: (id: number) => void;
  isLoading: boolean;
}

export const ReservaRow: React.FC<Props> = ({ reserva, onGestionar, isLoading }) => {
  const isCritical = reserva.estadoGeneralReserva === 'CON_CONTINGENCIA';

  const profileNames: Record<string, { label: string }> = {
    'LOW_COST': { label: 'Económico' },
    'ESTÁNDAR': { label: 'Explorador'},
    'BUSINESS': { label: 'Viajero'},
    'VIP': { label: 'Premium' },
    'FAMILIA': { label: 'Familia'}
  };

  return (
    <tr className="border-b border-gray-100 hover:bg-[#f5f7fa] transition-colors group">
      <td className="p-5">
        <div className="font-bold text-gray-700 text-sm tracking-tight">
          {reserva.nombreUsuario}
        </div>
        <div className="mt-1 flex items-center gap-2">
          <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-gray-100 text-gray-400 ${profileNames[reserva.perfilUsuario]}}`}>
            {profileNames[reserva.perfilUsuario]?.label || reserva.perfilUsuario.replace(/_/g, ' ')}
          </span>
        </div>
      </td>

      <td className="p-5">
        <div className="flex flex-col gap-3">
          {reserva.origen && (
            <div className="flex flex-col">
              <div className="flex items-center gap-2 font-bold text-gray-700 text-sm">
                <span>{reserva.origen}</span>
                <span className="font-black">➔</span>
                <span>{reserva.destino}</span>
              </div>
              <div className={`text-[11px] font-bold mt-0.5 ${reserva.estadoVuelo !== 'PROGRAMADO' ? 'text-[#fa503f]' : 'text-gray-400'}`}>
                {reserva.estadoVuelo || 'Vuelo No Asignado'}
              </div>
            </div>
          )}

          {reserva.nombreHotel && (
            <div className="pt-2 border-t border-gray-50">
              <div className="font-bold text-[#434343] text-sm flex items-center gap-1.5">
                {reserva.nombreHotel}
              </div>
              <div className={`text-[11px] font-bold mt-0.5 ${reserva.estadoHotel === 'NO_DISPONIBLE' ? 'text-[#fa503f]' : 'text-gray-400'}`}>
                {reserva.estadoHotel || 'Estado desconocido'}
              </div>
            </div>
          )}
        </div>
      </td>

      <td className="p-5">
        <span className={`text-[10px] font-bold px-4 py-1.5 rounded-full border-none shadow-sm tracking-tighter ${isCritical
          ? 'bg-[#dc3533] text-white'
          : 'bg-[#0f9266] text-white'
          }`}>
          {reserva.estadoGeneralReserva === 'CON_CONTINGENCIA' ? 'CONTINGENCIA' : 'ACTIVO'}
        </span>
      </td>

      <td className="p-5 text-right">
        <button
          onClick={() => onGestionar(reserva.reservaId)}
          disabled={isLoading}
          className={`relative px-8 py-2.5 rounded-full text-[11px] font-bold tracking-widest transition-all min-w-[130px] shadow-sm active:scale-95
            ${isLoading
              ? 'bg-gray-300 text-gray-300 cursor-not-allowed'
              : 'bg-[#270570] text-white hover:bg-[#1a034d] hover:shadow-md'
            }`}
        >
          <span className={isLoading ? 'invisible' : 'visible'}>GESTIONAR</span>

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