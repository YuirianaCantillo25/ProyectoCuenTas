<?php

// Valida los datos del formulario
if (empty($_POST['nombre'])) {
    echo "El nombre del producto es obligatorio.";
    exit();
}

if (empty($_POST['descripcion'])) {
    echo "La descripción del producto es obligatoria.";
    exit();
}

if (empty($_POST['precio'])) {
    echo "El precio del producto es obligatorio.";
    exit();
}

if (empty($_POST['imagen'])) {
    echo "La imagen del producto es obligatoria.";
    exit();
}

// Agrega el producto a la base de datos
$db = new PDO('mysql:host=localhost;dbname=mydb;charset=utf8', 'root', '');

$sql = "INSERT INTO productos (nombre, descripcion, precio, imagen) VALUES (?, ?, ?, ?)";

$stmt = $db->prepare($sql);

$stmt->execute(array($_POST['nombre'], $_POST['descripcion'], $_POST['precio'], $_POST['imagen']));

// Redirecciona al usuario a la página de productos
header('Location: productos.php');

?>
