
//Execution Starts Here
document.body.innerText='';
console.log("BODY CLEARED!");

//FLASHCART TOGGLE SWITCH
var toggle = document.createElement('div');
toggle.id = 'flashcart';
toggle.innerHTML = `
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
<p>Select Order Details</p>
<font size="4" color="red">Do not use same account in multiple tabs or windows.</font><br><br>
<img id='pimage' scr=""><br>
<select id="alist">
<option>Add Address First</option>
</select><br><br>
<select id="plist"></select><br>><br>
<select id="quantity">
<option value='1'>1</option>
<option value='2'>2</option>
</select><br>
<br>
</div>
`;
captcha_div.appendChild(toggle);
cover_div.appendChild(captcha_div);

//ADD ALL THE ELEMENTS TO PAGE
$(function(){
    
    try {
        document.body.appendChild(cover_div);
      }
      catch(err) {
        document.body.childNodes[0].after(div);
      }

});


var css = document.createElement('style'); 
css.type = 'text/css'; 
styles = `#flashcart {
    padding: 5px;
    border: 2px;
    border-radius: 5px;
    width: 240px;
    background: rgb(40, 116, 240);
    cursor: pointer;
    text-align: center;
    color: white;
    font-weight:500;
    margin: auto;

}

#flashcart p{
    font-size: 24px;
    margin: auto;
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
    display: block;
    position: fixed;
    z-index: 0;
    width: 100%;
    height: 100%;
}
#flashcart-captcha{
    border: 2px solid #007efffa;
    padding: 24px;
    border-radius: 8px;
    background: #1b1b1b;
    box-shadow: 0px 0px 5px 0px #007efffa;
    text-align: center;
    width: 36%;
    margin: auto;
    min-width: fit-content;
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

#flashcart-captcha>select{    
    text-decoration: none;
    border: 2px solid #007efffa;;
    border-radius: 0 8px 0 8px;
    outline: none;
    font-size: 1em;
    text-align: center;
    padding: 5px;
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