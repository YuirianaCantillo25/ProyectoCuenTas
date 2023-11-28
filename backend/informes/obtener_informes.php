<?php
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "usuariosCuentas";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    http_response_code(500);
    die(json_encode(['error' => 'Conexión fallida: ' . $conn->connect_error]));
}

$fechaDesde = $_GET['fechaDesde'];
$fechaHasta = $_GET['fechaHasta'];

try {
    $sql = "SELECT fecha, SUM(montoIngreso) AS ingresos, SUM(montoGasto) AS gastos FROM balance WHERE fecha BETWEEN '$fechaDesde' AND '$fechaHasta' GROUP BY fecha";
    $result = $conn->query($sql);

    $informes = array();

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $informes[] = $row;
        }
    }

    echo json_encode($informes);
} catch (Exception $e) {
    http_response_code(500);
    die(json_encode(['error' => 'Error en el servidor: ' . $e->getMessage()]));
} finally {
    $conn->close();
}
?>
