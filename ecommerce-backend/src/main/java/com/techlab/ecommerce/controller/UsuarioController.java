

package com.techlab.ecommerce.controller;



import com.techlab.ecommerce.entity.Usuario;

import com.techlab.ecommerce.service.UsuarioService;


import org.springframework.web.bind.annotation.*;


import java.util.List;



@RestController

@RequestMapping("/api/usuarios")

@CrossOrigin(origins="*")

public class UsuarioController {



private final UsuarioService service;



public UsuarioController(UsuarioService service){

this.service = service;

}



@GetMapping

public List<Usuario> listar(){

return service.listar();

}




@PostMapping

public Usuario crear(

@RequestBody Usuario usuario){

return service.guardar(usuario);

}



}

