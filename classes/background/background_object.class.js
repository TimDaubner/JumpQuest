/**
 * Represents a background element in the game.
 * Can be static or moving left/right for parallax effects.
 *
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {
    width = 720 / 2.4;
    height = 480 / 3.2;

    /**
     * Creates a new background object.
     * @param {string} imgPath - Path to the image
     * @param {number} posX - Initial X position
     * @param {number} posY - Initial Y position
     * @param {boolean} isMoving - Whether the object moves horizontally
     * @param {"left"|"right"|null} direction - Direction of movement if moving
     * @param {number} speed - Movement speed
     */
    constructor(imgPath, posX, posY, isMoving, direction, speed) {
        super().loadImg(imgPath);
        this.posX = posX;
        this.posY = posY;
        this.speed = speed;
        if (isMoving) {
            if (direction === "right") {
                this.moveRight(300);
            }
            if (direction === "left") {
                this.moveLeft(300);
            }
        }
    }

    /**
     * Moves the background object to the left continuously.
     * Wraps around when reaching the given width.
     * @param {number} width - Width after which the object wraps
     */
    moveLeft(width) {
        intervals.push(setInterval(() => {
            if (isRunning) {
                if (this.posX <= -width) {
                    this.posX = width - 1 + this.posX;
                }
                this.posX -= this.speed;
            }
        }, 1000 / 60));
    }

    moveRight(width) {
        intervals.push(setInterval(() => {
            if (isRunning) {
                if (this.posX >= width) {
                    this.posX = -width + 1 + this.posX;

                }
                this.posX += this.speed;
            }
        }, 1000 / 60));
    }


}