var loginForm     = document.querySelector('login-form');
var objectiveForm = document.querySelector('objective-form');
var chatSidebar   = document.querySelector('chat-sidebar');
var usersDiv      = document.getElementById('users');
var socket        = io();
var users         = {};

loginForm.attachListener(function(){
    socket.emit('userChanged', loginForm.getUser());
});

chatSidebar.setSendMessage(function(data){
    socket.emit('msg', data);
});

objectiveForm.attachListener(function(){
    socket.emit('newObj', objectiveForm.getObjective());
});

socket.on('updateUsers', function(data){
    users = data;
    chatSidebar.setUsers(users);
    console.log('updateUsers', users);
});

socket.on('userChanged', function(data){
    users[data.id] = data.user;
    chatSidebar.setUsers(users);
    console.log('userChanged', users);
});

socket.on('msg', function(data){
    console.log(data);
    chatSidebar.setMessages(data);
});
