// module.exports = function(io){
//     let clientsMap = {};
//
//     io.sockets.on('connection', function(socket){
//         // socket.emit('msg', {message: 'welcome to the chat'});
//         // socket.on('msg', function(data){
//         //     // io.sockets.emit('msg', data);
//         //     socket.broadcast.emit('msg', data);
//         // });
//         // clientsMap[socket.id] = {};
//         clientsMap[socket.id] = {};
//         console.log(`User ${socket.id} connected.`);
//         socket.emit('userChanged',clientsMap); //send users list on connection
//
//         socket.on('message', function (data) {
//             console.log("SERVER received message",data);
//             data.senderId = socket.id;
//             console.log("Server sending out", data);
//             socket.broadcast.emit('message',data);
//         });
//
//         socket.on('userChanged', function (data) {
//             console.log("SERVER received userChanged",data);
//             clientsMap[socket.id].name = data.user.name;
//             clientsMap[socket.id].color = data.user.color;
//             socket.broadcast.emit('userChanged',clientsMap);
//         });
//
//         socket.on('disconnect', function() {
//             console.log("user",clientsMap[socket.id].name,"disconnected");
//         });
//     });
//
//     io.sockets.on('error', function(err){
//         console.error(err);
//     });
// };
module.exports = function(io){
    let clientsMap = {};

    io.sockets.on('connection', function(socket){
        clientsMap[socket.id] = {};
        console.log(`User ${socket.id} connected.`);
        console.log(clientsMap);
        socket.emit('newUser',clientsMap); //send users list on connection

        socket.on('message', function(data){
            console.log("SERVER received message", data);
            data.senderId = socket.id;
            console.log("Server sending out", data);
            socket.broadcast.emit('message', data);
        });

        //cambio dati di un utente
        socket.on('userChanged', function(data){
            console.log("SERVER received userChanged", data);
            //modifica l'utente
            clientsMap[socket.id].name = data.name;
            clientsMap[socket.id].lat  = data.lat;
            clientsMap[socket.id].lon  = data.lon;
            clientsMap[socket.id].player  = data.player;
            //informa i precedenti utenti dei cambiamenti
            // socket.broadcast.emit('userChanged', {
            //     id   : socket.id,
            //     user : clientsMap[socket.id]
            // });
            socket.broadcast.emit('updateUsers', clientsMap);

            //informa il nuovo utente di tutti gli utenti del sistema
            socket.emit('updateUsers', clientsMap);
        });

        socket.on('disconnect', function() {
            console.log("user",clientsMap[socket.id].name,"disconnected");
            // socket.broadcast.emit('quitUser', clientsMap[socket.id]);
            delete clientsMap[socket.id];
            socket.broadcast.emit('updateUsers', clientsMap);
        });
    });

    io.sockets.on('error', function(err){
        console.error(err);
    });
};
