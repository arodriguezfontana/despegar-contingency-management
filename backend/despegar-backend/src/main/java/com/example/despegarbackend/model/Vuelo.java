package com.example.despegarbackend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "vuelo")
@Data
public class Vuelo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El origen es obligatorio (Código Aeropuerto)")
    private String origenCodigo;

    @NotBlank(message = "El destino es obligatorio (Código Aeropuerto)")
    private String destinoCodigo;

    @NotNull(message = "El precio es obligatorio")
    @Positive(message = "El precio debe ser positivo")
    private Double precio;

    @NotBlank(message = "El estado es obligatorio (PROGRAMADO, DEMORADO, CANCELADO)")
    private String estado;

    @NotNull(message = "La fecha es obligatoria")
    @Column(name = "fecha_vuelo")
    private LocalDate fechaVuelo;

    @NotNull(message = "La hora es obligatoria")
    @Column(name = "hora_vuelo")
    private LocalTime horaVuelo;
}