$(function () {
    const socket = io();
    var nick = '';

    //Acceder a los elementos del DOM:
    const messageForm = $('#messages-form');
    const messageBox = $('#message');
    const chat = $('#chat');

    const userNames = $('#userNames');

    const nickName = userData.name;

    //Eventos

    //Enviar mensaje al servidor
    messageForm.submit(e => {
        e.preventDefault();
        socket.emit('enviar mensaje', messageBox.val());
        messageBox.val('');
    });

    //Obtener respuesta del servidor
    socket.on('nuevo mensaje', function (datos) {
        //console.log(datos);

        let color = "#f4f4f4";

        if (nick === datos.username) {
            color = '#9ff4c5';
        }

        chat.append(`<div class="msg-area mb-2 d-flex" style = "background-color:${color}"><b>${datos.username} : </b><p class="msg">${datos.msg}</p></div>`);
    });


    socket.emit('usuario', nickName, () => {
        nick = nickName;
    });


    //Obtener Array de usuarios conectados

    socket.on('nombre usuario', datos => {
        let html = '';
        let color = '';
        for (let i = 0; i < datos.length; i++) {
            if (nick === datos[i]) {
                color = "#027f47";
            } else {
                color = "#000"
            }

            html += `<p style ="color:${color}">${datos[i]}</p>`;
        }
        userNames.html(html);
    });


})

