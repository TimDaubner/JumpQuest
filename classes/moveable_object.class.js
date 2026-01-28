/**
 * Base class for all movable objects in the game.
 * Handles movement, gravity, collisions and animations.
 *
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {
    posX = 0;
    posY = 0;
    img;
    imgCache = {};
    speed = 0.15;
    isMirrored = false;

    acceleration = 0.3;
    speedY = 0;
    isGrounded = false;
    energy = 100;

    lastHit = 0;
    isCurrentHurt = false;
    isReallyDead = false;

    offset = {
        top: 0,
        left: 0,
        sizeX: 1,
        sizeY: 1
    }
    counter = 0;

    /**
     * Applies gravity to the object using a fixed interval.
     */
    applyGravity() {
        intervals.push(setInterval(() => {
            if (isRunning) {
                if (this.isAboveGround() || this.speedY > 0) {
                    this.posY -= this.speedY;
                    this.speedY -= this.acceleration;
                    this.isGrounded = false;
                }
                else {
                    this.isGrounded = true;
                }
            }
        }, 1000 / 25));
    }

    /**
     * Checks whether the object is above ground.
     *
     * @returns {boolean} True if object is above ground
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        }
        else {
            return this.posY < 22;
        }
    }

    /**
     * Moves the object to the right.
     */
    moveRight() {
        this.isMirrored = false;
        this.posX += this.speed;
    }

     /**
     * Moves the object to the left.
     */
    moveLeft() {
        this.isMirrored = true;
        this.posX -= this.speed;
    }

     /**
     * Plays a looping animation.
     *
     * @param {string[]} anim - Array of image paths
     */
    playAnimation(anim) {
        let i = this.currentImg % anim.length;
        let path = anim[i];
        this.img = this.imgCache[path];
        this.currentImg++;
    }

    /**
     * Plays a death animation once.
     *
     * @param {string[]} anim - Array of image paths
     */
    playDeathAnimation(anim) {
        let i = this.currentImg % anim.length;
        let path = anim[i];
        this.img = this.imgCache[path];
        if (anim.length - 1 > i)
            this.currentImg++;
    }

     /**
     * Plays an attack animation once.
     *
     * @param {string[]} anim - Array of image paths
     */
    playAttackAnimation(anim) {
        let i = this.currentImg % anim.length;
        let path = anim[i];
        this.img = this.imgCache[path];
        if (anim.length - 1 > i)
            this.currentImg++;
    }

    /**
     * Makes the object jump.
     */
    jump() {
        this.speedY = 5.5;
    }

    /**
     * Handles damage taken by the object.
     */
    gotHit() {
        this.energy -= 10;

        if (this.energy < 0) {
            this.energy = 0;
        }
        else {
            let rnd = Math.round(Math.random());
            SoundHub.playOne(SoundHub.NOISE[rnd]);
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks whether the object is currently hurt.
     *
     * @returns {boolean} True if object was hit recently
     */
    isHurt() {
        let timespan = new Date().getTime() - this.lastHit;
        timespan /= 1000;
        return timespan < 1;
    }


    /**
     * Checks whether the object is dead.
     *
     * @returns {boolean} True if energy is zero
     */
    isDead() {
        return this.energy == 0;
    }

     /**
     * Checks collision with another movable object.
     *
     * @param {MovableObject} mo - Other movable object
     * @returns {boolean} True if objects are colliding
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