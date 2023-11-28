<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "usuariosCuentas";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener datos del formulario
$codigoProducto = $_POST['codigoProducto'];
$nombreProducto = $_POST['nombreProducto'];
$costo = $_POST['costo'];
$precioVenta = $_POST['precioVenta'];
$existenciaInicial = $_POST['existenciaInicial'];

// Validar si el código ya existe
$sqlValidarCodigo = "SELECT id FROM inventario WHERE codigo_producto = '$codigoProducto'";
$resultValidarCodigo = $conn->query($sqlValidarCodigo);

if ($resultValidarCodigo->num_rows > 0) {
    // El código ya existe, devolver un mensaje de error
    echo "Error: El código de producto ya existe. Por favor, elija otro código.";
} else {
    // El código no existe, insertar el nuevo producto
    $sql = "INSERT INTO inventario (codigo_producto, nombre_producto, costo, precio_venta, existencia_inicial, stock) VALUES ('$codigoProducto', '$nombreProducto', $costo, $precioVenta, $existenciaInicial, $existenciaInicial)";
    $conn->query($sql);

    echo "Producto registrado exitosamente";
}

$conn->close();
?>
