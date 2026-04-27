package com.example.despegarbackend.controller;

import com.example.despegarbackend.dto.UsuarioDTO;
import com.example.despegarbackend.model.Usuario;
import com.example.despegarbackend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioService service;

    @GetMapping
    public ResponseEntity<List<UsuarioDTO>> getAllUsuarios() {
        List<UsuarioDTO> usuarios = service.listarUsuarios().stream()
                .map(UsuarioDTO::desdeModelo)
                .toList();
        return ResponseEntity.status(HttpStatus.OK).body(usuarios);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUsuarioById(@PathVariable Long id) {
        Usuario usuario = service.usuarioPorId(id);
        if (usuario != null) {
            return ResponseEntity.status(HttpStatus.OK).body(UsuarioDTO.desdeModelo(usuario));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado.");
    }
}