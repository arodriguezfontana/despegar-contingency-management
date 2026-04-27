package com.example.despegarbackend.dto;
import com.example.despegarbackend.model.Vuelo;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.time.LocalDate;
import java.time.LocalTime;

public record VueloDTO(
        Long id,
        @NotBlank String origenCodigo,
        @NotBlank String destinoCodigo,
        @NotNull @Positive Double precio,
        @NotBlank String estado,
        @NotBlank String fecha,
        @NotBlank String hora
) {

    public static VueloDTO desdeModelo(Vuelo vuelo) {
        return new VueloDTO(
                vuelo.getId(),
                vuelo.getOrigenCodigo(),
                vuelo.getDestinoCodigo(),
                vuelo.getPrecio(),
                vuelo.getEstado(),
                vuelo.getFechaVuelo().toString(),
                vuelo.getHoraVuelo().toString()
        );
    }
}