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
$unidadesCompradas = $_POST['unidadesCompradas'];

// Obtener información actual del inventario
$sqlInfoInventario = "SELECT existencia_inicial, entradas FROM inventario WHERE codigo_producto = '$codigoProducto'";
$resultInfoInventario = $conn->query($sqlInfoInventario);

if ($resultInfoInventario->num_rows > 0) {
    $rowInfoInventario = $resultInfoInventario->fetch_assoc();
    $existenciaInicial = $rowInfoInventario['existencia_inicial'];
    $entradasAnteriores = $rowInfoInventario['entradas'];

    // Calcular el nuevo stock y actualizar la tabla de compras
    $nuevoStock = $existenciaInicial + $entradasAnteriores + $unidadesCompradas;

    $sqlActualizarCompras = "UPDATE inventario SET entradas = entradas + $unidadesCompradas, stock = $nuevoStock WHERE codigo_producto = '$codigoProducto'";
    $conn->query($sqlActualizarCompras);

    echo "Compra registrada exitosamente";
} else {
    echo "Error: Producto no encontrado";
}

$conn->close();
?>
