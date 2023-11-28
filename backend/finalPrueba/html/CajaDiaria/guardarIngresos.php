<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "usuariosCuentas";

date_default_timezone_set('America/Bogota');

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener datos del formulario
$montoIngreso = $_POST['montoIngreso'];

// Configurar la zona horaria a tu preferencia
date_default_timezone_set('America/Bogota');

$fecha = date("Y-m-d"); // Usar la fecha actual


// Insertar datos en la tabla ingresos
$sql = "INSERT INTO ingresos (monto, fecha) VALUES ('$montoIngreso', '$fecha')";

if ($conn->query($sql) === TRUE) {
    $response = array('message' => 'Ingreso registrado exitosamente.');
} else {
    $response = array('error' => 'Error al registrar el ingreso: ' . $conn->error);
}

// Cerrar conexión
$conn->close();

header('Content-Type: application/json');
echo json_encode($response);
?>