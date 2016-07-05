var loginForm   = document.querySelector('login-form');
var chatSidebar = document.querySelector('chat-sidebar');
var mapDisplay  = document.querySelector('map-display');
var socket      = io();
var userID      = "";

socket.on('connect', function(){
    /* imposto il socket a cui mandare i cambiamenti degli utenti*/
    socket.on('newUser', function(data){
        userID = data.id;
        // mapDisplay.importObjectives(data.clients);
    });
    loginForm.attachListener(function(){
        socket.emit('userChanged', loginForm.getUser());
        loginForm.slideOut();
        chatSidebar.slideIn();
        mapDisplay.show();
    });
    mapDisplay.setSocket(socket);
    chatSidebar.setSocket(socket);
});
