
// Función para registrar una venta
  function registrarVenta() {
    // Obtener los valores de entrada del formulario de ventas
    const nombreProducto = document.getElementById("nombreProducto").value;
    const cantidad = parseInt(document.getElementById("cantidad").value);

  // Validar que el nombre del producto no esté vacío
  if (!nombreProducto) {
    alert("Por favor, ingrese el nombre del producto.");
    return;
  }

  // Validar que la cantidad sea un número positivo
  if (isNaN(cantidad) || cantidad <= 0) {
    alert("Por favor, ingrese una cantidad válida.");
    return;
  }


  // Enviar los datos al servidor (PHP) para su procesamiento
    fetch("procesar_ventas.php", {
      method: "POST",
      body: JSON.stringify({ nombreProducto, cantidad }),
      headers: {
        "Content-Type": "application/json",
      },
    })

    .then((response) => response.json())
    .then((data) => {
      // Aquí puedes manejar la respuesta del servidor
      if (data.success) {
        alert("Venta registrada con éxito.");
        // Puedes realizar otras acciones, como actualizar la interfaz de usuario.
      } else {
        alert("Hubo un error al registrar la venta.");
      }
    })
    .catch((error) => {
      console.error("Error en la solicitud:", error);
    });
  } 

  
// Función para registrar un gasto
  function registrarGasto() {
    // Obtener los valores de entrada del formulario de gastos
    const descripcion = document.getElementById("descripcionGasto").value;
    const cantidadGastada = parseFloat(document.getElementById("cantidadGastada").value);

    // Validar que la descripción del gasto no esté vacía
    if (!descripcion) {
      alert("Por favor, ingrese una descripción del gasto.");
      return;
    }

    // Validar que la cantidad gastada sea un número positivo
    if (isNaN(cantidadGastada) || cantidadGastada <= 0) {
      alert("Por favor, ingrese una cantidad válida para el gasto.");
      return;
    }

    // Enviar los datos al servidor (PHP) para su procesamiento
    fetch("procesar_gastos.php", {
      method: "POST",
      body: JSON.stringify({ descripcion, cantidadGastada }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.json())
    .then((data) => {
      // Aquí puedes manejar la respuesta del servidor
      if (data.success) {
        alert("Gasto registrado con éxito.");
        // Puedes realizar otras acciones, como actualizar la interfaz de usuario.
      } else {
        alert("Hubo un error al registrar el gasto.");
      }
    })
    .catch((error) => {
      console.error("Error en la solicitud:", error);
    });
  }