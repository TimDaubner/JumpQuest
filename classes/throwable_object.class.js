class ThrowableObject extends MovableObject {
    posX = 30;
    posY = 65;
    img;
    imgCache = {};
    width = 50;
    height = 50;
    speedY = 0;

    IMAGES_RANGEATTACK = [
        './img/Fireball/flame10/PNG/08.png',
    ];

    constructor(posX, posY) {
        super().loadImg(this.IMAGES_RANGEATTACK[0]);
        this.throw(posX + this.posX, posY + this.posY);
        world.character.endurance -= 100;
    }

    throw(posX, posY) {
        let isDirection = world.character.isMirrored;
        this.posX = posX;
        this.posY = posY;
        this.speedY = 0.5;
        this.applyGravity();
        if (this.isDead()) return;
        this.throwDirection(isDirection);
    }

    throwDirection(isDirection) {
        intervals.push(setInterval(() => {
            if (isRunning) {
                if (isDirection) {
                    this.isMirrored = true;
                    this.posX -= 3;
                }
                else {
                    this.isMirrored = false;
                    this.posX += 3;
                }
            }
        }, 1000 / 60));
    }
}