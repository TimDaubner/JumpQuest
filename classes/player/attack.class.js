/**
 * Represents an attack hitbox.
 * Used to detect collisions during an attack action.
 *
 * @extends DrawableObject
 */
class Attack extends DrawableObject {

    posX = 0;
    posY = 0;
    img;
    imgCache = {};
    width = 20;
    height = 20;
    offset = {
        top: 0,
        left: 100,
        sizeX: 1,
        sizeY: 1
    }


    IMAGES_ATTACK = [
        './img/Objects/box2.png'
    ]

    /**
     * Creates a new attack hitbox at the given position.
     *
     * @param {number} posX - X position of the attack
     * @param {number} posY - Y position of the attack
     */
    constructor(posX, posY) {
        super();
        this.posX = posX;
        this.posY = posY;
    }

    /**
     * Checks collision with another movable object.
     *
     * @param {MovableObject} mo - Object to check collision with
     * @returns {boolean} True if colliding
     */
    isColliding(mo) {
        const thisLeft = this.posX + this.offset.left;
        const thisRight = thisLeft + this.width / this.offset.sizeX;
        const thisTop = this.posY + this.offset.top;
        const thisBottom = thisTop + this.height / this.offset.sizeY;

        const otherLeft = mo.posX + mo.offset.left;
        const otherRight = otherLeft + mo.width / mo.offset.sizeX;
        const otherTop = mo.posY + mo.offset.top;
        const otherBottom = otherTop + mo.height / mo.offset.sizeY;

        return (
            thisRight > otherLeft &&
            thisLeft < otherRight &&
            thisBottom > otherTop &&
            thisTop < otherBottom
        );
    }
}