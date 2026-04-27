import { useState } from 'react';
import { useReservas } from './hooks/useReservas';
import { ReservaRow } from './components/ReservaRow';
import { NotificationMobile } from './components/NotificationMobile';
import type { Solucion } from './types/Solucion';
import logo from './assets/logo.png'
import { useDashboardStats } from './hooks/useDashboardStats';
import { StatCard } from './components/StatCard';

export default function App() {
  const { reservas, resolverContingencia, loading } = useReservas();
  const { total, contingencias, vuelosCriticos, hotelesCriticos } = useDashboardStats(reservas);
  const [solucionActual, setSolucionActual] = useState<Solucion | null>(null);
  const [currentGestionId, setCurrentGestionId] = useState<number | null>(null);

  const handleGestionar = async (id: number) => {
    setCurrentGestionId(id);
    const data = await resolverContingencia(id);
    if (data) {
      setSolucionActual(data);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      <nav className="bg-[#270570] h-25 flex items-center px-10 shadow-lg mb-10">
        <img src={logo} alt="Logo despegar" className='h-10 ml-10 mr-2' />
        <span className="text-white font-black  text-2xl">despegar</span>
      </nav>

      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <StatCard title="Total Reservas" value={total} icon="✅" colorClass="text-slate-700" />
          <StatCard title="Vuelos en Alerta" value={vuelosCriticos} icon="✈️" colorClass="text-slate-700" />
          <StatCard title="Hoteles en Alerta" value={hotelesCriticos} icon="🏢" colorClass="text-slate-700" />
        </div>
        <div className="bg-white mb-10 rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-[#270570] border-b border-gray-100">
              <tr className="text-[11px] uppercase font-black text-white tracking-wider">
                <th className="p-4">Pasajero</th>
                <th className="p-4">Itinerario</th>
                <th className="p-4">Estado</th>
                <th className="p-4 text-right">Acción</th>
              </tr>
            </thead>
            <tbody>
              {reservas.map(r => (
                <ReservaRow
                  key={r.reservaId}
                  reserva={r}
                  isLoading={currentGestionId === r.reservaId}
                  onGestionar={handleGestionar}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {solucionActual && (
        <NotificationMobile
          solucion={solucionActual}
          onClose={() => {
            setSolucionActual(null);
            setCurrentGestionId(null);
          }}
          esContingencia={reservas.find(r => r.reservaId === currentGestionId)?.estadoGeneralReserva === 'CON_CONTINGENCIA'}
        />
      )}
    </div>
  );
}