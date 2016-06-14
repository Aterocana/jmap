var loginForm      = document.querySelector('login-form');
var objectiveForm  = document.querySelector('objective-form');
// var connectedUsers = document.querySelector('connected-users');
var connectedUsers = document.querySelector('chat-sidebar');
var usersDiv       = document.getElementById('users');
var socket         = io();
var users          = {};

loginForm.attachListener(function(){
    socket.emit('userChanged', loginForm.getUser());
});

objectiveForm.attachListener(function(){
    socket.emit('newObj', objectiveForm.getObjective());
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
