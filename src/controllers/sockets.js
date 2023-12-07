module.exports = function (io) {

    let nickNames = [];

    io.on('connection', (socket) => {
        console.log('Usuario conectado');

        // Al recibir un mensaje, se recogen los datos
        socket.on('enviar mensaje', (datos) => {
            io.sockets.emit('nuevo mensaje', {
                msg: datos,
                username: socket.nickName
            });
        });

        // Al recibir un nuevo usuario
        socket.on('usuario', (datos, callback) => {
            if (!nickNames.includes(datos)) {
                // Agregar el usuario a la lista
                socket.nickName = datos;
                nickNames.push(socket.nickName);

                // Emitir la lista actualizada a todos los clientes
                io.emit('nombre usuario', nickNames);

                // Llamar al callback si está definido
                if (typeof callback === 'function') {
                    callback();
                }
            } else {
                // Informar al cliente que el nombre de usuario ya está en uso
                if (typeof callback === 'function') {
                    callback({ error: 'El nombre de usuario ya está en uso' });
                }
            }
        });

        // Manejar desconexiones de usuarios
        socket.on('disconnect', () => {
            // Remover el usuario desconectado de la lista
            const index = nickNames.indexOf(socket.nickName);
            if (index !== -1) {
                nickNames.splice(index, 1);
                io.emit('nombre usuario', nickNames);
            }
        });
    });
};
