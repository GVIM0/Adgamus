// sockets.js
module.exports = function (io) {
    const connectedUsers = {};
    const mensajesPrivados = {};

    io.on('connection', (socket) => {
        console.log('Usuario conectado');

        // Manejar mensajes privados
        socket.on('private_message', ({ sender, receiver, message }) => {
            const keySenderToReceiver = `${sender}-${receiver}`;
            const keyReceiverToSender = `${receiver}-${sender}`;

            // Almacena el mensaje privado para el remitente
            if (!mensajesPrivados[keySenderToReceiver]) {
                mensajesPrivados[keySenderToReceiver] = [];
            }
            mensajesPrivados[keySenderToReceiver].push({ sender, message });

            // Almacena el mensaje privado para el destinatario
            if (!mensajesPrivados[keyReceiverToSender]) {
                mensajesPrivados[keyReceiverToSender] = [];
            }
            mensajesPrivados[keyReceiverToSender].push({ sender, message });

            // Enviar mensaje privado al destinatario
            const receiverSocket = connectedUsers[receiver];
            if (receiverSocket) {
                receiverSocket.emit('private_message', { sender, message, receiver });
            }

            // Enviar mensaje privado al remitente con una marca para el color diferenciado
            socket.emit('private_message', { sender, message, receiver, isSender: true });
        });

        // Agregar evento para obtener mensajes antiguos
        socket.on('obtener_mensajes', ({ sender, receiver }) => {
            // Utiliza las claves tanto del remitente al destinatario como del destinatario al remitente
            const keySenderToReceiver = `${sender}-${receiver}`;
            const keyReceiverToSender = `${receiver}-${sender}`;

            // Combina y filtra los mensajes antiguos de ambas direcciones para evitar duplicados
            const messagesSenderToReceiver = mensajesPrivados[keySenderToReceiver] || [];
            const messagesReceiverToSender = mensajesPrivados[keyReceiverToSender] || [];
            const allMessages = [...messagesSenderToReceiver, ...messagesReceiverToSender];

            // Filtrar mensajes únicos por sender y message
            const uniqueMessages = Array.from(new Set(allMessages.map(msg => JSON.stringify(msg))))
                .map(string => JSON.parse(string));

            // Envía los mensajes al cliente
            socket.emit('mensajes_antiguos', { messages: uniqueMessages });
        });

        // Manejar desconexiones de usuarios
        socket.on('disconnect', () => {
            const username = Object.keys(connectedUsers).find(key => connectedUsers[key] === socket);
            if (username) {
                delete connectedUsers[username];
                io.emit('nombre usuario', Object.keys(connectedUsers));
            }
        });

        // Manejar la conexión de un nuevo usuario
        socket.on('usuario', (username, callback) => {
            if (!connectedUsers[username]) {
                connectedUsers[username] = socket;
                io.emit('nombre usuario', Object.keys(connectedUsers));

                if (typeof callback === 'function') {
                    callback();
                }
            } else {
                if (typeof callback === 'function') {
                    callback({ error: 'El nombre de usuario ya está en uso' });
                }
            }
        });
    });
};
