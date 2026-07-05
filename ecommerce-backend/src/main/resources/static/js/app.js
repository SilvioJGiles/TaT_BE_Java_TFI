function mostrarSeccion(seccion) {

    const contenido = document.getElementById("contenido");

    switch(seccion) {

        case "productos":
            cargarProductos();
            break;

        case "categorias":
            cargarCategorias();
            break;

        case "pedidos":
            cargarPedidos();
            break;

        case "historial":
            cargarHistorialPedidos();
            break;

        case "admin":
            enConstruccion();
            break;

        default:
            contenido.innerHTML = "<h2>Bienvenido</h2>";
    }
}