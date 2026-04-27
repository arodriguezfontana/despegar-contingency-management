import { useState, useEffect } from 'react';
import type { Reserva } from '../types/Reserva';
import type { Solucion } from '../types/Solucion';

export const useReservas = () => {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(false);

  const cargarReservas = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/reservas');
      const data = await res.json();
      setReservas(data);
    } catch (err) {
      console.error("Error cargando reservas", err);
    }
  };

  const resolverContingencia = async (id: number): Promise<Solucion | null> => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8080/api/reservas/${id}/solucionar`, { method: 'POST' });
      return await res.json();
    } catch (err) {
      console.error("Error al solucionar", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { cargarReservas(); }, []);

  return { reservas, resolverContingencia, loading, cargarReservas };
};