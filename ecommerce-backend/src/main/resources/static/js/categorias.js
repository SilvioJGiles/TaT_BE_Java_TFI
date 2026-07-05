function cargarCategorias() {

    const contenido = document.getElementById("contenido");

    fetch("/api/categorias")
        .then(res => res.json())
        .then(data => {

            let html = `
                <h2>Gestión de Categorías</h2>

                <h3>Nueva Categoría</h3>

                <input type="text" id="nombreCat" placeholder="Nombre"><br><br>
                <input type="text" id="descripcionCat" placeholder="Descripción"><br><br>

                <button onclick="guardarCategoria()">Guardar</button>

                <hr>

                <h3>Listado de Categorías</h3>

                <table border="1" cellpadding="5">
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Acciones</th>
                    </tr>
            `;

            data.forEach(categoria => {
                html += `
                    <tr>
                        <td>${categoria.id}</td>
                        <td>${categoria.nombre}</td>
                        <td>${categoria.descripcion}</td>
                        <td>
                            <button onclick="eliminarCategoria(${categoria.id})">Eliminar</button>
                        </td>
                    </tr>
                `;
            });

            html += "</table>";

            contenido.innerHTML = html;
        })
        .catch(err => {
            console.error(err);
            contenido.innerHTML = "<p>Error cargando categorías</p>";
        });
}

function guardarCategoria() {

    const categoria = {
        nombre: document.getElementById("nombreCat").value,
        descripcion: document.getElementById("descripcionCat").value
    };

    fetch("/api/categorias", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(categoria)
    })
    .then(() => {
        alert("Categoría creada correctamente");

        document.getElementById("nombreCat").value = "";
        document.getElementById("descripcionCat").value = "";

        cargarCategorias();
    })
    .catch(err => {
        console.error(err);
        alert("Error al crear categoría");
    });
}

function eliminarCategoria(id) {

    if (!confirm("¿Seguro que querés eliminar esta categoría?")) {
        return;
    }

    fetch("/api/categorias/" + id, {
        method: "DELETE"
    })
    .then(() => {
        alert("Categoría eliminada");
        cargarCategorias();
    })
    .catch(err => {
        console.error(err);
        alert("Error al eliminar categoría");
    });
}

