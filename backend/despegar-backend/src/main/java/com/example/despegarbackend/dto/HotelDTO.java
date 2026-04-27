package com.example.despegarbackend.dto;

import com.example.despegarbackend.model.Hotel;
import jakarta.validation.constraints.*;

public record HotelDTO(
        Long id,
        @NotBlank String nombre,
        @NotBlank String ciudad,
        @NotBlank String localidad,
        @NotNull @Positive Double precioPorNoche,
        Integer estrellas,
        @NotBlank String estado
) {

    public static HotelDTO desdeModelo(Hotel hotel) {
        return new HotelDTO(
                hotel.getId(),
                hotel.getNombre(),
                hotel.getCiudad(),
                hotel.getLocalidad(),
                hotel.getPrecioPorNoche(),
                hotel.getEstrellas(),
                hotel.getEstado()
        );
    }
}