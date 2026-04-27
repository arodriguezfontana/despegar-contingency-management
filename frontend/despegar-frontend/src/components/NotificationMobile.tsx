import React from 'react';
import type { Solucion } from '../types/Solucion';

interface Props {
  solucion: Solucion;
  onClose: () => void;
  esContingencia: boolean;
}

export const NotificationMobile: React.FC<Props> = ({ solucion, onClose, esContingencia }) => {
  return (
    <div className="fixed inset-0 bg-[#270570]/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="relative bg-[#1a1a1a] w-[300px] h-[600px] rounded-[3rem] border-[6px] border-[#333] shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#333] rounded-b-xl z-10"></div>
        
        <div className="flex-1 bg-white mt-2 overflow-hidden flex flex-col">
          <div className="bg-[#270570] p-6 text-white pt-10">
            <p className="text-[10px] uppercase tracking-widest opacity-70">App Despegar</p>
            <h3 className="font-bold text-lg leading-tight mt-1">
  {esContingencia ? '¡Importante!' : '¡Todo listo para tu viaje!'}
</h3>
          </div>

  <div className="p-5 flex-1 space-y-5 overflow-y-auto">
  {/* Mensaje de la IA */}
  <div className="flex items-start gap-2 bg-gray-50 p-3 rounded-lg border border-gray-100">
    <span className="text-lg">{esContingencia ? '🛠️' : '✨'}</span>
    <p className="text-[12px] text-gray-600 leading-relaxed italic">
      "{solucion.mensaje}"
    </p>
  </div>

  {esContingencia ? (
    /* CASO CONTINGENCIA: BENEFICIO */
    <div className="animate-in slide-in-from-right duration-500">
       <div className="bg-green-50 p-4 rounded-xl border border-green-200 shadow-sm">
         <span className="text-[9px] font-black text-green-700 uppercase tracking-tighter block mb-1">
           Queremos recompensarte
         </span>
         <p className="text-[13px] font-bold text-green-800 leading-tight">
           {solucion.beneficio}
         </p>
       </div>
    </div>
  ) : (
    /* CASO ACTIVO: TIPS */
    <div className="space-y-4 animate-in slide-in-from-left duration-500">
       <div className="flex items-center gap-2">
         <span className="text-[10px] font-black text-[#270570] uppercase tracking-widest">
           ¿Qué hacer ahora?
         </span>
         <div className="h-[1px] flex-1 bg-gray-200"></div>
       </div>
       <div className="grid grid-cols-1 gap-2">
         {solucion.actividades?.map((a, i) => (
           <div key={i} className="bg-white p-3 rounded-xl border border-gray-100 flex items-center gap-3 shadow-sm">
             <span className="text-blue-500 font-bold text-[10px]">{i + 1}</span>
             <span className="text-[11px] text-gray-600">{a}</span>
           </div>
         ))}
       </div>
    </div>
  )}

  {/* Footer de soporte siempre al final del scroll */}
  <div className="pt-6 text-center border-t border-gray-50">
    <p className="text-[9px] text-gray-400">¿Dudas? Contactanos:</p>
    <a href="mailto:soporte@despegar.ia" className="text-[10px] font-bold text-[#270570]">
      soporte@despegar.ia
    </a>
  </div>
</div>

          <div className="p-4 bg-gray-50">
            <button 
              onClick={onClose}
              className="w-full bg-[#270570] text-white py-3 rounded-full font-bold text-sm shadow-lg active:scale-95 transition-transform"
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};