package com.example.despegarbackend.service;

import com.example.despegarbackend.model.Usuario;
import com.example.despegarbackend.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {
    private final UsuarioRepository repo;

    public UsuarioService(UsuarioRepository repo) {
        this.repo = repo;
    }

    public List<Usuario> listarUsuarios() {
        return repo.findAll();
    }

    public Usuario usuarioPorId(Long id) {
        return repo.findById(id).orElse(null);
    }
}