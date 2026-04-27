package com.example.despegarbackend.dto;

import com.example.despegarbackend.model.Usuario;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record UsuarioDTO(
        Long id,
        @NotBlank String nombre,
        @NotBlank @Email String email,
        @NotBlank String perfil // FAMILIA, BUSINESS, LOW_COST, VIP
) {

    public static UsuarioDTO desdeModelo(Usuario usuario) {
        return new UsuarioDTO(
                usuario.getId(),
                usuario.getNombre(),
                usuario.getEmail(),
                usuario.getPerfil()
        );
    }
}