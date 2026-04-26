package com.example.despegarbackend.controller;

import com.example.despegarbackend.controller.dto.VueloDTO;
import com.example.despegarbackend.model.Vuelo;
import com.example.despegarbackend.service.VueloService;
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
    public ResponseEntity<List<VueloDTO>> getAll() {
        List<VueloDTO> lista = service.listarVuelos().stream().map(vuelo -> {
            VueloDTO dto = new VueloDTO();
            dto.setId(vuelo.getId());
            dto.setOrigen(vuelo.getOrigen());
            dto.setDestino(vuelo.getDestino());
            dto.setPrecio(vuelo.getPrecio());
            dto.setEstado(vuelo.getEstado());
            dto.setFechaVuelo(vuelo.getFechaVuelo());
            return dto;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(lista);
    }

    @GetMapping("/{id}")
    public ResponseEntity<VueloDTO> getById(@PathVariable Long id) {
        Vuelo vuelo = service.vueloPorId(id);

        if (vuelo == null) {
            return ResponseEntity.notFound().build();
        }

        VueloDTO dto = new VueloDTO();
        dto.setId(vuelo.getId());
        dto.setOrigen(vuelo.getOrigen());
        dto.setDestino(vuelo.getDestino());
        dto.setPrecio(vuelo.getPrecio());
        dto.setEstado(vuelo.getEstado());
        dto.setFechaVuelo(vuelo.getFechaVuelo());

        return ResponseEntity.ok(dto);
    }
}