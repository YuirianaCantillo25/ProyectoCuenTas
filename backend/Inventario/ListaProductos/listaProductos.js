document.addEventListener('DOMContentLoaded', cargarListadoProductos);

function cargarListadoProductos() {
    fetch('obtenerProductos.php')
        .then(response => response.json())
        .then(data => {
            mostrarListadoProductos(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function mostrarListadoProductos(productos) {
    const listadoProductosDiv = document.getElementById('listadoProductos');
    listadoProductosDiv.innerHTML = '';

    productos.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto');

        // Mostrar imagen (ajusta la ruta según la ubicación de tus imágenes)
        

        // Mostrar nombre
        const nombre = document.createElement('p');
        nombre.textContent = 'Nombre: ' + producto.nombre_producto;
        productoDiv.appendChild(nombre);

        // Mostrar costo
        const costo = document.createElement('p');
        costo.textContent = 'Costo: ' + producto.costo;
        productoDiv.appendChild(costo);

        // Mostrar precio de venta
        const precioVenta = document.createElement('p');
        precioVenta.textContent = 'Precio de Venta: ' + producto.precio_venta;
        productoDiv.appendChild(precioVenta);

        // Mostrar stock
        const stock = document.createElement('p');
        stock.textContent = 'Stock: ' + producto.stock;
        productoDiv.appendChild(stock);

        listadoProductosDiv.appendChild(productoDiv);
    });
}
