import { divPuertasVentanas, divParedes } from "./constantes.js";

let unidadMedidad = "m2";
let ft = 10.7639;
let inputParedesValidation = true;
let inputPuertasValidation = true;

$(document).ready(function () {
  // Agregar un nuevo div con el contenido "Paredes" al hacer clic en el botón "Add1"
  $("#addVentana-btn").click(agregarDivParedes);

  // Agregar un nuevo div con el contenido "PUERTAS Y VENTANAS" al hacer clic en el botón "Add2"
  $("#addPuerta-btn").click(agregarDivPuertasVentanas);

  $("#calcular-btn").click(buttonListener);

  // Agregar un nuevo div al hacer clic en el botón "Agregar Div"
  //$("#agregar-div-btn").click(agregarDiv);

  // Borrar un div al hacer clic en el ícono trash
  $(document).on("click", ".borrar-div", borrarDiv);

  //Cambia unidad de medida de metros a pies y viceversa con checkbox
  $("#color_mode").on("change", function () {
    changeColorMode(this);
  });

  $("body").on("blur", ".small-input", function () {
    verificaInputNumerico();
  });
});

// Función para borrar un div al hacer clic en el ícono trash
function borrarDiv() {
  $(this).closest(".row-container-wrapper").remove();
  verificaInputNumerico();
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

  if (inputParedesValidation) {
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
  } else {
    alert("Debe ingresar al menos dos valores");
  }

  if(!inputPuertasValidation ){
    alert("suwi");
  }

}
function changeColorMode(ele) {
  unidadMedidad = $(ele).prop("checked") ? "ft" : "m2";
}

function calcularTotalArea(
  valoresParedesAnchos,
  valoresParedesLargos,
  valoresPuertasAnchos,
  valoresPuertasLargos
) {
  let totalAreaParedes = 0;
  let totalAreaPuertas = 0;
  let totalArea = 0;
  let resultado = 0;
  let galonesTotales = 0;

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
    galonesTotales = resultado / ft / 15;
  }

  console.log(galonesTotales);
  console.log(totalArea);

  return totalArea;
}

function verificaInputNumerico() {
  // Recupera los divs con la clase "div-generado"
  var $divsGenerados = $(".small-input");

  // Itera a través de los divs para recuperar los valores
  inputParedesValidation = true;
  inputPuertasValidation = true;
  for (let i = 0; i < $divsGenerados.length; i++) {
    //verifica si no es numero
    if (isNaN($divsGenerados[i].value)) {
      alert("Ingrese solo numero");
    }
    //verifica si es un input de paredes y no esta vacio
    if (
      $divsGenerados[i].classList.contains("paredes-input") &&
      $divsGenerados[i].value === ""
    ) {
      inputParedesValidation = false;
      break;
    }
    //verifica inputs de puertas y ventanas en caso de haber, que  no este vacio
    if (
      $divsGenerados[i].classList.contains("puertas-input") &&
      $("#contenedor-divs-puertas").children().length > 0 &&
      $divsGenerados[i].value === ""
    ) {
        inputPuertasValidation = false;
        break;
    }
  }
}
