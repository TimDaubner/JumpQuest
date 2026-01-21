let isOpen = false;

function openMenu(event) {
    if (event != null) {
        event.stopPropagation();
    }
    let burgerimg = document.getElementById('burgermenu').firstChild;
    let menu = document.getElementById('menu');
    if (!isOpen) {
        burgerimg.src = './img/GUI/PNG/google/menu_open.svg';
        isOpen = true;
        menu.classList.remove('d_none');
    }
    else {
        burgerimg.src = './img/GUI/PNG/google/menu.svg';
        isOpen = false;
        menu.classList.add('d_none');
    }
}

function pauseGame() {
    if (isRunning) {
        isRunning = false;
        document.getElementById('pause').innerHTML = `run <img src="./img/GUI/PNG/google/play.svg" alt="run">`;
    }
    else {
        isRunning = true;
        document.getElementById('pause').innerHTML = `pause <img src="./img/GUI/PNG/google/pause.svg" alt="pause">`;
    }
}

function restartGame() {
    openMenu();
    if (!isRunning) {
        isRunning = true;
        document.getElementById('pause').innerHTML = `pause <img src="./img/GUI/PNG/google/pause.svg" alt="pause">`;
    }
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
    if (SoundHub.isSoundOn) {
        SoundHub.isSoundOn = false;
        document.getElementById('soundBtn').innerHTML = `sound off <img src="./img/GUI/PNG/google/sound_off.svg" alt="run">`;
    }
}

function soundToggle() {
    SoundHub.pauseAll();
}

document.getElementById('soundBtn').addEventListener('click', () => {
    SoundHub.pauseAll();
    this.toggleSoundImg();
});

function toggleSoundImg() {
    if (SoundHub.isSoundOn) {
        SoundHub.isSoundOn = false;
        document.getElementById('soundBtn').innerHTML = `sound off <img src="./img/GUI/PNG/google/sound_off.svg" alt="run">`;
    }
    else {
        SoundHub.isSoundOn = true;
        document.getElementById('soundBtn').innerHTML = `sound on <img src="./img/GUI/PNG/google/sound_on.svg" alt="pause">`;
    }
}