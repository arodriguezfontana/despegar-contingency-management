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

    public List<Hotel> listarHoteles() {
        return repo.findAll();
    }

    public Hotel hotelPorId(Long id) {
        return repo.findById(id).orElse(null);
    }
}