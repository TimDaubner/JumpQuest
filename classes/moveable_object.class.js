class MovableObject extends DrawableObject {
    posX = 0;
    posY = 0;
    img;
    imgCache = {};
    speed = 0.15;
    isMirrored = false;

    acceleration = 0.15;
    speedY = 0;
    isGrounded = false;
    energy = 10;

    lastHit = 0;
    isCurrentHurt = false;
    isReallyDead = false;

    offset = {
        top: 0,
        left: 0,
        sizeX: 1,
        sizeY: 1
    }

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

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        }
        else {
            return this.posY < 22;
        }
    }

    moveRight() {
        this.isMirrored = false;
        this.posX += this.speed;
    }

    moveLeft() {
        this.isMirrored = true;
        this.posX -= this.speed;
    }

    playAnimation(anim) {
        let i = this.currentImg % anim.length;
        let path = anim[i];
        this.img = this.imgCache[path];
        this.currentImg++;
    }

    playDeathAnimation(anim) {
        let i = this.currentImg % anim.length;
        let path = anim[i];
        this.img = this.imgCache[path];
        if (anim.length - 1 > i)
            this.currentImg++;
    }

    jump() {
        this.speedY = 4.5;
    }

    gotHit() {
        this.energy -= 10;
        // console.log(this.energy);
        if (this.energy < 0) {
            this.energy = 0;
        }
        else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timespan = new Date().getTime() - this.lastHit;
        timespan /= 1000;
        return timespan < 1;
    }

    isDead() {
        return this.energy == 0;
    }

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