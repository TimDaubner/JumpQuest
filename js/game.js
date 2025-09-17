let canvas;
let world;

function init() {
    canvas = document.getElementById('canvas');
    // TODO - scaling objects
    // canvas.width = 720 * 2;
    // canvas.height = 480 * 2;
    // canvas.style.width = "720px";
    // canvas.style.height = "480px";
    world = new World(canvas);
    posX = world.character.posX
    posY = world.character.posY


    // character.src = '../img/Player_Anim/Idle/idle_00.png';
    // setTimeout(() => {

    //     ctx.drawImage(character, -75, -50, 225, 200);
    // }, 2000);
}