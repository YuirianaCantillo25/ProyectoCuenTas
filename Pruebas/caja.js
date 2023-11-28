let saldoInicial = 0;
let ingresos = 0;
let gastos = 0;

function abrirCaja() {
    const montoApertura = parseFloat(document.getElementById('montoApertura').value);
    saldoInicial = montoApertura;
    actualizarUtilidad();
}

function registrarVenta() {
    const valor = parseFloat(document.getElementById('valor').value);
    const cantidad = parseInt(document.getElementById('cantidad').value);
    ingresos += valor * cantidad;
    actualizarUtilidad();
}

function registrarGasto() {
    const montoGasto = parseFloat(document.getElementById('montoGasto').value);
    gastos += montoGasto;
    actualizarUtilidad();
}

function cerrarCaja() {
    const confirmacion = confirm('¿Seguro que desea cerrar la caja?');
    if (confirmacion) {
        const totalUtilidad = ingresos - gastos + saldoInicial;
        alert(`Caja cerrada. Total de utilidad: $${totalUtilidad}`);
        // Puedes enviar el totalUtilidad al servidor aquí para su registro.
        reiniciarCaja();
    }
}

function actualizarUtilidad() {
    const totalUtilidad = ingresos - gastos + saldoInicial;
    document.getElementById('totalUtilidad').innerText = totalUtilidad.toFixed(2);
}

function reiniciarCaja() {
    saldoInicial = 0;
    ingresos = 0;
    gastos = 0;
    actualizarUtilidad();
}
