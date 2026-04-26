package com.example.despegarbackend.controller;

import com.example.despegarbackend.controller.dto.HotelDTO;
import com.example.despegarbackend.service.HotelService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/hoteles")
@CrossOrigin(origins = "*")
public class HotelController {

    private final HotelService service;

    public HotelController(HotelService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<HotelDTO>> getAll() {
        List<HotelDTO> lista = service.listarTodos().stream().map(hotel -> {
            HotelDTO dto = new HotelDTO();
            dto.setId(hotel.getId());
            dto.setNombre(hotel.getNombre());
            dto.setCiudad(hotel.getCiudad());
            dto.setEstrellas(hotel.getEstrellas());
            dto.setPrecioPorNoche(hotel.getPrecioPorNoche());
            return dto;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(lista);
    }
}