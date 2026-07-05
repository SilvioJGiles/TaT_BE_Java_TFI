function cargarHistorialPedidos() {

    const contenido = document.getElementById("contenido");

    fetch("/api/pedidos/usuario/1")
        .then(res => res.json())
        .then(pedidos => {

            let html = `<h2>Historial de Pedidos</h2>`;

            if (pedidos.length === 0) {
                html += "<p>No hay pedidos realizados</p>";
                contenido.innerHTML = html;
                return;
            }

            pedidos.forEach(pedido => {

                html += `
                    <div style="border:1px solid #000; padding:10px; margin-bottom:10px;">
                        <h3>Pedido #${pedido.id}</h3>
                        <p><b>Fecha:</b> ${pedido.fecha}</p>
                        <p><b>Estado:</b> ${pedido.estado}</p>
                        <p><b>Total:</b> $${pedido.total}</p>

                        <h4>Productos:</h4>
                        <ul>
                `;

                pedido.detalles.forEach(det => {
                    html += `
                        <li>
                            ${det.productoNombre} x ${det.cantidad} = $${det.subtotal}
                        </li>
                    `;
                });

                html += `
                        </ul>
                    </div>
                `;
            });

            contenido.innerHTML = html;
        })
        .catch(err => {
            console.error(err);
            contenido.innerHTML = "<p>Error cargando historial</p>";
        });
}