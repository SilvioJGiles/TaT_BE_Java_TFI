

package com.techlab.ecommerce.controller;



import com.techlab.ecommerce.entity.Categoria;

import com.techlab.ecommerce.service.CategoriaService;


import org.springframework.web.bind.annotation.*;


import java.util.List;



@RestController

@RequestMapping("/api/categorias")

@CrossOrigin(origins="*")

public class CategoriaController {



private final CategoriaService service;



public CategoriaController(CategoriaService service){

this.service = service;

}



@GetMapping

public List<Categoria> listar(){

return service.listar();

}



@PostMapping

public Categoria crear(

@RequestBody Categoria categoria){

return service.guardar(categoria);

}


}

