export interface Reserva {
  reservaId: number;
  nombreUsuario: string;
  perfilUsuario: 'LOW_COST' | 'BUSINESS' | 'LUJO' | 'ESTÁNDAR' | 'FAMILIA';
  origen: string;
  destino: string;
  estadoVuelo?: string;
  nombreHotel?: string;
  estadoHotel?: string;
  estadoGeneralReserva: 'OK' | 'CON_CONTINGENCIA' | 'RESUELTO';
}