let productoEditandoId = null;
let categoriasCache = [];

/* =========================
   CARGAR PRODUCTOS
========================= */
function cargarProductos() {

    const contenido = document.getElementById("contenido");

    fetch("/api/productos")
        .then(res => res.json())
        .then(data => {

            let html = `
                <h2>Gestión de Productos</h2>

                <h3>Nuevo Producto</h3>

                <input type="text" id="nombre" placeholder="Nombre"><br><br>
                <input type="text" id="descripcion" placeholder="Descripción"><br><br>
                <input type="number" id="precio" placeholder="Precio"><br><br>
                <input type="number" id="stock" placeholder="Stock"><br><br>

                <select id="categoriaId"></select><br><br>

                <button onclick="guardarProducto()" id="btnGuardar">Guardar</button>

                <hr>

                <h3>Listado de Productos</h3>

                <table border="1" cellpadding="5">
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Categoría</th>
                        <th>Acciones</th>
                    </tr>
            `;

            data.forEach(producto => {
                html += `
                    <tr>
                        <td>${producto.id}</td>
                        <td>${producto.nombre}</td>
                        <td>${producto.descripcion}</td>
                        <td>${producto.precio}</td>
                        <td>${producto.stock}</td>
                        <td>${producto.categoria?.nombre || ""}</td>
                        <td>
                            <button onclick="cargarParaEditar(${producto.id})">Editar</button>
                            <button onclick="eliminarProducto(${producto.id})">Eliminar</button>
                        </td>
                    </tr>
                `;
            });

            html += "</table>";

            contenido.innerHTML = html;

            // 🔥 IMPORTANTE: cargar categorías DESPUÉS del render
            cargarCategoriasParaProductos();
        })
        .catch(err => {
            console.error(err);
            contenido.innerHTML = "<p>Error cargando productos</p>";
        });
}

/* =========================
   GUARDAR / ACTUALIZAR
========================= */
function guardarProducto() {

    const producto = {
        nombre: document.getElementById("nombre").value,
        descripcion: document.getElementById("descripcion").value,
        precio: parseFloat(document.getElementById("precio").value),
        stock: parseInt(document.getElementById("stock").value),
        categoria: {
            id: parseInt(document.getElementById("categoriaId").value)
        }
    };

    let url = "/api/productos";
    let method = "POST";

    if (productoEditandoId !== null) {
        url = "/api/productos/" + productoEditandoId;
        method = "PUT";
    }

    fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(producto)
    })
    .then(() => {

        alert(productoEditandoId ? "Producto actualizado" : "Producto creado");

        productoEditandoId = null;

        limpiarFormulario();
        cargarProductos();
    })
    .catch(err => {
        console.error(err);
        alert("Error al guardar producto");
    });
}

/* =========================
   ELIMINAR
========================= */
function eliminarProducto(id) {

    if (!confirm("¿Seguro que querés eliminar este producto?")) {
        return;
    }

    fetch("/api/productos/" + id, {
        method: "DELETE"
    })
    .then(() => {
        alert("Producto eliminado");
        cargarProductos();
    })
    .catch(err => {
        console.error(err);
        alert("Error al eliminar producto");
    });
}

/* =========================
   EDITAR
========================= */
function cargarParaEditar(id) {

    fetch("/api/productos/" + id)
        .then(res => res.json())
        .then(producto => {

            document.getElementById("nombre").value = producto.nombre;
            document.getElementById("descripcion").value = producto.descripcion;
            document.getElementById("precio").value = producto.precio;
            document.getElementById("stock").value = producto.stock;

            if (producto.categoria) {
                document.getElementById("categoriaId").value = producto.categoria.id;
            }

            productoEditandoId = id;

            document.getElementById("btnGuardar").innerText = "Actualizar";
        });
}

/* =========================
   LIMPIAR FORMULARIO
========================= */
function limpiarFormulario() {

    document.getElementById("nombre").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("stock").value = "";

    document.getElementById("btnGuardar").innerText = "Guardar";
}

/* =========================
   CATEGORÍAS
========================= */
function cargarCategoriasParaProductos() {

    fetch("/api/categorias")
        .then(res => res.json())
        .then(data => {
            categoriasCache = data;
            renderCategoriasDropdown();
        })
        .catch(err => {
            console.error("Error cargando categorías", err);
        });
}

function renderCategoriasDropdown() {

    const select = document.getElementById("categoriaId");

    if (!select) return;

    select.innerHTML = "";

    categoriasCache.forEach(cat => {
        const option = document.createElement("option");
        option.value = cat.id;
        option.text = cat.nombre;
        select.appendChild(option);
    });
}