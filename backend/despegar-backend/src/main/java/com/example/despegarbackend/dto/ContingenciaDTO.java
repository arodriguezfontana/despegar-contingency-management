package com.example.despegarbackend.dto;

import java.util.List;

public record ContingenciaDTO(
        String contingencia,
        String mensaje,
        String beneficio,
        List<String> actividades
) {}