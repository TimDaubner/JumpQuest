let canvas;
let ctx;
let character = new Image();

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    character.src = '../img/Player_Anim/Idle/idle_00.png';
    setTimeout(() => {

        ctx.drawImage(character, -75, -50, 225, 200);
    }, 2000);
}