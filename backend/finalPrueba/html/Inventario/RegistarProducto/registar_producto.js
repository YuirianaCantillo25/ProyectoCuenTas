// inventario.js
function registrarProducto() {
    const codigoProducto = document.getElementById('codigoProducto').value;
    const nombreProducto = document.getElementById('nombreProducto').value;
    const costo = parseFloat(document.getElementById('costo').value) || 0;
    const precioVenta = parseFloat(document.getElementById('precioVenta').value) || 0;
    const existenciaInicial = parseInt(document.getElementById('existenciaInicial').value) || 0;

    // Obtener la imagen seleccionada
    const imagenProducto = document.getElementById('imagenProducto');
    const imagenFile = imagenProducto.files[0];
    const imagenNombre = imagenFile ? imagenFile.name : '';

    const formData = new FormData();
    formData.append('codigoProducto', codigoProducto);
    formData.append('nombreProducto', nombreProducto);
    formData.append('costo', costo);
    formData.append('precioVenta', precioVenta);
    formData.append('existenciaInicial', existenciaInicial);
    formData.append('imagenProducto', imagenFile);

    fetch('registar_producto.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        // Puedes redirigir a otra página o realizar otras acciones después de registrar el producto
    })
    .catch(error => {
        console.error('Error:', error);
    });

    // Limpiar el formulario después de registrar el producto
    document.getElementById('codigoProducto').value = '';
    document.getElementById('nombreProducto').value = '';
    document.getElementById('costo').value = '';
    document.getElementById('precioVenta').value = '';
    document.getElementById('existenciaInicial').value = '';
    document.getElementById('imagenProducto').value = ''; // Limpiar el campo de la imagen
}
