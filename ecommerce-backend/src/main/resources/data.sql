

INSERT INTO categorias(nombre)
VALUES
('Electronica'),
('Hogar'),
('Accesorios');


INSERT INTO usuarios(nombre,email)
VALUES
('Juan Perez','juan@mail.com'),
('Maria Gomez','maria@mail.com');


INSERT INTO productos
(nombre,descripcion,precio,stock,imagen_url,categoria_id)

VALUES

('Notebook Lenovo',
'Notebook 15 pulgadas',
850000,
10,
'notebook.jpg',
1),


('Mouse Logitech',
'Mouse inalámbrico',
25000,
30,
'mouse.jpg',
3),


('Teclado Gamer',
'Teclado mecanico RGB',
70000,
15,
'teclado.jpg',
3);

