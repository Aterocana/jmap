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
    socket.on('newObj', function(obj){
        // var newObj = document.createElement('obj');
        // newObj.className="obj";
        // newObj.style.backgroundColor = obj.owner.color;
        var newObj = new ObjectiveItem(obj.owner.color);
        newObj.id = obj.id;
        // newObj.style.top = data.row * mapDisplay.getDistance();
        // newObj.style.left = data.col * mapDisplay.getDistance();
        console.log('c'+obj.data.col+obj.data.row);
        mapDisplay.getElement(obj.data.col, obj.data.row).appendChild(newObj);
    });
});
