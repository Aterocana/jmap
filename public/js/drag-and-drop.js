var objID;
var deleteBar = document.querySelector('delete-bar');

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData('Text/html', ev.target.id);
    ev.dataTransfer.effectAllowed = 'move';
    objID = ev.path[2].id;
    deleteBar.show();
}

function drop(ev) {
    ev.preventDefault();
    socket.emit('newPosition', {
        'id' : objID,
        'target' : {
            'col' : ev.path[3].id.charAt(2),
            'row' : ev.path[3].id.charAt(1)
        }
    });
    deleteBar.hide();
}

function enter(ev){
    ev.dataTransfer.dropEffect = 'move';
    // console.log("enter the drop zone");
}

function leave(ev){
    // console.log("leave the drop zone");
}

function deleteObj(ev){
    ev.preventDefault();
    socket.emit('removeObj', {'id' : objID});
    deleteBar.hide();
    deleteBar.whitify();
}

function enterRed(ev){
    ev.dataTransfer.dropEffect = 'move';
    deleteBar.redify();
}

function exitRed(ev){
    deleteBar.whitify();
}
