let canvas;
let overlay;
let world;
let controller = new Controller();
let isRunning = false;
let intervals = [];
let isFullscreen = false;
let isSoundOn = true;

function init() {
    canvas = document.getElementById('canvas');
    overlay = document.getElementById('landscape-protection');
    if (isProbablyMobile()) {
        document.getElementById('h1').classList.add('d_none');
        if (screen.orientation.angle === 0) {
            overlay.classList.remove('d_none');
        }
        else {
            overlay.classList.add('d_none');
        }
    }
    getSoundForAllBtns();
}

function isProbablyMobile() {
    return (
        'ontouchstart' in window || navigator.maxTouchPoints > 0
    ) && window.innerWidth < 900;
}

function getSoundForAllBtns() {
    let buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener("click", function () {
            SoundHub.playOne(SoundHub.BUTTON);
            button.blur();
        });
    });
}

function runGame() {
}

function startGame() {
    let menu = document.getElementById('burgermenu');
    menu.classList.remove('d_none');
    SoundHub.playLoop(SoundHub.BACKGROUND);
    canvas.classList.add('black');
    canvas.width = 720 * 2;
    canvas.height = 480 * 2;
    document.getElementById('container').classList.add('d_none');
    world = new World(canvas, controller);
    posX = world.character.posX;
    posY = world.character.posY;
    isRunning = true;
    spawnEnemy();
}

function openInstructions() {
    document.getElementById('instructions').classList.remove('d_none');
}

function closeInstructions() {
    document.getElementById('instructions').classList.add('d_none');
}

function exitGame() {
}

document.addEventListener('fullscreenchange', fullscreenHandler);
document.addEventListener('webkitfullscreenchange', fullscreenHandler);
document.addEventListener('mozfullscreenchange', fullscreenHandler);
document.addEventListener('MSFullscreenChange', fullscreenHandler);

function fullscreenHandler() {
    if (document.fullscreenElement === canvas) {
        isFullscreen = true;
        add_D_None();
        canvas.style.borderRadius = '0';
        canvas.width = screen.width * 2;
        canvas.height = screen.height * 2;
        world.ctx.scale(14, 14);
    } else {
        isFullscreen = false;
        canvas.width = 720 * 2;
        canvas.height = 480 * 2;
        world.ctx.scale(6.2, 6.2);
        remove_D_None();
    }
}

function add_D_None() {
    document.getElementById('upper_right').classList.add('d_none');
    document.getElementById('container').classList.add('d_none');
    document.getElementById('h1').classList.add('d_none');
}

function remove_D_None() {
    document.getElementById('upper_right').classList.remove('d_none');
    document.getElementById('h1').classList.remove('d_none');
}

function fullscreenMode() {
    if (!isFullscreen) {
        canvas.style.borderRadius = '0';
        canvas.requestFullscreen().catch(err => {
            console.error("Failed to enter fullscreen:", err);
        });
    } else {
        document.exitFullscreen();
    }
}

screen.orientation.addEventListener('change', () => {
    if (screen.orientation.type == 'landscape-primary') {
        overlay.classList.add('d_none');
    }
    else {
        overlay.classList.remove('d_none');
    }
});

//TODO-JSDOCS
//TODO-Responsive / Mobile

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
        controller.ATTACK = true;
    }
    if (event.key === 'shift' || event.keyCode === 16) {
        controller.RUN = true;
    }
    if (event.key === 'b') {
        controller.BUY = true;
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
        controller.ATTACK = false;
    }
    if (event.key === 'shift' || event.keyCode === 16) {
        controller.RUN = false;
    }
    if (event.key === 'b') {
        controller.BUY = false;
    }
});