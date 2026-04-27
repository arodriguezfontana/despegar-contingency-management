package com.example.despegarbackend.controller;

import com.example.despegarbackend.dto.VueloDTO;
import com.example.despegarbackend.model.Vuelo;
import com.example.despegarbackend.service.VueloService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/vuelos")
@CrossOrigin(origins = "*")
public class VueloController {

    private final VueloService service;

    public VueloController(VueloService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<VueloDTO>> getAllVuelos() {
        List<VueloDTO> vuelos = service.listarVuelos().stream()
                .map(VueloDTO::desdeModelo)
                .toList();
        return ResponseEntity.status(HttpStatus.OK).body(vuelos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getVueloById(@PathVariable Long id) {
        Vuelo vuelo = service.vueloPorId(id);
        if (vuelo != null) {
            return ResponseEntity.status(HttpStatus.OK).body(VueloDTO.desdeModelo(vuelo));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Vuelo no encontrado.");
    }
}