let canvas;
let overlay;
let world;
let controller = new Controller();
let isRunning = false;
let intervals = [];
let isFullscreen = false;
let isSoundOn = true;

let btn_controller;
let leftBtn;
let rightBtn;
let jumpBtn;
let fireBtn;
let buyBtn;

let moveLeft = false;
let moveRight = false;

/**
 * Initializes the game canvas, overlay, and button handlers.
 */
function init() {
    canvas = document.getElementById('canvas');
    overlay = document.getElementById('landscape-protection');
    btn_controller = document.getElementById('btn_controller');
    if (isProbablyMobile()) {
        if (screen.orientation.angle === 0) {
            overlay.classList.remove('d_none');
        }
        else {
            overlay.classList.add('d_none');
        }
    }
    getSoundForAllBtns();
}

/**
 * Detects if the current device is likely a mobile device.
 * @returns {boolean} True if mobile, false otherwise
 */
function isProbablyMobile() {
    return (
        'ontouchstart' in window || navigator.maxTouchPoints > 0
    ) && window.innerWidth < 900;
}

/**
 * Attaches click sounds to all buttons.
 */
function getSoundForAllBtns() {
    let buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener("click", function () {
            SoundHub.playOne(SoundHub.BUTTON);
            button.blur();
        });
    });
}

/**
 * Starts the game: initializes canvas, world, spawns enemies, and handles sound.
 */
function startGame() {
    document.getElementById('h1').classList.add('d_none');
    let menu = document.getElementById('burgermenu');
    menu.classList.remove('d_none');
    canvas.classList.add('black');
    canvas.width = 720 * 2;
    canvas.height = 480 * 2;
    document.getElementById('container').classList.add('d_none');
    world = new World(canvas, controller);
    posX = world.character.posX;
    posY = world.character.posY;
    isRunning = true;
    spawnEnemy();
    if (localStorage.getItem("cacheSound")) {
        const cacheSound = JSON.parse(localStorage.getItem("cacheSound"));
        if (!cacheSound) {
            SoundHub.pauseAll();
            this.toggleSoundImg();
        }
        else {
            SoundHub.playLoop(SoundHub.BACKGROUND);
        }
    }
    addBtnRefs();
}

/**
 * Opens the instructions overlay.
 */
function openInstructions() {
    document.getElementById('instructions').classList.remove('d_none');
}

/**
 * Closes the instructions overlay.
 */
function closeInstructions() {
    document.getElementById('instructions').classList.add('d_none');
}

document.addEventListener('fullscreenchange', fullscreenHandler);
document.addEventListener('webkitfullscreenchange', fullscreenHandler);
document.addEventListener('mozfullscreenchange', fullscreenHandler);
document.addEventListener('MSFullscreenChange', fullscreenHandler);

/**
 * Handles fullscreen toggle events.
 */
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

/**
 * Adds the 'd_none' class to hide UI elements for fullscreen mode.
 */
function add_D_None() {
    document.getElementById('upper_right').classList.add('d_none');
    document.getElementById('container').classList.add('d_none');
    document.getElementById('h1').classList.add('d_none');
}

/**
 * Removes the 'd_none' class to show UI elements after exiting fullscreen.
 */
function remove_D_None() {
    document.getElementById('upper_right').classList.remove('d_none');
    document.getElementById('h1').classList.remove('d_none');
}

/**
 * Enters or exits fullscreen mode.
 */
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
    if (screen.orientation.type == 'landscape-primary' || screen.width > 1400) {
        overlay.classList.add('d_none');
    }
    else {
        overlay.classList.remove('d_none');
    }
});

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

function moveLeftDown() {
    console.log("Go Left");

    controller.LEFT = true;
}

function moveLeftUp() {
    console.log("Stop Go Left");
    controller.LEFT = false;
}

/**
 * Adds touch event listeners for mobile buttons to control the player.
 */
function addBtnRefs() {
    btn_controller.classList.remove('d_none');
    leftBtn = document.getElementById("leftBtn");
    rightBtn = document.getElementById("rightBtn");
    sprintBtn =document.getElementById("sprintBtn");
    jumpBtn = document.getElementById("jumpBtn");
    fireBtn = document.getElementById("fireBtn");
    buyBtn = document.getElementById("fireBtn");

    leftBtn.addEventListener("touchstart", e => {
        e.preventDefault();
        controller.LEFT = true;
    });

    leftBtn.addEventListener("touchend", () => {
        controller.LEFT = false;
    });

    leftBtn.addEventListener("touchcancel", () => {
        controller.LEFT = false;
    });

    rightBtn.addEventListener("touchstart", e => {
        e.preventDefault();
        controller.RIGHT = true;
    });

    rightBtn.addEventListener("touchend", () => {
        controller.RIGHT = false;
    });

    rightBtn.addEventListener("touchcancel", () => {
        controller.RIGHT = false;
    });

    sprintBtn.addEventListener("touchstart",e => {
        if(!controller.RUN){
            sprintBtn.classList.add('invert');
            controller.RUN = true;
        }
        else{
            sprintBtn.classList.remove('invert');
            controller.RUN = false;
        }
    });

    jumpBtn.addEventListener("touchstart", () => {
        controller.JUMP = true;
    });

    jumpBtn.addEventListener("touchend", () => {
        setTimeout(() => {
            controller.JUMP = false;
        }, 100);
    });

    jumpBtn.addEventListener("touchcancel", () => {
        controller.JUMP = false;
    });

    fireBtn.addEventListener("touchstart", () => {
        controller.ATTACK = true;
    });
    fireBtn.addEventListener("touchend", () => {
        setTimeout(() => {
            controller.ATTACK = false;
        }, 100);
    });

    fireBtn.addEventListener("touchcancel", () => {
        controller.ATTACK = false;
    });

    buyBtn.addEventListener("touchstart", () => {
        controller.BUY = true;
    });

    buyBtn.addEventListener("touched", () => {
        controller.BUY = false;
    });
    buyBtn.addEventListener("touchcancel", () => {
        controller.BUY = false;
    });
}

