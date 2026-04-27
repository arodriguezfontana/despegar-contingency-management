package com.example.despegarbackend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "reserva")
@Data
public class Reserva {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "El usuario es obligatorio")
    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "vuelo_id")
    private Vuelo vuelo;

    @ManyToOne
    @JoinColumn(name = "hotel_id")
    private Hotel hotel;

    @Column(name = "fecha_reserva")
    private LocalDateTime fechaReserva = LocalDateTime.now();

    @NotBlank(message = "El estado general es obligatorio (ACTIVA, CON_CONTINGENCIA, FINALIZADA)")
    @Column(name = "estado_general")
    private String estadoGeneral;
}