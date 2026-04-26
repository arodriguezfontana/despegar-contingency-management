package com.example.despegarbackend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import java.time.*;

@Entity
@Table(name = "flights")
@Data
public class Vuelo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El origen es obligatorio")
    private String origen;

    @NotBlank(message = "El destino es obligatorio")
    private String destino;

    @NotNull(message = "El precio es obligatorio")
    @Positive(message = "El precio debe ser mayor a cero")
    private Double precio;

    @NotBlank(message = "El estado es obligatorio (EJ: DISPONIBLE, CANCELADO)")
    private String estado;

    @NotNull(message = "La fecha es obligatoria")
    @Future(message = "La fecha del vuelo debe ser en el futuro")
    @Column(name = "fecha_vuelo")
    private LocalDateTime fechaVuelo;
}