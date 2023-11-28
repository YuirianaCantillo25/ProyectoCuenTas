<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $contraseña = $_POST['contraseña'];

    // Conectar a la base de datos
    $conexion = mysqli_connect("localhost", "root", "", "usuariosCuentas");

    if (!$conexion) {
        header("Location: login.html?error=" . urlencode("Error al conectar a la base de datos: " . mysqli_connect_error()));
        exit();
    } else {
        // Verificar las credenciales del usuario
        $query_verificar = "SELECT * FROM usuarios WHERE email = '$email'";
        $resultado_verificar = mysqli_query($conexion, $query_verificar);

        if (!$resultado_verificar) {
            header("Location: login.html?error=" . urlencode("Error en la consulta: " . mysqli_error($conexion)));
            exit();
        } elseif (mysqli_num_rows($resultado_verificar) > 0) {
            $fila = mysqli_fetch_assoc($resultado_verificar);
            if (password_verify($contraseña, $fila['contraseña'])) {
                // Las credenciales son correctas, inicia sesión
                $_SESSION['usuario_id'] = $fila['id'];
                $_SESSION['usuario_nombre'] = $fila['nombre'];

                header("Location: CuenTas.html?exito=" . urlencode("Inicio de sesión exitoso."));
                exit();
            } else {
                header("Location: login.html?error=" . urlencode("Credenciales incorrectas. Por favor, inténtelo de nuevo."));
                exit();
            }
        } else {
            header("Location: login.html?error=" . urlencode("El usuario no está registrado. Regístrate para iniciar sesión."));
            exit();
        }
    }

    // Cerrar la conexión
    mysqli_close($conexion);
}
?>
