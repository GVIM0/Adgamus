// user.js
$(function () {
    const socket = io();
    var nick = '';
    var selectedUser = '';

    const messageForm = $('#messages-form');
    const messageBox = $('#message');
    const chat = $('#chat');
    const userNames = $('#userNames');

    const nickName = userData.name;

    // Enviar mensaje al servidor
    messageForm.submit(e => {
        e.preventDefault();

        if (selectedUser) {
            // Enviar mensaje privado al servidor si hay un usuario seleccionado
            socket.emit('private_message', {
                sender: nick,
                receiver: selectedUser,
                message: messageBox.val()
            });
        } else {
            // Enviar mensaje público al servidor si no hay usuario seleccionado
            socket.emit('enviar mensaje', messageBox.val());
        }

        messageBox.val('');
    });

    // Manejar mensajes públicos
    socket.on('nuevo mensaje', function (datos) {
        let color = "#f4f4f4";

        if (nick === datos.username) {
            color = '#9ff4c5';
        }

        // Verificar si el remitente es el usuario actual antes de mostrar el mensaje
        if (selectedUser === '' || selectedUser === datos.username || nick === datos.username) {
            // Mostrar mensaje en el chat
            chat.append(`<div class="msg-area mb-2 d-flex" style="background-color:${color}"><b>${datos.username} : </b><p class="msg">${datos.msg}</p></div>`);
        }
    });

    // Manejar mensajes privados
    socket.on('private_message', function (datos) {
        let color = "#f4f4f4";

        // Cambiar el color si es el remitente
        if (nick === datos.sender) {
            color = '#9ff4c5';
        }

        // Cambiar el color si es el destinatario
        if (selectedUser && nick === selectedUser && datos.isSender) {
            color = '#ffeedd';
        }

        // Mostrar el mensaje privado en el chat del remitente y del destinatario
        chat.append(`<div class="msg-area mb-2 d-flex" style="background-color:${color}"><b> ${datos.sender} : </b><p class="msg">${datos.message}</p></div>`);
    });

    // Después del evento 'private_message'
    socket.on('mensajes_antiguos', ({ messages }) => {
        // Limpia el contenido del chat
        chat.empty();

        // Muestra los mensajes antiguos en el chat
        messages.forEach(({ sender, message }) => {
            let color = sender === nick ? '#9ff4c5' : '#f4f4f4';
            chat.append(`<div class="msg-area mb-2 d-flex" style="background-color:${color}"><b>${sender} : </b><p class="msg">${message}</p></div>`);
        });
    });

    // Emitir información de usuario al servidor
    socket.emit('usuario', nickName, () => {
        nick = nickName;
    });

    // Obtener y mostrar la lista de usuarios conectados
    socket.on('nombre usuario', datos => {
        let html = '';
        let color = '';

        for (let i = 0; i < datos.length; i++) {
            if (nick === datos[i]) {
                color = "#027f47";
            } else {
                color = "#000";
            }

            // Agrega una clase "selected" al usuario seleccionado
            const isSelected = selectedUser === datos[i] ? 'selected' : '';

            // Mostrar lista de usuarios en el lado derecho
            html += `<p id="user_${i}" class="user ${isSelected}" data-user="${datos[i]}" style="color:${color}">${datos[i]}</p>`;
        }
        userNames.html(html);

        // Agregar evento de clic para seleccionar un usuario para el chat privado
        $('.user').click(function () {
            selectedUser = $(this).data('user');

            // Remueve la clase "selected" de todos los usuarios
            $('.user').removeClass('selected');

            // Agrega la clase "selected" solo al usuario seleccionado
            $(this).addClass('selected');

            // Actualiza el nombre en el header de la tarjeta
            $('#selectedUserName').text(`Chat de ${selectedUser}`);

            // Envía una solicitud al servidor para obtener los mensajes anteriores
            socket.emit('obtener_mensajes', { sender: nick, receiver: selectedUser });
        });
    });
});
