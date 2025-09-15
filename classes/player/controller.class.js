let posX = 1;
let posY = 1;
speed = 2.0;

document.addEventListener('keydown', function (event) {
    let player = document.getElementById('player');
    if (event.key == 'Shift') {
        speed = 2.0;
    }
    else {
        speed = 1;
    }
    if (event.key == 'a') {
        posX -= 10 * speed;
    }
    if (event.key == 'd') {
        posX += 10 * speed;
    }
    if (event.key == 'w') {
        posY -= 10.0;
    }
    if (event.key == 's') {
        posY += 10.0;
    }
    player.style.transform = `translate(${posX}px, ${posY}px)`;
});