package com.techlab.ecommerce.entity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="detalle_pedido")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DetallePedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer cantidad;
    private Double subtotal;

    @ManyToOne
    @JoinColumn(name="producto_id")
    private Producto producto;

    @ManyToOne
    @JoinColumn(name="pedido_id")
    private Pedido pedido;
}