package com.example.despegarbackend.service;

import com.example.despegarbackend.model.Vuelo;
import com.example.despegarbackend.repository.VueloRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class VueloService {

    private final VueloRepository repo;

    public VueloService(VueloRepository repo) {
        this.repo = repo;
    }

    public List<Vuelo> listarVuelos() {
        return repo.findAll();
    }

    public Vuelo vueloPorId(Long id) {
        return repo.findById(id).orElse(null);
    }
}