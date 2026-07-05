

package com.techlab.ecommerce.dto;


import lombok.*;

import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class PedidoRequestDTO {


private Long usuarioId;


private List<DetallePedidoDTO> productos;


}

