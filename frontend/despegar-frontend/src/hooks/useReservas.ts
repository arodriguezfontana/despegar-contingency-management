import { useState, useEffect } from 'react';
import type { Reserva } from '../types/Reserva';
import type { Solucion } from '../types/Solucion';
import { reservaService } from '../services/reservaService'; 

export const useReservas = () => {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(false);

  const cargarReservas = async () => {
    try {
      const data = await reservaService.getAll();
      setReservas(data);
    } catch (err) {
      console.error("Error en el hook al cargar:", err);
    }
  };

  const resolverContingencia = async (id: number): Promise<Solucion | null> => {
    setLoading(true);
    try {
      return await reservaService.getSolucion(id);
    } catch (err) {
      console.error("Error en el hook al solucionar:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarReservas();
  }, []);

  return { reservas, resolverContingencia, loading, cargarReservas };
};