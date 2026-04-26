package com.example.despegarbackend.controller.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class VueloDTO {
    private Long id;
    private String origen;
    private String destino;
    private Double precio;
    private String estado;
    private LocalDateTime fechaVuelo;
}