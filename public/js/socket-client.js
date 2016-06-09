var loginForm      = document.querySelector('login-form');
var connectedUsers = document.querySelector('connected-users');
var usersDiv       = document.getElementById('users');
var socket         = io();
var users          = {};

loginForm.attachListener(function(){
    socket.emit('userChanged', loginForm.getUser());
});

socket.on('updateUsers', function(data){
    users = data;
    connectedUsers.setUsers(users);
    console.log('updateUsers', users);
});

socket.on('userChanged', function(data){
    users[data.id] = data.user;
    connectedUsers.setUsers(users);
    console.log('userChanged', users);
});

socket.on('msg', function(data){
    console.log(data);
    regForm.addContent(data);
});

function sendMessage(){
    socket.emit('msg', {'message' : 'hola'});
}
