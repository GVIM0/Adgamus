const SeleccionarNivel = document.getElementById("seleccionNivel");
const Mundo1 = document.getElementById("mundoEspacial");
let Seleccionado = '';

function seleccionarFun() {
    Seleccionado = document.querySelector('input[name=slider]:checked').value;
    SeleccionarNivel.classList.toggle("escondido", true);
    console.log(Seleccionado);

    if (Seleccionado === "slide1") {
        Seleccionado = '';
        Mundo1.classList.toggle("escondido", false);
    } else {
        Seleccionado = '';
        SeleccionarNivel.classList.toggle("escondido", false);
        Mundo1.classList.toggle("escondido", true);
        Swal.fire({
        title: 'Niveles',
        text: 'Próximamente más niveles :)',
        icon: 'info',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#000',
        background: 'linear-gradient(-45deg, #ffae00, #7e03aa, #00fffb)',
        color: '#fff',
        allowOutsideClick: true,
        allowEscapeKey: true,
        allowEnterKey: true
    });
    }

}

document.getElementById("seleccionar").addEventListener("click", () => seleccionarFun());



