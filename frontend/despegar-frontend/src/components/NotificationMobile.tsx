import React from 'react';
import type { Solucion } from '../types/Solucion';

interface Props {
  solucion: Solucion;
  onClose: () => void;
  esContingencia: boolean;
  esCancelacion?: boolean;
  esDemora?: boolean;
  esHotelNoDisponible?: boolean;
}

export const NotificationMobile: React.FC<Props> = ({ 
  solucion, 
  onClose, 
  esContingencia,
  esCancelacion,
  esDemora,
  esHotelNoDisponible
}) => {
  return (
    <div className="fixed inset-0 bg-[#270570]/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="relative bg-[#1a1a1a] w-[300px] h-[600px] rounded-[3rem] border-[6px] border-[#333] shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#333] rounded-b-xl z-10"></div>

        <div className="flex-1 bg-white mt-2 overflow-hidden flex-col flex">
          <div className="bg-[#270570] p-6 text-white pt-10">
            <p className="text-[10px] uppercase tracking-widest opacity-70">Notificación Despegar</p>
            <h3 className="text-lg leading-tight mt-1">
              {esContingencia ? 'Importante' : 'Todo listo para tu viaje'}
            </h3>
          </div>

          <div className="p-5 flex-1 space-y-5 overflow-y-auto">
            <div className="flex items-start gap-2 bg-gray-50 p-3 rounded-lg border border-gray-100">
              <span className="text-lg">{esContingencia ? '⚠️' : '✨'}</span>
              <p className="text-[12px] text-gray-600 leading-relaxed">
                {solucion.mensaje}
              </p>
            </div>

            {esContingencia && (
              <div className="animate-in slide-in-from-right duration-500">
                <div className="bg-green-50 p-4 rounded-xl border border-green-200 shadow-sm">
                  <span className="text-[9px] text-green-700 uppercase tracking-tighter block mb-1">
                    Queremos recompensarte
                  </span>
                  <p className="text-[13px] text-green-800 leading-tight">
                    {solucion.beneficio}
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {solucion.sugerencias_origen?.length > 0 && (
                <div className="space-y-2">
                  <p className="text-[10px] text-[#270570] font-bold uppercase tracking-widest">En el aeropuerto</p>
                  <div className="bg-white p-3 rounded-xl border border-gray-100 flex items-center gap-3 shadow-sm">
                    <span className="text-blue-500 text-[10px]">➔</span>
                    <span className="text-[11px] text-gray-600">{solucion.sugerencias_origen[0]}</span>
                  </div>
                </div>
              )}

              {solucion.sugerencias_destino?.length > 0 && (
                <div className="space-y-2">
                  <p className="text-[10px] text-[#fa503f] uppercase font-bold tracking-widest">En tu destino</p>
                  <div className="bg-white p-3 rounded-xl border border-gray-100 flex items-center gap-3 shadow-sm">
                    <span className="text-red-400 text-[10px]">➔</span>
                    <span className="text-[11px] text-gray-600">{solucion.sugerencias_destino[0]}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-6 text-center border-t border-gray-50">
              <p className="text-[9px] text-gray-400">¿Dudas? Contactanos:</p>
              <a href="mailto:soporte@despegar.ia" className="text-[10px] text-[#270570]">
                soporte@despegar.ia
              </a>
            </div>
          </div>

          <div className="p-4 bg-gray-50">
            <button
              onClick={onClose}
              className="w-full bg-[#270570] text-white py-3 rounded-full text-sm shadow-lg active:scale-95 transition-transform"
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};