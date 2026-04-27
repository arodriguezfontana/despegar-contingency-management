import { useState, useMemo } from 'react';
import type { Reserva } from '../types/Reserva';

export type FiltroTipo = 'TODOS' | 'ALERTAS' | 'VUELOS' | 'HOTELES' | 'RESUELTOS';

export const useFiltros = (reservas: Reserva[]) => {
  const [filtro, setFiltro] = useState<FiltroTipo>('TODOS');

  const reservasFiltradas = useMemo(() => {
  return reservas.filter(r => {
    if (filtro === 'ALERTAS') {
      return r.estadoGeneralReserva === 'CON_CONTINGENCIA';
    }
    if (filtro === 'VUELOS') {
      return r.estadoGeneralReserva === 'CON_CONTINGENCIA' && r.estadoVuelo !== 'PROGRAMADO' && r.origen;
    }
    if (filtro === 'HOTELES') {
      return r.estadoGeneralReserva === 'CON_CONTINGENCIA' && r.estadoHotel === 'NO_DISPONIBLE';
    }
    if (filtro === 'RESUELTOS') {
      return r.estadoGeneralReserva === 'RESUELTO';
    }
    return true;
  });
}, [reservas, filtro]);

  return { filtro, setFiltro, reservasFiltradas };
};