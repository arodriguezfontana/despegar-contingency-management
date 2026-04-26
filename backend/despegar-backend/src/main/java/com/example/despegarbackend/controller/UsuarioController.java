package com.example.despegarbackend.controller;

import com.example.despegarbackend.controller.dto.UsuarioDTO;
import com.example.despegarbackend.model.Usuario;
import com.example.despegarbackend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioService service;

    @GetMapping
    public ResponseEntity<List<UsuarioDTO>> getAll() {
        List<UsuarioDTO> lista = service.listarUsuarios().stream().map(usuario -> {
            UsuarioDTO dto = new UsuarioDTO();
            dto.setId(usuario.getId());
            dto.setNombre(usuario.getNombre());
            dto.setPerfil(usuario.getPerfil());
            return dto;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(lista);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioDTO> getById(@PathVariable Long id) {
        Usuario usuario = service.usuarioPorId(id);

        if (usuario == null) {
            return ResponseEntity.notFound().build();
        }

        UsuarioDTO dto = new UsuarioDTO();
        dto.setId(usuario.getId());
        dto.setNombre(usuario.getNombre());
        dto.setPerfil(usuario.getPerfil());

        return ResponseEntity.ok(dto);
    }
}