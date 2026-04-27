
import { useMemo } from 'react';
import type { Reserva } from '../types/Reserva';
import { statsService } from '../services/statsService';

export const useDashboardStats = (reservas: Reserva[]) => {
  const stats = useMemo(() => statsService.getDashboardStats(reservas), [reservas]);
  
  return stats;
};