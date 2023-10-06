//Referencias a elementos
const palabras = palabrasArray;
const palabraContainer = document.getElementById("palabraActual");
const palabraAnteriorContainer = document.getElementById("palabraAnterior");
const input = document.querySelector("input");
const correctasElement = document.querySelector("#correctas span");
const incorrectasElement = document.querySelector("#incorrectas span");
const ppmElement = document.querySelector("#ppm span");
const puntajeElement = document.querySelector("#Puntaje span");
const puntajeMinElement = document.querySelector("#PuntajeMin span");
const infoNivelElement = document.querySelector("#infoNivel span");
const empezarBoton = document.getElementById("empezar");
const barraProgreso = document.querySelector("#barraProgreso div");
const finalContainer = document.getElementById("final");

const correctasElement2 = document.querySelector("#spanCorrectas");
const incorrectasElement2 = document.querySelector("#spanErrores");
const ppmElement2 = document.querySelector("#spanPPM");
const puntajeElement2 = document.querySelector("#spanPuntaje");
const puntajeMinElement2 = document.querySelector("#spanPuntajeMin");
const infoNivelElement2 = document.querySelector("#spanInfoNivel");



//Otras variables
let banderitaTerminar;
let listaLetras;
let indiceActual = 0;
let letrasCorrectas;
let letrasIncorrectas;
let palabrasTerminadas;
let ppm;
let puntaje;
let jugando = false;
let tiempoJuego = sessionStorage.getItem("tiempoJuego");
let puntajeMinimo;
let informacionNivel;
console.log(sessionStorage.getItem("informacionNivel"));
document.documentElement.style.setProperty("--tiempo", tiempoJuego + 's');

//Funciones
function nuevaPalabra() {
    indiceActual = 0;
    const	nPalabraElegida = Math.floor(Math.random() * (palabras.length - 1));
    const	palabraElegida = palabras[nPalabraElegida];
    //Borro la palabraActual y creo los elementos de la nueva
    borrarHijos(palabraContainer);
    listaLetras = [];
    for (let i = 0; i < palabraElegida.length; i++) {
        const letraElement = document.createElement("span");
        letraElement.textContent = palabraElegida[i];
        letraElement.classList.add("aparecer");
        palabraContainer.appendChild(letraElement);
        listaLetras.push(letraElement);
        letraElement.addEventListener("animationend", () => {
            letraElement.classList.toggle("aparecer", false);
        });
    }
}

function empezar() {
    jugando = true;
    empezarBoton.classList.toggle("escondido", true);
    palabraContainer.classList.toggle("escondido", false);
    reset();
    nuevaPalabra();
    barraProgreso.classList.toggle("completarTiempo", true);
    finalContainer.classList.toggle("escondido", true);
    listaLetras[0].classList.add("letraActual");

}

function terminar() {
    jugando = false;
    palabraContainer.classList.toggle("escondido", true);
    finalContainer.classList.toggle("escondido", false);
    barraProgreso.classList.toggle("completarTiempo", false);
    ppm = palabrasTerminadas * (60 / tiempoJuego);
    puntajeMinimo = sessionStorage.getItem("puntajeMinimo");
    informacionNivel = sessionStorage.getItem("informacionNivel");
    ppmElement.textContent = ppm;

    ppmElement2.textContent = ppm;
    puntajeElement.textContent = letrasCorrectas - letrasIncorrectas;
    puntajeMinElement.textContent = puntajeMinimo;
    infoNivelElement.textContent = informacionNivel;
    puntajeElement2.textContent = puntaje;
    puntajeMinElement2.textContent = puntajeMinimo;
    infoNivelElement2.textContent = informacionNivel;
    FrasesNivel();

}

function reset() {
    letrasCorrectas = 0;
    letrasIncorrectas = 0;
    ppm = 0;
    palabrasTerminadas = 0;
    puntaje = 0;
    puntajeMinimo = 0;
    informacionNivel = "";
    correctasElement.textContent = letrasCorrectas;
    incorrectasElement.textContent = letrasIncorrectas;
    ppmElement.textContent = ppm;
    puntajeElement.textContent = puntaje;
    puntajeMinElement.textContent = puntajeMinimo;
    infoNivelElement.textContent = informacionNivel;



    correctasElement2.textContent = letrasCorrectas;
    incorrectasElement2.textContent = letrasIncorrectas;
    ppmElement2.textContent = ppm;
    puntajeElement2.textContent = puntaje;
    puntajeMinElement2.textContent = puntajeMinimo;
    infoNivelElement2.textContent = informacionNivel;

}

function borrarHijos(element) {
    Array.from(element.children).forEach(child => element.removeChild(child));
}

function crearLetraEfecto(element) {
    const letra = element.textContent;
    const posicionLetra = element.getBoundingClientRect();
    element.classList.add("invisible");
    const nuevaLetra = document.createElement("span");
    nuevaLetra.textContent = letra;
    nuevaLetra.style = `
		--top: ${posicionLetra.top}px;
		--left: ${posicionLetra.left}px;
	`;
    nuevaLetra.classList.add("desaparecer");
    document.body.appendChild(nuevaLetra);
    nuevaLetra.addEventListener("animationend", () => {
        document.body.removeChild(nuevaLetra);
    });
}
function FrasesNivel() {
    if (puntajeMinimo < puntaje) {

    } else {

    }
}


// Eventos
barraProgreso.addEventListener("animationend", () => {
    terminar();
});
document.getElementById("empezar").addEventListener("click", () => empezar());
input.addEventListener("input", (event) => {
    if (!jugando) {
        if (event.data === " ")
            empezar();
        return;
    }
    if (listaLetras[indiceActual].textContent === event.data) {
        crearLetraEfecto(listaLetras[indiceActual]);
        indiceActual++;
        letrasCorrectas++;
        correctasElement.textContent = letrasCorrectas;
        correctasElement2.textContent = letrasCorrectas;
        if (indiceActual === listaLetras.length) {
            nuevaPalabra();
            palabrasTerminadas++;
        }
        ;
        listaLetras[indiceActual].classList.add("letraActual");
    } else {
        letrasIncorrectas++;
        incorrectasElement.textContent = letrasIncorrectas;
        incorrectasElement2.textContent = letrasIncorrectas;
    }
});
input.addEventListener("blur", () => input.focus());
//Ejecución
input.focus();