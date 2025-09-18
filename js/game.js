let canvas;
let world;
let controller = new Controller();

function init() {
    canvas = document.getElementById('canvas');
    // TODO - scaling objects
    // canvas.width = 720 * 2;
    // canvas.height = 480 * 2;
    // canvas.style.width = "720px";
    // canvas.style.height = "480px";
    world = new World(canvas, controller);
    posX = world.character.posX
    posY = world.character.posY


    // character.src = '../img/Player_Anim/Idle/idle_00.png';
    // setTimeout(() => {

    //     ctx.drawImage(character, -75, -50, 225, 200);
    // }, 2000);
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'w' || event.keyCode === 86) {
        controller.UP = true;
        console.log("W " + controller.UP);
    }
    if (event.key === 's' || event.keyCode === 83) {
        controller.DOWN = true;
        console.log("S");
    }
    if (event.key === 'a' || event.keyCode === 65) {
        controller.LEFT = true;
        console.log("A");
    }
    if (event.key === 'd' || event.keyCode === 68) {
        controller.RIGHT = true;
        console.log("D");
    }
    if (event.key === ' ' || event.keyCode === 32) {
        controller.JUMP = true;
        console.log("Space");
    }
    if (event.key === 'e' || event.keyCode === 69) {
        controller.THROW = true;
        console.log("E");
    }
});
document.addEventListener('keyup', (event) => {
    console.log(event);
    if (event.key === 'w' || event.keyCode === 86) {
        controller.UP = false;
        console.log("W " + controller.UP);
    }
    if (event.key === 's' || event.keyCode === 83) {
        controller.DOWN = false;
        console.log("S");
    }
    if (event.key === 'a' || event.keyCode === 65) {
        controller.LEFT = false;
        console.log("A");
    }
    if (event.key === 'd' || event.keyCode === 68) {
        controller.RIGHT = false;
        console.log("D");
    }
    if (event.key === ' ' || event.keyCode === 32) {
        controller.JUMP = false;
        console.log("Space");
    }
    if (event.key === 'e' || event.keyCode === 69) {
        controller.THROW = false;
        console.log("E");
    }
});