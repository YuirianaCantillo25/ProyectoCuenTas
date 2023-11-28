<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "usuariosCuentas";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

function cerrarCaja($apertura, $ingresos, $gastos) {
    global $conn;

    $balance = $apertura + $ingresos - $gastos;
    $fecha = date("Y-m-d");

    // Insertar datos en la tabla balance
    $sqlBalance = "INSERT INTO balance (fecha, ingresos, gastos, balance_general) VALUES ('$fecha', $ingresos, $gastos, $balance)";
    $conn->query($sqlBalance);

    // Insertar datos en la tabla ingresos
    $sqlIngresos = "INSERT INTO ingresos (fecha, monto) VALUES ('$fecha', $ingresos)";
    $conn->query($sqlIngresos);

    // Insertar datos en la tabla gastos
    $sqlGastos = "INSERT INTO gastos (fecha, monto) VALUES ('$fecha', $gastos)";
    $conn->query($sqlGastos);

    $apertura = 0;
    $ingresos = 0;
    $gastos = 0;

    echo "Caja cerrada exitosamente";
}

$apertura = $_POST['apertura'];
$ingresos = $_POST['ingresos'];
$gastos = $_POST['gastos'];

cerrarCaja($apertura, $ingresos, $gastos);

$conn->close();
?>
