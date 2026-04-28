import { useState } from 'react';
import { useReservas } from './hooks/useReservas';
import { ReservaRow } from './components/ReservaRow';
import { NotificationMobile } from './components/NotificationMobile';
import { useDashboardStats } from './hooks/useDashboardStats';
import { StatCard } from './components/StatCard';
import { FiltrosBar } from './components/Filtrado';
import { useFiltros } from './hooks/useFilter';
import { reservaService } from './services/reservaService';
import type { Solucion } from './types/Solucion';
import logo from './assets/logo.png';

export default function App() {
  const { reservas, resolverContingencia, cargarReservas } = useReservas();
  const { total, contingencias, vuelosCriticos, hotelesCriticos, resueltas } = useDashboardStats(reservas);
  
  const { filtro, setFiltro, reservasFiltradas } = useFiltros(reservas);

  const [solucionActual, setSolucionActual] = useState<Solucion | null>(null);
  const [currentGestionId, setCurrentGestionId] = useState<number | null>(null);

  const handleGestionar = async (id: number) => {
    setCurrentGestionId(id);
    const data = await resolverContingencia(id);
    if (data) {
      setSolucionActual(data);
    } else {
      setCurrentGestionId(null);
    }
  };

  const handleFinalizarGestion = async () => {
    if (currentGestionId) {
      try {
        await reservaService.resolverReserva(currentGestionId);
        await cargarReservas();
      } catch (error) {
        console.error("No se pudo marcar como resuelta:", error);
      }
    }
    setSolucionActual(null);
    setCurrentGestionId(null);
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa] font-sans">
      <nav className="bg-[#270570] h-20 flex items-center px-10 shadow-lg mb-8">
        <img src={logo} alt="Logo despegar" className='h-7 ml-10 mr-2' />
        <span className="text-white font-bold text-xl tracking-tighter">despegar</span>
      </nav>

      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <StatCard title="Reservas" value={total} icon="📋" colorClass="text-slate-700" />
          <StatCard title="Alertas" value={contingencias} icon="🚨" colorClass="text-slate-700" />
          <StatCard title="Vuelos en alerta" value={vuelosCriticos} icon="✈️" colorClass="text-slate-700" />
          <StatCard title="Hoteles en alerta" value={hotelesCriticos} icon="🏨" colorClass="text-slate-700" />
          <StatCard title="Resueltas" value={resueltas} icon="✅" colorClass="text-[#270570]" />
        </div>

        <FiltrosBar filtroActual={filtro} onCambiarFiltro={setFiltro} />

        <div className="bg-white mb-5 rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-[#270570] border-b border-gray-100">
              <tr className="text-[11px] uppercase font-bold text-white tracking-widest">
                <th className="p-5">Pasajero</th>
                <th className="p-5">Itinerario</th>
                <th className="p-5">Estado</th>
                <th className="p-5 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {reservasFiltradas.length > 0 ? (
                reservasFiltradas.map(r => (
                  <ReservaRow
                    key={r.reservaId}
                    reserva={r}
                    isLoading={currentGestionId === r.reservaId && !solucionActual}
                    onGestionar={handleGestionar}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-10 text-center text-gray-400 text-sm">
                    No hay reservas que coincidan con este filtro.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {solucionActual && (
        <NotificationMobile
          solucion={solucionActual}
          onClose={handleFinalizarGestion}
          esContingencia={reservas.find(r => r.reservaId === currentGestionId)?.estadoGeneralReserva === 'CON_CONTINGENCIA'}
        />
      )}
    </div>
  );
}