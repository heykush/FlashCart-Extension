
//CART SUCCESS SOUND
var s = document.createElement('audio');
s.id = 'successAudio';
s.setAttribute('autoplay', '');
s.innerHTML = `
  <source src="https://freesound.org/data/previews/109/109662_945474-lq.mp3" type="audio/mp3">
`;

document.body.appendChild(s); 
document.getElementById("successAudio").play();