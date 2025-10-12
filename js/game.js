let canvas;
let world;
let controller = new Controller();
let isRunning = false;
let intervals = [];
let isFullscreen = false;
let isSoundOn = true;



function init() {
    canvas = document.getElementById('canvas');

    let buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener("click", function () {
            SoundHub.playOne(SoundHub.BUTTON);
        });
    });
}

function pauseGame() {
    isRunning = false;
}

function runGame() {
    isRunning = true;
}

function startGame() {
    SoundHub.playLoop(SoundHub.BACKGROUND);
    canvas.classList.add('black');
    canvas.width = 720 * 2;
    canvas.height = 480 * 2;
    // canvas.style.width = "720px";
    // canvas.style.height = "480px";
    document.getElementById('container').classList.add('d_none');
    world = new World(canvas, controller);
    posX = world.character.posX;
    posY = world.character.posY;
    isRunning = true;
    spawnEnemy();
}

function restartGame() {
    SoundHub.stopAllSounds();
    isSoundOn = true;
    isRunning = false;
    intervals.forEach(interval => {
        clearInterval(interval);
    });
    world = null;
    canvas = null;
    canvas = document.getElementById('canvas');

    controller = new Controller();
    startGame();
}
function openSettings() {
    console.log("Volume settings, credits and controls for game");
}

function exitGame() {
    console.log("exit game");
}

document.addEventListener('fullscreenchange', fullscreenHandler);
document.addEventListener('webkitfullscreenchange', fullscreenHandler);
document.addEventListener('mozfullscreenchange', fullscreenHandler);
document.addEventListener('MSFullscreenChange', fullscreenHandler);

function fullscreenHandler() {
    if (document.fullscreenElement === canvas) {
        console.log("ENTER FULLSCREEN");
        isFullscreen = true;
        document.getElementById('upper_right').classList.add('d_none');
        document.getElementById('container').classList.add('d_none');
        document.getElementById('maintext').classList.add('d_none');
        document.getElementById('canvas_outerframe').classList.add('d_none');
        canvas.style.borderRadius = '0';
        canvas.width = screen.width * 2;
        canvas.height = screen.height * 2;
        world.ctx.scale(14, 14);
    } else {
        console.log("EXIT FULLSCREEN");
        isFullscreen = false;
        canvas.width = 720 * 2;
        canvas.height = 480 * 2;
        world.ctx.scale(6.2, 6.2);
        document.getElementById('upper_right').classList.remove('d_none');
        // document.getElementById('container').classList.remove('d_none');
        document.getElementById('maintext').classList.remove('d_none');
        document.getElementById('canvas_outerframe').classList.remove('d_none');
    }
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

//TODO-MenuHandling
//TODO-Responsive
//TODO-JSDOCS
//TODO-Responsive / Mobile

function soundToggle() {
    SoundHub.pauseAll();
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
    if (event.key === 'e' && 'shift' || event.keyCode === 69 && event.keyCode === 16) {
        controller.ATTACK = true;
    }
    else if (event.key === 'e' && event.key !== 'shift' || event.keyCode === 69 && event.keyCode !== 16) {
        controller.THROW = true;
    }
    else if (event.key === 'shift' || event.keyCode === 16) {
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
    if (event.key === 'e' && 'shift' || event.keyCode === 69 && event.keyCode === 16) {
        controller.ATTACK = false;
    }
    else if (event.key === 'e' || event.keyCode === 69) {
        controller.THROW = false;
    }
    else if (event.key === 'shift' || event.keyCode === 16) {
        controller.RUN = false;
    }
    if (event.key === 'b') {
        controller.BUY = false;
    }
});