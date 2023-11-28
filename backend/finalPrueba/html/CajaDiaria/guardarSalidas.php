<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "usuariosCuentas";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$codigoProducto = $_POST['codigoProducto'];
$cantidad = $_POST['cantidad'];

// Actualizar las salidas y el stock en la tabla inventario
$sqlActualizarInventario = "UPDATE inventario SET salidas = salidas + $cantidad, stock = stock - $cantidad WHERE codigo_producto = '$codigoProducto'";
$conn->query($sqlActualizarInventario);

$conn->close();
?>
