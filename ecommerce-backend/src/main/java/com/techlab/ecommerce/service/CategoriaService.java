

package com.techlab.ecommerce.service;


import com.techlab.ecommerce.entity.Categoria;

import com.techlab.ecommerce.repository.CategoriaRepository;

import org.springframework.stereotype.Service;

import java.util.List;



@Service

public class CategoriaService {


private final CategoriaRepository repository;



public CategoriaService(CategoriaRepository repository){

this.repository = repository;

}



public List<Categoria> listar(){

return repository.findAll();

}



public Categoria guardar(Categoria categoria){

return repository.save(categoria);

}



}

