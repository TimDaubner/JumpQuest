/**
 * Represents a throwable object (e.g. a fireball).
 * @extends MovableObject
 */
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

    /**
     * Creates a new throwable object and starts the throw animation.
     *
     * @param {number} posX - X position of the character
     * @param {number} posY - Y position of the character
     */
    constructor(posX, posY) {
        super().loadImg(this.IMAGES_RANGEATTACK[0]);
        this.throw(posX + this.posX, posY + this.posY);
        world.character.endurance -= 100;
    }

     /**
     * Throws the object from a given position.
     *
     * @param {number} posX - Start X position
     * @param {number} posY - Start Y position
     */
    throw(posX, posY) {
        let isDirection = world.character.isMirrored;
        this.posX = posX;
        this.posY = posY;
        this.speedY = 0.5;
        this.applyGravity();
        if (this.isDead()) return;
        this.throwDirection(isDirection);
    }

    /**
     * Handles the horizontal movement of the thrown object.
     *
     * @param {boolean} isDirection - Whether the object is thrown to the left
     */
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