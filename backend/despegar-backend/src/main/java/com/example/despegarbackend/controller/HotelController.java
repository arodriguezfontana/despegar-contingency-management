package com.example.despegarbackend.controller;

import com.example.despegarbackend.dto.HotelDTO;
import com.example.despegarbackend.model.Hotel;
import com.example.despegarbackend.service.HotelService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hoteles")
@CrossOrigin(origins = "*")
public class HotelController {

    private final HotelService service;

    public HotelController(HotelService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<HotelDTO>> getAllHoteles() {
        List<HotelDTO> hoteles = service.listarHoteles().stream()
                .map(HotelDTO::desdeModelo)
                .toList();
        return ResponseEntity.status(HttpStatus.OK).body(hoteles);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getHotelById(@PathVariable Long id) {
        Hotel hotel = service.hotelPorId(id);
        if (hotel != null) {
            return ResponseEntity.status(HttpStatus.OK).body(HotelDTO.desdeModelo(hotel));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Hotel no encontrado.");
    }
}