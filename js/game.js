let canvas;
let world;
let controller = new Controller();

function init() {
    canvas = document.getElementById('canvas');

    canvas.width = 720 * 2;
    canvas.height = 480 * 2;
    canvas.style.width = "720px";
    canvas.style.height = "480px";
    // character.src = '../img/Player_Anim/Idle/idle_00.png';
    // setTimeout(() => {

    //     ctx.drawImage(character, -75, -50, 225, 200);
    // }, 2000);
}

function startGame() {
    document.getElementById('container').classList.add('d_none');
    world = new World(canvas, controller);
    posX = world.character.posX
    posY = world.character.posY
}

//Controller for Player
document.addEventListener('keydown', (event) => {
    if (event.key === 'w' || event.keyCode === 86) {
        controller.UP = true;
    }
    if (event.key === 's' || event.keyCode === 83) {
        controller.DOWN = true;
    }
    if (event.key === 'a' || event.keyCode === 65) {
        controller.LEFT = true;
    }
    if (event.key === 'd' || event.keyCode === 68) {
        controller.RIGHT = true;
    }
    if (event.key === ' ' || event.keyCode === 32) {
        controller.JUMP = true;
    }
    if (event.key === 'e' || event.keyCode === 69) {
        controller.THROW = true;
    }
    if (event.key === 'shift' || event.keyCode === 16) {
        controller.RUN = true;
    }
});
document.addEventListener('keyup', (event) => {
    if (event.key === 'w' || event.keyCode === 86) {
        controller.UP = false;
    }
    if (event.key === 's' || event.keyCode === 83) {
        controller.DOWN = false;
    }
    if (event.key === 'a' || event.keyCode === 65) {
        controller.LEFT = false;
    }
    if (event.key === 'd' || event.keyCode === 68) {
        controller.RIGHT = false;
    }
    if (event.key === ' ' || event.keyCode === 32) {
        controller.JUMP = false;
    }
    if (event.key === 'e' || event.keyCode === 69) {
        controller.THROW = false;
    }
    if (event.key === 'shift' || event.keyCode === 16) {
        controller.RUN = false;
    }
});