var loginForm     = document.querySelector('login-form');
var chatSidebar   = document.querySelector('chat-sidebar');
var mapDisplay    = document.querySelector('map-display');
var socket        = io();

socket.on('connect', function(){
    /* imposto il socket a cui mandare i cambiamenti degli utenti*/
    loginForm.attachListener(function(){
        socket.emit('userChanged', loginForm.getUser());
        loginForm.slideOut();
        chatSidebar.slideIn();
        mapDisplay.show();
    });
    chatSidebar.setSocket(socket);
    mapDisplay.setSocket(socket);
});
