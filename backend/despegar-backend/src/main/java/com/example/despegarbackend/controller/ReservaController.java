package com.example.despegarbackend.controller;

import com.example.despegarbackend.controller.dto.ReservaDTO;
import com.example.despegarbackend.service.ReservaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/reservas")
@CrossOrigin(origins = "*")
public class ReservaController {

    private final ReservaService service;

    public ReservaController(ReservaService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<ReservaDTO>> getAll() {
        List<ReservaDTO> lista = service.listarReservas().stream().map(reserva -> {
            ReservaDTO dto = new ReservaDTO();
            dto.setId(reserva.getId());
            dto.setTipoServicio(reserva.getTipoServicio());
            dto.setEstadoServicio(reserva.getEstadoServicio());
            dto.setFechaReserva(reserva.getFechaReserva());

            if (reserva.getUsuario() != null) {
                dto.setNombreUsuario(reserva.getUsuario().getNombre());
            }

            if (reserva.getVuelo() != null) {
                dto.setDestinoVuelo(reserva.getVuelo().getDestino());
            } else {
                dto.setDestinoVuelo("N/A");
            }

            if (reserva.getHotel() != null) {
                dto.setNombreHotel(reserva.getHotel().getNombre());
            } else {
                dto.setNombreHotel("N/A");
            }

            return dto;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(lista);
    }
}