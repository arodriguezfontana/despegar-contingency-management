package com.example.despegarbackend.service;

import com.example.despegarbackend.model.Hotel;
import com.example.despegarbackend.repository.HotelRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HotelService {
    private final HotelRepository repo;

    public HotelService(HotelRepository repo) {
        this.repo = repo;
    }

    public List<Hotel> listarTodos() {
        return repo.findAll();
    }

    public Hotel buscarPorId(Long id) {
        return repo.findById(id).orElse(null);
    }
}