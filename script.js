let estudiantes = [];
let indice = -1;

const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const carrera = document.getElementById("carrera");
const egresado = document.getElementById("egresado");
const sexoRadios = document.getElementsByName("sexo");

const btnNuevo = document.getElementById("btnNuevo");
const btnGuardar = document.getElementById("btnGuardar");
const btnCancelar = document.getElementById("btnCancelar");
const btnEliminar = document.getElementById("btnEliminar");

const contador = document.getElementById("contador");

function limpiarFormulario() {
  nombre.value = "";
  apellido.value = "";
  carrera.value = "";
  egresado.checked = false;
  sexoRadios.forEach(r => r.checked = false);
}

function desbloquear(activo) {
  [nombre, apellido, carrera, egresado].forEach(el => el.disabled = !activo);
  sexoRadios.forEach(r => r.disabled = !activo);
  btnGuardar.disabled = !activo;
  btnCancelar.disabled = !activo;
  btnEliminar.disabled = estudiantes.length === 0;
}

function mostrarEstudiante() {
  if (estudiantes.length === 0) {
    limpiarFormulario();
    contador.textContent = "Sin registros";
    return;
  }
  const e = estudiantes[indice];
  nombre.value = e.nombre;
  apellido.value = e.apellido;
  carrera.value = e.carrera;
  egresado.checked = e.egresado;
  sexoRadios.forEach(r => r.checked = (r.value === e.sexo));
  contador.textContent = Registro ${indice + 1} de ${estudiantes.length};
}

btnNuevo.addEventListener("click", () => {
  limpiarFormulario();
  desbloquear(true);
  nombre.focus();
});

btnCancelar.addEventListener("click", () => {
  limpiarFormulario();
  desbloquear(false);
  mostrarEstudiante();
});

btnGuardar.addEventListener("click", () => {
  const sexoSeleccionado = [...sexoRadios].find(r => r.checked)?.value || "";
  if (!nombre.value || !apellido.value || !carrera.value || !sexoSeleccionado) {
    alert("Por favor complete todos los campos obligatorios.");
    return;
  }

  const nuevo = {
    nombre: nombre.value,
    apellido: apellido.value,
    carrera: carrera.value,
    sexo: sexoSeleccionado,
    egresado: egresado.checked
  };

  estudiantes.push(nuevo);
  indice = estudiantes.length - 1;
  alert("Estudiante guardado correctamente.");

  desbloquear(false);
  mostrarEstudiante();
});

btnEliminar.addEventListener("click", () => {
  if (estudiantes.length === 0) {
    alert("No hay registros para eliminar.");
    return;
  }
  estudiantes.splice(indice, 1);
  alert("Estudiante eliminado.");
  if (indice >= estudiantes.length) indice = estudiantes.length - 1;
  mostrarEstudiante();
});

document.getElementById("btnPrimero").addEventListener("click", () => {
  if (estudiantes.length === 0) return;
  indice = 0;
  mostrarEstudiante();
});

document.getElementById("btnAnterior").addEventListener("click", () => {
  if (estudiantes.length === 0) return;
  if (indice > 0) indice--;
  mostrarEstudiante();
});

document.getElementById("btnSiguiente").addEventListener("click", () => {
  if (estudiantes.length === 0) return;
  if (indice < estudiantes.length - 1) indice++;
  mostrarEstudiante();
});

document.getElementById("btnUltimo").addEventListener("click", () => {
  if (estudiantes.length === 0) return;
  indice = estudiantes.length - 1;
  mostrarEstudiante();
});
