package com.example.despegarbackend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
@Data
public class Reserva {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "El usuario es obligatorio")
    @ManyToOne
    @JoinColumn(name = "user_id")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "flight_id")
    private Vuelo vuelo;

    @NotBlank(message = "El tipo de servicio es obligatorio (VUELO/HOTEL)")
    @Column(name = "tipo_servicio")
    private String tipoServicio;

    @NotBlank(message = "El estado es obligatorio")
    @Column(name = "estado_servicio")
    private String estadoServicio;

    @NotNull(message = "La fecha de reserva es obligatoria")
    @Column(name = "fecha_reserva")
    private LocalDateTime fechaReserva;

    @ManyToOne
    @JoinColumn(name = "hotel_id")
    private Hotel hotel;
}