package com.techlab.ecommerce.controller;

import com.techlab.ecommerce.dto.PedidoRequestDTO;
import com.techlab.ecommerce.dto.PedidoResponseDTO;
import com.techlab.ecommerce.service.PedidoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin(origins="*")
public class PedidoController {

    private final PedidoService service;

    public PedidoController(PedidoService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<PedidoResponseDTO>> listar() {
        return ResponseEntity.ok(service.listarTodos());
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<PedidoResponseDTO>> listarPorUsuario(@PathVariable Long usuarioId) {
        return ResponseEntity.ok(service.listarPorUsuario(usuarioId));
    }

    @PostMapping
    public ResponseEntity<PedidoResponseDTO> crear(@RequestBody PedidoRequestDTO request) {
        PedidoResponseDTO pedido = service.crearPedido(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(pedido);
    }
}