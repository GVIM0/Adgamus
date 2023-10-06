function avisoLogros() {
    Swal.fire({
        title: 'Logros',
        text: 'Lo sentimos, aún no contamos con logros :(',
        icon: 'info',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#000',
        background: 'linear-gradient(-45deg, #ffae00, #7e03aa, #00fffb)',
        color: '#fff',
        allowOutsideClick: true,
        allowEscapeKey: true,
        allowEnterKey: true
//        stopKeydownPropagation: false //Para evitar que se ejecuten enventos
    });
}
//function avisoManual() {
//    Swal.fire({
//        title: 'Manual',
//        text: 'Te permitiremos descubrir las funciones tu mismo :)',
//        icon: 'info',
//        confirmButtonText: 'Ok',
//        confirmButtonColor: '#000',
//        background: 'linear-gradient(-45deg, #ffae00, #7e03aa, #00fffb)',
//        color: '#fff',
//        allowOutsideClick: true,
//        allowEscapeKey: true,
//        allowEnterKey: true
//    });
//}
function avisoAcercaDe() {
    Swal.fire({
        title: 'Somos GUIMO',
        html: `
    Misión:<br> 
    <p>Somos una empresa de software innovador y eficiente que optimiza la productividad y mejora los procesos de nuestros clientes.</p>
    Visión:<br>
        <p>Ser lideres globales en el desarollo de software reconocidos por nuestro compromiso constante con la calidad, la mejora 
        continua y la entrega de soluciones excepcionales.</p>
    `,
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

document.getElementById("btn").addEventListener("click", () => avisoLogros());
//document.getElementById("btn5").addEventListener("click", () => avisoManual());
document.getElementById("btn3").addEventListener("click", () => avisoAcercaDe());
