let canvas;
let ctx;
let character = new Player();

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    console.log(character);


    // character.src = '../img/Player_Anim/Idle/idle_00.png';
    // setTimeout(() => {

    //     ctx.drawImage(character, -75, -50, 225, 200);
    // }, 2000);
}