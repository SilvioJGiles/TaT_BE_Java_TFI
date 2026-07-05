package com.techlab.ecommerce.dto;

import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PedidoResponseDTO {
    private Long id;
    private LocalDateTime fecha;
    private Double total;
    private String estado;
    private Long usuarioId;
    private String usuarioNombre;
    private List<DetalleResponseDTO> detalles;
}