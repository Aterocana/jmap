function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData('Text/html', ev.target.id);
    ev.dataTransfer.effectAllowed = 'move';

    // var img = new Image();
    // img.src = './dancing-banana.gif';
    // ev.dataTransfer.setDragImage(img, 100, 100);
    console.log('drag#'+ev.target.id);
    console.log(ev);
    console.log("muovo: ");
    console.log(ev.path[0]);
    console.log("partenza: ");
    console.log(ev.path[3]);
}

function drop(ev) {
    ev.preventDefault();
    console.log("arrivo");
    console.log(ev.path[3]);
    // var data = ev.dataTransfer.getData("text");
    // ev.target.appendChild(document.getElementById(data));

    // var dragged_elem = document.getElementById(data);
    // var initX = parseInt(getStyle(dragged_elem, "left"));
    // var initY = parseInt(getStyle(dragged_elem, "top"));
    // dragged_elem.style.left=ev.clientX+'px';
    // dragged_elem.style.top=ev.clientY+'px';
    // dragged_elem.style.left=(initX+parseInt(ev.clientX))+'px';
    // dragged_elem.style.top=(initY+parseInt(ev.clientY))+'px';
    // console.log('drop');
}

function enter(ev){
    ev.dataTransfer.dropEffect = 'move';
    // console.log("enter the drop zone");
}

function leave(ev){
    console.log("leave the drop zone");
}

function getStyle(el, styleProp) {
  var value, defaultView = (el.ownerDocument || document).defaultView;
  // W3C standard way:
  if (defaultView && defaultView.getComputedStyle) {
    // sanitize property name to css notation
    // (hypen separated words eg. font-Size)
    styleProp = styleProp.replace(/([A-Z])/g, "-$1").toLowerCase();
    return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
  } else if (el.currentStyle) { // IE
    // sanitize property name to camelCase
    styleProp = styleProp.replace(/\-(\w)/g, function(str, letter) {
      return letter.toUpperCase();
    });
    value = el.currentStyle[styleProp];
    // convert other units to pixels on IE
    if (/^\d+(em|pt|%|ex)?$/i.test(value)) {
      return (function(value) {
        var oldLeft = el.style.left, oldRsLeft = el.runtimeStyle.left;
        el.runtimeStyle.left = el.currentStyle.left;
        el.style.left = value || 0;
        value = el.style.pixelLeft + "px";
        el.style.left = oldLeft;
        el.runtimeStyle.left = oldRsLeft;
        return value;
      })(value);
    }
    return value;
  }
}
