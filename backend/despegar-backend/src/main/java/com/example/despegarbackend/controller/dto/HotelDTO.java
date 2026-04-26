package com.example.despegarbackend.controller.dto;

import lombok.Data;

@Data
public class HotelDTO {
    private Long id;
    private String nombre;
    private String ciudad;
    private String estrellas;
    private Double precioPorNoche;
}