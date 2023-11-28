<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "usuariosCuentas";



$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$apertura = $_POST['apertura'];
$ingresos = $_POST['ingresos'];
$gastos = $_POST['gastos'];

date_default_timezone_set('America/Bogota');
$fecha = date("Y-m-d");

// Insertar datos en la tabla balance
$sqlBalance = "INSERT INTO balance (fecha, ingresos, gastos, balance_general) VALUES ('$fecha', $ingresos, $gastos, $apertura + $ingresos - $gastos)";
$conn->query($sqlBalance);

// Limpiar las variables globales
$apertura = 0;
$ingresos = 0;

echo "Caja cerrada exitosamente";

$conn->close();
?>