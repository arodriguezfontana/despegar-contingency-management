package com.example.despegarbackend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;

@Entity
@Table(name = "hotel")
@Data
public class Hotel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El nombre es obligatorio")
    private String nombre;

    @NotBlank(message = "La ciudad es obligatoria")
    private String ciudad;

    @NotBlank(message = "La localidad es obligatoria")
    private String localidad;

    @NotNull(message = "El precio es obligatorio")
    @Positive(message = "El precio debe ser positivo")
    @Column(name = "precio_por_noche")
    private Double precioPorNoche;

    @Min(1) @Max(5)
    private Integer estrellas;

    @NotBlank(message = "El estado es obligatorio (DISPONIBLE, NO_DISPONIBLE)")
    private String estado;
}