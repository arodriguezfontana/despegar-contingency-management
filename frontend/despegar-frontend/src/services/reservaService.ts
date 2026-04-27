import type { Solucion } from '../types/Solucion';
import type { Reserva } from '../types/Reserva';

const API_BASE_URL = 'http://localhost:8080/api/reservas';

export const reservaService = {
  getAll: async (): Promise<Reserva[]> => {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) throw new Error('Error al obtener reservas');
    return response.json();
  },

  getSolucion: async (id: number): Promise<Solucion> => {
    const response = await fetch(`${API_BASE_URL}/${id}/solucionar`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error('Error al procesar la solución');
    return response.json();
  }
};