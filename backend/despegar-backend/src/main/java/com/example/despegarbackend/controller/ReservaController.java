package com.example.despegarbackend.controller;

import com.example.despegarbackend.dto.ContingenciaDTO;
import com.example.despegarbackend.dto.ReservaDTO;
import com.example.despegarbackend.model.Reserva;
import com.example.despegarbackend.service.IAService;
import com.example.despegarbackend.service.ReservaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservas")
@CrossOrigin(origins = "*")
public class ReservaController {

    private final ReservaService service;
    private final IAService iaService;

    public ReservaController(ReservaService service, IAService iaService) {
        this.service = service;
        this.iaService = iaService;
    }

    @GetMapping
    public ResponseEntity<List<ReservaDTO>> getAllReservas() {
        List<ReservaDTO> reservas = service.listarReservas().stream()
                .map(ReservaDTO::desdeModelo)
                .toList();
        return ResponseEntity.status(HttpStatus.OK).body(reservas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getReservaById(@PathVariable Long id) {
        Reserva reserva = service.buscarPorId(id);
        if (reserva != null) {
            return ResponseEntity.status(HttpStatus.OK).body(ReservaDTO.desdeModelo(reserva));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Reserva no encontrada.");
    }

    @PostMapping("/{id}/solucionar")
    public ResponseEntity<?> solucionarContingencia(@PathVariable Long id) {
        Reserva reserva = service.buscarPorId(id);
        if (reserva == null) return ResponseEntity.notFound().build();

        if (reserva.getVuelo() == null && reserva.getHotel() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error: La reserva #" + id + " no posee ni vuelo ni hotel asociado.");
        }

        ReservaDTO dto = ReservaDTO.desdeModelo(reserva);
        ContingenciaDTO solucion = iaService.obtenerSolucionIA(dto);

        return ResponseEntity.ok(solucion);
    }

    @PatchMapping("/{id}/resolver")
    public ResponseEntity<?> resolverContingencia(@PathVariable Long id) {
        Reserva reserva = service.buscarPorId(id);
        if (reserva == null) return ResponseEntity.notFound().build();
        reserva.setEstadoGeneral("RESUELTO");
        service.actualizarReserva(reserva);
        return ResponseEntity.ok().build();
    }
}