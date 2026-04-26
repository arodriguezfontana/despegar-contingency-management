package com.example.despegarbackend.controller.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ReservaDTO {
        private Long id;
        private String nombreUsuario;
        private String destinoVuelo;
        private String nombreHotel;
        private String tipoServicio;
        private String estadoServicio;
        private LocalDateTime fechaReserva;
}