module.exports = function(io){
    let clientsMap = {};
    let messages = {};

    io.sockets.on('connection', function(socket){
        // clientsMap[socket.id] = {};
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
            clientsMap[socket.id] = {};
            //modifica l'utente
            clientsMap[socket.id].name  = data.name;
            clientsMap[socket.id].color = data.color;
            clientsMap[socket.id].admin = data.admin;
            //l'admin non dispone obiettivi sulla mappa
            if(!data.admin){
                clientsMap[socket.id].objectives = [];
            }
            //informa i precedenti utenti dei cambiamenti
            socket.broadcast.emit('updateUsers', clientsMap);
            //informa il nuovo utente di tutti gli utenti del sistema
            socket.emit('updateUsers', clientsMap);
        });

        //aggiunta di un obiettivo
        socket.on('newObj', function(data){
            console.log("SERVER received newObj", data);
            if(!clientsMap[socket.id].admin){
                clientsMap[socket.id].objectives.push(data);
                /*clientsMap[socket.id].name   = data.name;
                clientsMap[socket.id].symbol = data.symbol;
                clientsMap[socket.id].lat    = data.lat;
                clientsMap[socket.id].lon    = data.lon;*/
                socket.broadcast.emit('updateUsers', clientsMap);
                socket.emit('updateUsers', clientsMap);
            }
        });

        //rimozione di un obiettivo
        socket.on('removeObj', function(data){
            console.log("SERVER received removeObj", data);
            let index = clientsMap[socket.id].objectives.indexOf(data);
            if(index !== -1){
                clientsMap[socket.id].objectives.splice(index, 1);
                socket.broadcast.emit('updateUsers', clientsMap);
                socket.emit('updateUsers', clientsMap);
            }

        });

        //messaggio di chat
        socket.on('msg', function(data){
            console.log("SERVER received msg", data);
            messages[new Date()] = {"name" : clientsMap[socket.id].name, "msg": data.msg, "color": clientsMap[socket.id].color};
            console.log(messages);
            socket.emit('msg', messages);
            socket.broadcast.emit('msg', messages);
        });

        socket.on('disconnect', function() {
            console.log("user",clientsMap[socket.id],"disconnected");
            // socket.broadcast.emit('quitUser', clientsMap[socket.id]);
            delete clientsMap[socket.id];
            socket.broadcast.emit('updateUsers', clientsMap);
        });
    });

    io.sockets.on('error', function(err){
        console.error(err);
    });
};
