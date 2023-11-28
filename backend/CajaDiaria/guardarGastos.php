<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "usuariosCuentas";

date_default_timezone_set('America/Bogota');

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$totalGastos = $_POST['totalGastos'];

// Configurar la zona horaria a tu preferencia
date_default_timezone_set('America/Bogota');

$fecha = date("Y-m-d"); // Usar la fecha actual


// Insertar datos en la tabla gastos
$sqlGastos = "INSERT INTO gastos (monto, fecha) VALUES ($totalGastos, '$fecha')";
$conn->query($sqlGastos);

$conn->close();
?>