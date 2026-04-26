package com.example.despegarbackend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El nombre no puede estar vacío")
    private String nombre;

    @Email(message = "Debe ser un email válido")
    @NotBlank
    private String email;

    @NotBlank(message = "El perfil es obligatorio (FAMILIA, BUSINESS, BUDGET)")
    private String perfil;
}