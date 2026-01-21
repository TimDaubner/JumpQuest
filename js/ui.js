let isOpen = false;

function openMenu(event) {
    event.stopPropagation();
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
        document.getElementById('pause').innerHTML = 'run';
    }
    else {
        isRunning = true;
        document.getElementById('pause').innerHTML = 'pause';
    }
}