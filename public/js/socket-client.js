var loginForm     = document.querySelector('login-form');
// var objectiveForm = document.querySelector('objective-form');
var chatSidebar   = document.querySelector('chat-sidebar');
var mapDisplay    = document.querySelector('map-display');
var socket        = io();

socket.on('connect', function(){
    /* imposto il socket a cui mandare i cambiamenti degli utenti*/
    loginForm.attachListener(function(){
        socket.emit('userChanged', loginForm.getUser());
        chatSidebar.slideIn();
        loginForm.slideOut();
        mapDisplay.show();
    });
    /* imposto il socket a cui mandare i nuovi messaggi*/
    chatSidebar.setSendMessage(function(data){
        socket.emit('msg', data);
    });
    /* imposto il socket a cui mandare i cambiamenti di obiettivi*/
    // objectiveForm.attachListener(function(){
    //     socket.emit('newObj', objectiveForm.getObjective());
    // });

    socket.on('updateUsers', function(data){
        // inoltro gli utenti aggiornati
        chatSidebar.setUsers(data);
        console.log('updateUsers', data);
    });

    // socket.on('userChanged', function(data){
    //     // aggiungo il nuovo utente e inoltro gli utenti aggiornati
    //     users[data.id] = data.user;
    //     chatSidebar.setUsers(users);
    //     console.log('userChanged', users);
    // });

    socket.on('msg', function(data){
        console.log(data);
        chatSidebar.setMessages(data);
    });
});
