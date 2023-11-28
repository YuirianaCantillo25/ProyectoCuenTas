const contraseñaInput = document.getElementById("contraseña");
const indicador = document.getElementById("indicador");

contraseñaInput.addEventListener("input", validarContraseña);

function validarContraseña() {
    const contraseña = contraseñaInput.value;
    let fortaleza = 0;

    // Verificar caracteres especiales
    if (/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(contraseña)) {
    fortaleza++;
    }

    // Verificar números
    if (/\d/.test(contraseña)) {
    fortaleza++;
    }

    // Cambiar color del formulario
    if (fortaleza === 0) {
    contraseñaInput.classList.remove("c2", "c3");
    contraseñaInput.classList.add("c1");
    } else if (fortaleza === 1) {
    contraseñaInput.classList.remove("c1", "c3");
    contraseñaInput.classList.add("c2");
    } else if (fortaleza === 2) {
    contraseñaInput.classList.remove("c1", "c2");
    contraseñaInput.classList.add("c3");
    }

    // Actualizar el indicador
    indicador.textContent = `Fortaleza de la contraseña: ${fortaleza === 0 ? "Débil usa (!@#$%^&*) o (1,2,3,4...) " 
    : (fortaleza === 1 ? "Moderada" : "Fuerte")}`;
}