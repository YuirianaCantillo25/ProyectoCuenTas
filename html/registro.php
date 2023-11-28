<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST['nombre'];
    $email = $_POST['email'];
    $contraseña = password_hash($_POST['contraseña'], PASSWORD_BCRYPT);

    // Conectar a la base de datos
    $conexion = mysqli_connect("localhost", "root", "", "usuariosCuentas");

    if (!$conexion) {
        header("Location: signup.html?error=" . urlencode("Error al conectar a la base de datos: " . mysqli_connect_error()));
        exit();
    } else {
        // Verificar si el correo electrónico ya está registrado
        $query_verificar = "SELECT * FROM usuarios WHERE email = '$email'";
        $resultado_verificar = mysqli_query($conexion, $query_verificar);

        if (!$resultado_verificar) {
            header("Location: singup.html?error=" . urlencode("Error en la consulta: " . mysqli_error($conexion)));
            exit();
        } elseif (mysqli_num_rows($resultado_verificar) > 0) {
            header("Location: singup.html?error=" . urlencode("El correo electrónico ya está registrado. Por favor, elija otro."));
            exit();
        } else {
            // Insertar nuevo usuario
            $query_insertar = "INSERT INTO usuarios (nombre, email, contraseña) VALUES ('$nombre', '$email', '$contraseña')";
            $resultado_insertar = mysqli_query($conexion, $query_insertar);

            if (!$resultado_insertar) {
                header("Location: singup.html?error=" . urlencode("Error en el registro: " . mysqli_error($conexion)));
                exit();
            } else {
                header("Location: login.html?exito=" . urlencode("Registro exitoso. Ahora puedes iniciar sesión."));
                exit();
            }
        }
    }

    // Cerrar la conexión
    mysqli_close($conexion);
}
?>
