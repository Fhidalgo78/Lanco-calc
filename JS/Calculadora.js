import { divPuertasVentanas, divParedes } from "./constantes.js";

let unidadMedidad = "m2";
let ft = 10.7639;
let inputParedesValidation = true;
let inputPuertasValidation = true;
let totalArea = 0;
let galonesTotales = 0;

$(document).ready(function () {
  // Agregar un nuevo div con el contenido "Paredes" al hacer clic en el botón "Add1"
  $("#addVentana-btn").click(agregarDivParedes);

  // Agregar un nuevo div con el contenido "PUERTAS Y VENTANAS" al hacer clic en el botón "Add2"
  $("#addPuerta-btn").click(agregarDivPuertasVentanas);

  $("#calcular-btn").click(buttonListener);

  // Borrar un div al hacer clic en el ícono trash
  $(document).on("click", ".borrar-div", borrarDiv);

  //Cambia unidad de medida de metros a pies y viceversa con checkbox
  $("#color_mode").on("change", function () {
    changeUnidadMedida(this);
  });

  $("body").on("blur", ".small-input", function () {
    verificaInputNumerico();
    verificaResultado();
  });
});

// Función para borrar un div al hacer clic en el ícono trash
function borrarDiv() {
  $(this).closest(".row-container-wrapper").remove();
  verificaInputNumerico();
  verificaResultado();
}
// Función para agregar un nuevo div
function agregarDivParedes() {
  $("#contenedor-divs-paredes").append(divParedes);

  //$("#contenedor-divs").append(nuevoDiv);
}

// Función para agregar un nuevo div con el contenido "PUERTAS Y VENTANAS"
function agregarDivPuertasVentanas() {
  const nuevoDiv = $("#contenedor-divs-puertas").append(divPuertasVentanas);
}

function buttonListener() {
  verificaInputNumerico();
  verificaResultado();

  if (inputParedesValidation) {
    calculaAreaTrigger();
    resultadoCalculo();
  }
}
function changeUnidadMedida(ele) {
  unidadMedidad = $(ele).prop("checked") ? "ft" : "m2";
  verificaResultado();
}

function calculaAreaTrigger() {
  // Usando jQuery para seleccionar elementos por clase
  const valoresParedesLargos = $(".paredes-input-largo")
    .map(function () {
      return parseFloat($(this).val());
    })
    .get();

  const valoresParedesAnchos = $(".paredes-input-ancho")
    .map(function () {
      return parseFloat($(this).val());
    })
    .get();

  const valoresPuertasLargos = $(".puertas-input-largo")
    .map(function () {
      return parseFloat($(this).val());
    })
    .get();

  const valoresPuertasAnchos = $(".puertas-input-ancho")
    .map(function () {
      return parseFloat($(this).val());
    })
    .get();

  // La variable "valores" contendrá un array con los valores de los inputs
  calcularTotalArea(
    valoresParedesAnchos,
    valoresParedesLargos,
    valoresPuertasAnchos,
    valoresPuertasLargos
  );
}

function calcularTotalArea(
  valoresParedesAnchos,
  valoresParedesLargos,
  valoresPuertasAnchos,
  valoresPuertasLargos
) {
  let totalAreaParedes = 0;
  let totalAreaPuertas = 0;
  totalArea = 0;
  let resultado = 0;
  galonesTotales = 0;

  //se multiplica el ancho por el largo de cada pared y se suma

  for (let i = 0; i < valoresParedesAnchos.length; i++) {
    totalAreaParedes += valoresParedesAnchos[i] * valoresParedesLargos[i];
  }

  for (let i = 0; i < valoresPuertasAnchos.length; i++) {
    totalAreaPuertas += valoresPuertasAnchos[i] * valoresPuertasLargos[i];
  }

  //el total de area de las paredes se resta con el total de area de las puertas y ventanas
  resultado = totalAreaParedes - totalAreaPuertas;

  console.log(unidadMedidad);

  //segun la unidad de medida se hace la conversion

  if (unidadMedidad === "m2") {
    totalArea = resultado;
    galonesTotales = totalArea / 15;
  } else {
    totalArea = resultado * ft;
    galonesTotales = totalArea / ft / 15;
  }

  return galonesTotales;
}

function verificaInputNumerico() {
  var $divsGenerados = $(".small-input");

  inputParedesValidation = true;
  inputPuertasValidation = true;
  for (let i = 0; i < $divsGenerados.length; i++) {
    var $input = $divsGenerados[i];
    var $errorMessage = $input.nextElementSibling; // Encuentra el elemento "span" siguiente

    $errorMessage.textContent = ""; // Borra el mensaje de error al inicio de cada iteración

    if (isNaN($input.value)) {
      $errorMessage.textContent = "Ingrese solo números"; // Muestra el mensaje de error
    }

    if (
      $input.classList.contains("paredes-input") &&
      $input.value === ""
    ) {
      inputParedesValidation = false;
      $errorMessage.textContent = "Al menos dos valores"; // Muestra el mensaje de error
      break;
    }

    if (
      $input.classList.contains("puertas-input") &&
      $("#contenedor-divs-puertas").children().length > 0 &&
      $input.value === ""
    ) {
      inputPuertasValidation = false;
      break;
    }
  }
}


function verificaResultado() {
  calculaAreaTrigger();
  if (inputParedesValidation && inputPuertasValidation && !isNaN(totalArea)) {
    var areaFormateada = formatearNumeroConDecimales(totalArea);
    $("#idResultado").empty(); // Opcionalmente, puedes usar .html('') en lugar de .empty()
    var nuevoTextoEnNegrita = `<strong>${areaFormateada} ${unidadMedidad}</strong>`;
    $("#idResultado").html(nuevoTextoEnNegrita);
  }
  else {
    $("#idResultado").empty(); // Opcionalmente, puedes usar .html('') en lugar de .empty()
    var nuevoTextoEnNegrita = `<strong>0 ${unidadMedidad}</strong>`;
    $("#idResultado").html(nuevoTextoEnNegrita);
  }
}


function resultadoCalculo() {
 var galonesRedondeado = Math.ceil(galonesTotales);
 var mensajeGalones = "";
  if (galonesTotales === 1) {
    //redondea galones
    mensajeGalones = `${galonesRedondeado} galon`;
  } else {
    mensajeGalones = `${galonesRedondeado} galones`;
  }
  
  //formatear area total
  var areaFormateada = formatearNumeroConDecimales(totalArea);
  var nuevoContenido = `
    <img class="mt-5" src="../Icon/galon.png" width="35px" height="50px">
    <h3 class="mt-3">${mensajeGalones}</h3>
    <h4 class="mt-3">área de superficie: ${areaFormateada} ${unidadMedidad}</h4>
    <hr class="custom-hr">
    <div class="text-wrapper">
        <p class="mt-3" style="width: 65%;">Esta información es solo de referencia. La cantidad real va a depender de las condiciones de aplicación y tipo de superficie.</p>
    </div>
    <button class="large-sky-btn">LOCALIZAR TIENDA</button>
`;
  $("#modal-content").html(nuevoContenido);
}


function formatearNumeroConDecimales(numero) {
  var numeroFormateado = numero.toString();
  if (numeroFormateado.includes('.')) {
    // Si el número tiene decimales, lo formateamos con dos decimales
    numeroFormateado = parseFloat(numero).toFixed(2);
  }
  return numeroFormateado;
}




