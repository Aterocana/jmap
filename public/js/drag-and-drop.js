var objID;

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData('Text/html', ev.target.id);
    ev.dataTransfer.effectAllowed = 'move';
    console.log(ev.path);
    objID = ev.path[2].id;
    // console.log(objID);
}

function drop(ev) {
    ev.preventDefault();
    console.log(objID);
    socket.emit('newPosition', {
        'id' : objID,
        'target' : {
            'col' : ev.path[3].id.charAt(2),
            'row' : ev.path[3].id.charAt(1)
        }
    });
}

function enter(ev){
    ev.dataTransfer.dropEffect = 'move';
    // console.log("enter the drop zone");
}

function leave(ev){
    // console.log("leave the drop zone");
}
//
// function getStyle(el, styleProp) {
//   var value, defaultView = (el.ownerDocument || document).defaultView;
//   // W3C standard way:
//   if (defaultView && defaultView.getComputedStyle) {
//     // sanitize property name to css notation
//     // (hypen separated words eg. font-Size)
//     styleProp = styleProp.replace(/([A-Z])/g, "-$1").toLowerCase();
//     return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
//   } else if (el.currentStyle) { // IE
//     // sanitize property name to camelCase
//     styleProp = styleProp.replace(/\-(\w)/g, function(str, letter) {
//       return letter.toUpperCase();
//     });
//     value = el.currentStyle[styleProp];
//     // convert other units to pixels on IE
//     if (/^\d+(em|pt|%|ex)?$/i.test(value)) {
//       return (function(value) {
//         var oldLeft = el.style.left, oldRsLeft = el.runtimeStyle.left;
//         el.runtimeStyle.left = el.currentStyle.left;
//         el.style.left = value || 0;
//         value = el.style.pixelLeft + "px";
//         el.style.left = oldLeft;
//         el.runtimeStyle.left = oldRsLeft;
//         return value;
//       })(value);
//     }
//     return value;
//   }
// }
