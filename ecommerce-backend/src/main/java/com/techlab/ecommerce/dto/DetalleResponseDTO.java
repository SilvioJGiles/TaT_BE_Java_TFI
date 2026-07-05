package com.techlab.ecommerce.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DetalleResponseDTO {
    private Long productoId;
    private String productoNombre;
    private Integer cantidad;
    private Double subtotal;
}