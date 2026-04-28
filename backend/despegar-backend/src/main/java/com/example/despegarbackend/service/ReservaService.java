package com.example.despegarbackend.service;

import com.example.despegarbackend.model.Reserva;
import com.example.despegarbackend.repository.ReservaRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ReservaService {

    private final ReservaRepository repo;

    public ReservaService(ReservaRepository repo) {
        this.repo = repo;
    }

    public List<Reserva> listarReservas() {
        return repo.findAllByOrderByVueloFechaVueloAscVueloHoraVueloAsc();
    }

    public Reserva buscarPorId(Long id) {
        return repo.findById(id).orElse(null);
    }

    public Reserva actualizarReserva(Reserva reserva) {
        return repo.save(reserva);
    }
}