import { divPuertasVentanas, nuevoDivParedes, divParedes, nuevoDivPuertasVentanas } from './constantes.js';

$(document).ready(function () {


    // Agregar un nuevo div con el contenido "Paredes" al hacer clic en el botón "Add1"
    $("#addVentana-btn").click(agregarDivParedes);

    // Agregar un nuevo div con el contenido "PUERTAS Y VENTANAS" al hacer clic en el botón "Add2"
    $("#addPuerta-btn").click(agregarDivPuertasVentanas);

    $("#calcular-btn").click(calcular);

    // Agregar un nuevo div al hacer clic en el botón "Agregar Div"
    //$("#agregar-div-btn").click(agregarDiv);

    // Borrar un div al hacer clic en el ícono trash
    $(document).on("click", ".borrar-div", borrarDiv);



});

// Función para borrar un div al hacer clic en el ícono trash
function borrarDiv() {
    $(this).closest(".row-container-wrapper").remove();
}
// Función para agregar un nuevo div
function agregarDivParedes() {

    $("#contenedor-divs-paredes").append(divParedes);


    //$("#contenedor-divs").append(nuevoDiv);
}

// Función para agregar un nuevo div con el contenido "PUERTAS Y VENTANAS"
function agregarDivPuertasVentanas() {
    const nuevoDiv =
        $("#contenedor-divs-puertas").append(divPuertasVentanas);
}


function calcular() {
    // Usando jQuery para seleccionar elementos por clase
    const valoresParedes = $('.paredes-input').map(function () {
        return $(this).val();
    }).get();

    const valoresPuertas = $('.puertas-input').map(function () {
        return $(this).val();
    }).get();

    // La variable "valores" contendrá un array con los valores de los inputs
    console.log(valoresParedes);
    console.log(valoresPuertas);
}