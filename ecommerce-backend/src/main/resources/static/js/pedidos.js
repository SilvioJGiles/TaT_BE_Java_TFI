let carrito = [];

function cargarPedidos() {

    const contenido = document.getElementById("contenido");

    fetch("/api/productos")
        .then(res => res.json())
        .then(productos => {

            let html = `
                <h2>Gestión de Pedidos</h2>

                <h3>Agregar productos al pedido</h3>

                <select id="productoPedido">
            `;

            productos.forEach(p => {
                html += `<option value="${p.id}">${p.nombre} - $${p.precio}</option>`;
            });

            html += `
                </select>

                <input type="number" id="cantidadPedido" placeholder="Cantidad">

                <button onclick="agregarAlCarrito()">Agregar</button>

                <hr>

                <h3>Carrito</h3>

                <div id="carritoView"></div>

                <br>

                <button onclick="confirmarPedido()">Confirmar Pedido</button>
            `;

            contenido.innerHTML = html;

            renderCarrito();
        });
}

function agregarAlCarrito() {

    const productoIdRaw = document.getElementById("productoPedido").value;
    const cantidadRaw = document.getElementById("cantidadPedido").value;

    if (!productoIdRaw || !cantidadRaw) {
        alert("Debes completar producto y cantidad");
        return;
    }

    const productoId = Number(productoIdRaw);
    const cantidad = Number(cantidadRaw);

    if (isNaN(productoId) || isNaN(cantidad)) {
        alert("Valores inválidos");
        return;
    }

    if (cantidad <= 0) {
        alert("La cantidad debe ser mayor a 0");
        return;
    }

    fetch("/api/productos/" + productoId)
        .then(res => res.json())
        .then(producto => {

            const existente = carrito.find(p => p.productoId === producto.id);

            if (existente) {
                existente.cantidad += cantidad;
            } else {
                carrito.push({
                    productoId: producto.id,
                    nombre: producto.nombre,
                    precio: producto.precio,
                    cantidad: cantidad
                });
            }

            renderCarrito();
            document.getElementById("cantidadPedido").value = "";
        });
    limpiarCantidad();
}

function renderCarrito() {

    const div = document.getElementById("carritoView");

    if (carrito.length === 0) {
        div.innerHTML = "<p>El carrito está vacío</p>";
        return;
    }

    let total = 0;

    let html = `
        <table border="1" cellpadding="5">
            <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th>Acción</th>
            </tr>
    `;

    carrito.forEach((item, index) => {

        const subtotal = item.precio * item.cantidad;
        total += subtotal;

        html += `
            <tr>
                <td>${item.nombre}</td>
                <td>$${item.precio}</td>
                <td>${item.cantidad}</td>
                <td>$${subtotal}</td>
                <td>
                    <button onclick="eliminarItem(${index})">Eliminar</button>
                </td>
            </tr>
        `;
    });

    html += `
        </table>

        <h3>Total: $${total}</h3>

        <button onclick="vaciarCarrito()">Vaciar carrito</button>
    `;

    div.innerHTML = html;
}

function eliminarItem(index) {
    carrito.splice(index, 1);
    renderCarrito();
}

function confirmarPedido() {

    if (carrito.length === 0) {
        alert("El carrito está vacío");
        return;
    }

    const pedido = {
        usuarioId: 1,
        productos: carrito.map(item => ({
            productoId: item.productoId,
            cantidad: item.cantidad
        }))
    };

    console.log("📦 PEDIDO A ENVIAR:", JSON.stringify(pedido, null, 2));

    fetch("/api/pedidos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(pedido)
    })
    .then(async res => {

        const text = await res.text();

        if (!res.ok) {
            throw new Error(text);
        }

        return text ? JSON.parse(text) : null;
    })
    .then(() => {

        alert("Pedido creado correctamente");

        carrito = [];
        cargarPedidos();
    })
    .catch(err => {
        console.error("❌ ERROR REAL BACKEND:", err.message);
        alert("Error al crear pedido: " + err.message);
    });
}

function limpiarCantidad() {
    document.getElementById("cantidadPedido").value = "";
}

function vaciarCarrito() {
    carrito = [];
    renderCarrito();
}