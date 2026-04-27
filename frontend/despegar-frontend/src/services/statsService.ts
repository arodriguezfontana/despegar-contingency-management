import type { Reserva } from '../types/Reserva';

export const statsService = {
  getDashboardStats: (reservas: Reserva[]) => {
    return {
      total: reservas.length,
      contingencias: reservas.filter(r => r.estadoGeneralReserva === 'CON_CONTINGENCIA').length,
      vuelosCriticos: reservas.filter(
        r => r.estadoGeneralReserva === 'CON_CONTINGENCIA' && 
        (r.estadoVuelo === 'CANCELADO' || r.estadoVuelo === 'DEMORADO')
      ).length,
      hotelesCriticos: reservas.filter(
        r => r.estadoGeneralReserva === 'CON_CONTINGENCIA' && 
        r.estadoHotel === 'NO_DISPONIBLE'
      ).length,
      resueltas: reservas.filter(r => r.estadoGeneralReserva === 'RESUELTO').length
    };
  }
};