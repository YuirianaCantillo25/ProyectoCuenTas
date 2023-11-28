// notificaciones.js

document.addEventListener('DOMContentLoaded', function () {
    function mostrarNotificacion(tipo, mensaje) {
      Toastify({
        text: mensaje,
        duration: 3000,
        gravity: 'top',
        position: 'center',
        backgroundColor: tipo === 'error' ? '#ff4d4d' : '#4caf50',
      }).showToast();
    }
  
    const urlParams = new URLSearchParams(window.location.search);
    const mensajeExito = urlParams.get('exito');
    const mensajeError = urlParams.get('error');
  
    if (mensajeExito) {
      mostrarNotificacion('success', mensajeExito);
    } else if (mensajeError) {
      mostrarNotificacion('error', mensajeError);
    }
  });
  
