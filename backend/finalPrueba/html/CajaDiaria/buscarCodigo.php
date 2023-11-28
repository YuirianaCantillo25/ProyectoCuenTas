<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "usuariosCuentas";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$codigoProducto = $_GET['codigo'];

$sql = "SELECT nombre_producto, precio_venta FROM inventario WHERE codigo_producto = '$codigoProducto'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $data = array(
        'nombreProducto' => $row['nombre_producto'],
        'precioVenta' => $row['precio_venta']
    );
    echo json_encode($data);
} else {
    $data = array('error' => 'Producto no encontrado');
    echo json_encode($data);
}

$conn->close();
?>
