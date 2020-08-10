
//Execution Starts Here

//FLASHCART TOGGLE SWITCH
var div = document.createElement('div');
div.id = 'flashcart';
div.innerHTML = `
<p>FlashCart ⚡ <input type='checkbox' class='toggle-switch'></p>
<div id='status'><p>Trying to add to cart: <span id="clicks">0</span></p>
</div>
`;

//FLASHCART BLACK COVER ELEMENT
var cover_div = document.createElement('div');
cover_div.id = 'flashcart-cover';



//FLASHCART captcha div
var captcha_div = document.createElement('div');
captcha_div.id = 'flashcart-captcha';
captcha_div.innerHTML = `
<p>Enter Capcha </p>
<img scr=""><br>
<input type="text" maxlength="3"><br><br>
<button type="button">Continue</button>
</div>
`;

//ADD ALL THE ELEMENTS TO PAGE
$(function(){
    try {
        document.body.childNodes[1].childNodes[0].childNodes[2].childNodes[1].childNodes[0].childNodes[1].childNodes[1].after(div);
      }
      catch(err) {
        document.body.childNodes[1].childNodes[0].childNodes[2].childNodes[0].childNodes[1].childNodes[1].childNodes[0].after(div);
      }
    
    document.body.firstChild.before(cover_div);
    document.body.firstChild.before(captcha_div);
});


var css = document.createElement('style'); 
css.type = 'text/css'; 
styles = `#flashcart {
    position: relative;
    padding: 5px;
    border: 2px;
    border-radius: 5px;
    width: 240px;
    background: rgb(40, 116, 240);
    cursor: pointer;
    text-align: center;
    color: white;
    font-weight:500;

}

#flashcart p{
    font-size: 24px;
}
#flashcart input[type=checkbox].toggle-switch {
    font-size: 10px;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    width: 6em;
    height: 3em;
    border-radius: 3em;
    background-color: #ddd;
    outline: 0;
    cursor: pointer;
    transition: background-color 0.09s ease-in-out;
    position: relative;
    vertical-align: middle;
    margin: -2px 0 2px 0px;
}

#flashcart input[type=checkbox].toggle-switch:checked {
    background-color: #fb641b;
}

#flashcart input[type=checkbox].toggle-switch::after {
    content: '';
    width: 3em;
    height: 3em;
    background-color: white;
    border-radius: 3em;
    position: absolute;
    transform: scale(0.7);
    left: 0;
    transition: left 0.09s ease-in-out;
    box-shadow: 0 0.1em rgba(0, 0, 0, 0.5);
}

#flashcart input[type=checkbox].toggle-switch:checked::after {
    left: 3em;
}

#status {
    display: none;
}
#status>p {
    font-size: 14px;
    font-weight: 100;
}
#flashcart-cover{
    display: none;
    position: fixed;
    z-index: 100;
    background: black;
    width: 100%;
    height: 100%;
    opacity: 0.9;
}
#flashcart-captcha{
    display: none;
    position: fixed;
    z-index: 200;
    left: 40%;
    top: 35%;
    border: 2px solid #007efffa;
    padding: 40px;
    border-radius: 8px;
    background: #1b1b1b;
    box-shadow: 0px 0px 5px 0px #007efffa;
    text-align: center;
}
#flashcart-captcha>p{
    color: white;
    font-size: 24px;
    font-weight: 500;
}

#flashcart-captcha>button{
    background: #fb641b;
    border: none;
    padding: 18px 48px;
    border-radius: 1px;
    color: white;
    font-weight: 500;
    outline: none;
    box-shadow: 1px 1px 3px 0px #983e12;
}

#flashcart-captcha>input{    
    text-decoration: none;
    border: 2px solid #4bffff;
    border-radius: 0 8px 0 8px;
    outline: none;
    font-size: 24px;
    text-align: center;
}
}

`;

css.appendChild(document.createTextNode(styles)); 
document.getElementsByTagName("head")[0].appendChild(css); 




// // Make the DIV element draggable:
// dragElement(document.getElementById("flashcart"));

// function dragElement(elmnt) {
//   var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
//   if (document.getElementById(elmnt.id + "header")) {
//     // if present, the header is where you move the DIV from:
//     document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
//   } else {
//     // otherwise, move the DIV from anywhere inside the DIV:
//     elmnt.onmousedown = dragMouseDown;
//   }

//   function dragMouseDown(e) {
//     e = e || window.event;
//     e.preventDefault();
//     // get the mouse cursor position at startup:
//     pos3 = e.clientX;
//     pos4 = e.clientY;
//     document.onmouseup = closeDragElement;
//     // call a function whenever the cursor moves:
//     document.onmousemove = elementDrag;
//   }

//   function elementDrag(e) {
//     e = e || window.event;
//     e.preventDefault();
//     // calculate the new cursor position:
//     pos1 = pos3 - e.clientX;
//     pos2 = pos4 - e.clientY;
//     pos3 = e.clientX;
//     pos4 = e.clientY;
//     // set the element's new position:
//     elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
//     elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
//   }

//   function closeDragElement() {
//     // stop moving when mouse button is released:
//     document.onmouseup = null;
//     document.onmousemove = null;
//   }
// }