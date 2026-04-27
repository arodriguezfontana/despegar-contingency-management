package com.example.despegarbackend.dto;

import com.example.despegarbackend.model.Reserva;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ReservaDTO(
        @NotNull Long reservaId,
        @NotNull Long usuarioId,
        @NotBlank String nombreUsuario,
        @NotBlank String perfilUsuario,

        Long vueloId,
        String origen,
        String destino,
        String estadoVuelo,
        String fechaHoraVuelo,

        Long hotelId,
        String nombreHotel,
        String localidadHotel,
        String estadoHotel,

        @NotBlank String estadoGeneralReserva
) {

        public static ReservaDTO desdeModelo(Reserva r) {
                return new ReservaDTO(
                        r.getId(),
                        r.getUsuario().getId(),
                        r.getUsuario().getNombre(),
                        r.getUsuario().getPerfil(),

                        r.getVuelo() != null ? r.getVuelo().getId() : null,
                        r.getVuelo() != null ? r.getVuelo().getOrigenCodigo() : null,
                        r.getVuelo() != null ? r.getVuelo().getDestinoCodigo() : null,
                        r.getVuelo() != null ? r.getVuelo().getEstado() : null,
                        r.getVuelo() != null ? (r.getVuelo().getFechaVuelo() + " " + r.getVuelo().getHoraVuelo()) : null,

                        r.getHotel() != null ? r.getHotel().getId() : null,
                        r.getHotel() != null ? r.getHotel().getNombre() : null,
                        r.getHotel() != null ? r.getHotel().getLocalidad() : null,
                        r.getHotel() != null ? r.getHotel().getEstado() : null,

                        r.getEstadoGeneral()
                );
        }
}