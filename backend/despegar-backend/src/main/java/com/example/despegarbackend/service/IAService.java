package com.example.despegarbackend.service;

import com.example.despegarbackend.dto.ContingenciaDTO;
import com.example.despegarbackend.dto.ReservaDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class IAService {

    private final String PYTHON_URL = "http://localhost:8000/procesar-contingencia";

    public ContingenciaDTO obtenerSolucionIA(ReservaDTO reserva) {
        RestTemplate restTemplate = new RestTemplate();

        try {
            return restTemplate.postForObject(PYTHON_URL, reserva, ContingenciaDTO.class);
        } catch (Exception e) {
            System.out.println("Error al conectar con la IA: " + e.getMessage());
            return null;
        }
    }
}