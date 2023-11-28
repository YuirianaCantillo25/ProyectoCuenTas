let aperturaCaja = 0;
let ingresosAcumulados = 0;
let gastosAcumulados = 0;
let ingresosPendientes = [];

function abrirCaja() {
    aperturaCaja = parseFloat(document.getElementById('apertura').value) || 0;
    resetForm();
    updateBalance();
}

function buscarProducto() {
    const codigoProducto = document.getElementById('codigoProducto').value;

    fetch(`buscarCodigo.php?codigo=${codigoProducto}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
                resetForm();
            } else {
                document.getElementById('nombreProducto').value = data.nombreProducto;
                document.getElementById('valor').value = data.precioVenta;
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function registrarIngreso() {
    const codigoProducto = document.getElementById('codigoProducto').value;
    const nombreProducto = document.getElementById('nombreProducto').value;
    const cantidad = parseFloat(document.getElementById('cantidad').value) || 0;
    const valor = parseFloat(document.getElementById('valor').value) || 0;

    // Verificar si el código del producto está presente
    if (codigoProducto === '') {
        alert('Por favor, ingrese un código de producto válido.');
        return;
    }

    const montoIngreso = cantidad * valor;

    // Acumular ingresos localmente
    ingresosAcumulados += montoIngreso;
    updateBalance();

    // Guardar ingresos en la lista de pendientes
    ingresosPendientes.push({
        montoIngreso: montoIngreso,
        fecha: new Date().toISOString().split('T')[0]
    });

    // Actualizar salidas y stock en la tabla inventario
    const formDataSalidas = new FormData();
    formDataSalidas.append('codigoProducto', codigoProducto);
    formDataSalidas.append('cantidad', cantidad);

    fetch('guardarSalidas.php', {
        method: 'POST',
        body: formDataSalidas
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            console.log(data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
       
    });

    resetForm();
}

function registrarGasto() {
    const descripcionGasto = document.getElementById('descripcionGasto').value;
    const montoGasto = parseFloat(document.getElementById('montoGasto').value) || 0;

    gastosAcumulados += montoGasto;
    updateBalance();

    resetForm();
}

function guardarGastosAcumulados() {
    const fecha = new Date().toISOString().split('T')[0];

    const formDataGastos = new FormData();
    formDataGastos.append('totalGastos', gastosAcumulados);
    formDataGastos.append('fecha', fecha);

    fetch('guardarGastos.php', {
        method: 'POST',
        body: formDataGastos
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });

    // Reiniciar variable de gastos acumulados
    gastosAcumulados = 0;
}

function updateBalance() {
    const balance = aperturaCaja + ingresosAcumulados - gastosAcumulados;
    document.getElementById('balance').innerText = `Balance General: $${balance.toLocaleString()}`;
}

function cerrarCaja() {
    const balance = aperturaCaja + ingresosAcumulados - gastosAcumulados;
    alert(`Balance actual: $${balance.toLocaleString()}`);

    const formDataBalance = new FormData();
    formDataBalance.append('apertura', aperturaCaja);
    formDataBalance.append('ingresos', ingresosAcumulados);
    formDataBalance.append('gastos', gastosAcumulados);

    // Enviar datos al servidor solo cuando se cierra la caja
    fetch('guardarBalance.php', {
        method: 'POST',
        body: formDataBalance
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        // Enviar ingresos pendientes al servidor solo si hay ingresos pendientes
        if (ingresosPendientes.length > 0) {
            enviarIngresosPendientes();
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });

    // Guardar gastos acumulados en la base de datos
    guardarGastosAcumulados();

    // Reiniciar variables acumuladas
    ingresosAcumulados = 0;
    gastosAcumulados = 0;

    resetForm();
}

function enviarIngresosPendientes() {
    // Calcular la suma total de los ingresos pendientes
    const sumaTotalIngresos = ingresosPendientes.reduce((total, ingreso) => total + ingreso.montoIngreso, 0);

    // Crear objeto con la suma total y la fecha
    const ingresosTotales = {
        montoIngreso: sumaTotalIngresos,
        fecha: new Date().toISOString().split('T')[0]
    };

    // Enviar la suma total al servidor
    const formDataIngresosTotales = new FormData();
    formDataIngresosTotales.append('montoIngreso', ingresosTotales.montoIngreso);
    formDataIngresosTotales.append('fecha', ingresosTotales.fecha);

    fetch('guardarIngresos.php', {
        method: 'POST',
        body: formDataIngresosTotales
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });

    // Limpiar el arreglo de ingresos pendientes
    ingresosPendientes = [];
}


function resetForm() {
    document.getElementById('apertura').value = '';
    document.getElementById('codigoProducto').value = '';
    document.getElementById('nombreProducto').value = '';
    document.getElementById('cantidad').value = '';
    document.getElementById('valor').value = '';
    document.getElementById('descripcionGasto').value = '';
    document.getElementById('montoGasto').value = '';
}
