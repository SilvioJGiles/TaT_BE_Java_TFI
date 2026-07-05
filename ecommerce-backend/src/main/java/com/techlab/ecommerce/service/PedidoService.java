package com.techlab.ecommerce.service;

import com.techlab.ecommerce.dto.*;
import com.techlab.ecommerce.entity.*;
import com.techlab.ecommerce.exception.StockInsuficienteException;
import com.techlab.ecommerce.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final ProductoRepository productoRepository;
    private final UsuarioRepository usuarioRepository;

    public PedidoService(
            PedidoRepository pedidoRepository,
            ProductoRepository productoRepository,
            UsuarioRepository usuarioRepository) {
        this.pedidoRepository = pedidoRepository;
        this.productoRepository = productoRepository;
        this.usuarioRepository = usuarioRepository;
    }

    @Transactional
    public PedidoResponseDTO crearPedido(PedidoRequestDTO request) {
        Pedido pedido = new Pedido();
        pedido.setFecha(LocalDateTime.now());
        pedido.setEstado("PENDIENTE");

        Usuario usuario = usuarioRepository
                .findById(request.getUsuarioId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con id: " + request.getUsuarioId()));
        pedido.setUsuario(usuario);
        pedido.setDetalles(new ArrayList<>());

        double total = 0;
        for (DetallePedidoDTO item : request.getProductos()) {
            Producto producto = productoRepository
                    .findById(item.getProductoId())
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado con id: " + item.getProductoId()));

            if (producto.getStock() < item.getCantidad()) {
                throw new StockInsuficienteException(
                        "Stock insuficiente para " + producto.getNombre()
                        + ". Stock disponible: " + producto.getStock()
                        + ", cantidad solicitada: " + item.getCantidad()
                );
            }

            producto.setStock(producto.getStock() - item.getCantidad());
            productoRepository.save(producto);

            DetallePedido detalle = new DetallePedido();
            detalle.setProducto(producto);
            detalle.setCantidad(item.getCantidad());
            detalle.setSubtotal(producto.getPrecio() * item.getCantidad());
            detalle.setPedido(pedido);
            pedido.getDetalles().add(detalle);

            total += detalle.getSubtotal();
        }

        pedido.setTotal(total);
        Pedido guardado = pedidoRepository.save(pedido);
        return toResponseDTO(guardado);
    }

    public List<PedidoResponseDTO> listarPorUsuario(Long usuarioId) {
        return pedidoRepository.findByUsuarioId(usuarioId).stream()
                .map(this::toResponseDTO)
                .toList();
    }

    public List<PedidoResponseDTO> listarTodos() {
        return pedidoRepository.findAll().stream()
                .map(this::toResponseDTO)
                .toList();
    }

    private PedidoResponseDTO toResponseDTO(Pedido pedido) {
        List<DetalleResponseDTO> detalles = pedido.getDetalles().stream()
                .map(d -> {
                    DetalleResponseDTO dto = new DetalleResponseDTO();
                    dto.setProductoId(d.getProducto().getId());
                    dto.setProductoNombre(d.getProducto().getNombre());
                    dto.setCantidad(d.getCantidad());
                    dto.setSubtotal(d.getSubtotal());
                    return dto;
                })
                .toList();

        PedidoResponseDTO response = new PedidoResponseDTO();
        response.setId(pedido.getId());
        response.setFecha(pedido.getFecha());
        response.setTotal(pedido.getTotal());
        response.setEstado(pedido.getEstado());
        response.setUsuarioId(pedido.getUsuario().getId());
        response.setUsuarioNombre(pedido.getUsuario().getNombre());
        response.setDetalles(detalles);
        return response;
    }
}