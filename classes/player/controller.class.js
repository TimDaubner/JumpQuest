let posX;
let posY;
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
    world.character.posX = posX;
    world.character.posY = posY;
});