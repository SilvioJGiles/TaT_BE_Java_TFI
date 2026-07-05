

package com.techlab.ecommerce.service;


import com.techlab.ecommerce.entity.Usuario;

import com.techlab.ecommerce.repository.UsuarioRepository;

import org.springframework.stereotype.Service;

import java.util.List;



@Service

public class UsuarioService {


private final UsuarioRepository repository;


public UsuarioService(UsuarioRepository repository){

this.repository = repository;

}



public List<Usuario> listar(){

return repository.findAll();

}


public Usuario guardar(Usuario usuario){

return repository.save(usuario);

}


}

