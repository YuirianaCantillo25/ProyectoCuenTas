// caja.js
let aperturaCaja = 0;
let ingresos = 0;
let gastos = 0;

function abrirCaja() {
    aperturaCaja = parseFloat(document.getElementById('apertura').value) || 0;
    updateBalance();
    resetForm();
}

function registrarIngreso() {
    const codigoProducto = document.getElementById('codigoProducto').value;
    const nombreProducto = document.getElementById('nombreProducto').value;
    const cantidad = parseFloat(document.getElementById('cantidad').value) || 0;
    const valor = parseFloat(document.getElementById('valor').value) || 0;

    const montoIngreso = cantidad * valor;

    ingresos += montoIngreso;
    updateBalance();
    resetForm();
}

function registrarGasto() {
    const descripcionGasto = document.getElementById('descripcionGasto').value;
    const montoGasto = parseFloat(document.getElementById('montoGasto').value) || 0;

    gastos += montoGasto;
    updateBalance();
    resetForm();
}

function updateBalance() {
    const balance = aperturaCaja + ingresos - gastos;
    document.getElementById('balance').innerText = `Balance General: $${balance.toLocaleString()}`;
}

function cerrarCaja() {
    const balance = aperturaCaja + ingresos - gastos;
    alert(`Balance actual: $${balance.toLocaleString()}`);

    const formData = new FormData();
    formData.append('apertura', aperturaCaja);
    formData.append('ingresos', ingresos);
    formData.append('gastos', gastos);

    fetch('caja.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });

    resetForm();
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
