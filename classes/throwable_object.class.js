class ThrowableObject extends MovableObject {
    posX = 20;
    posY = 50;
    img;
    imgCache = {};
    width = 50;
    height = 50;
    speedY = 0;
    // speed = 0.15;
    // isMirrored = false;

    // acceleration = 0.15;
    // speedX = 0;
    // isGrounded = false;
    // energy = 100;

    // lastHit = 0;
    // isCurrentHurt = false;

    // offset = {
    //     top: 0,
    //     left: 0,
    //     sizeX: 1,
    //     sizeY: 1
    // }

    IMAGES_RANGEATTACK = [
        './img/Objects/box1.png',
    ];

    constructor(posX, posY) {
        super().loadImg(this.IMAGES_RANGEATTACK[0]);
        this.throw(posX + this.posX, posY + this.posY);
    }

    throw(posX, posY) {
        let isDirection = world.character.isMirrored;
        this.posX = posX;
        this.posY = posY;
        this.speedY = 1;
        this.applyGravity();
        if (this.isDead()) return;
        intervals.push(setInterval(() => {
            if (isRunning) {
                if (isDirection) {
                    this.posX -= 1;
                }
                else {
                    this.posX += 1;
                }
            }
        }, 1000 / 60));
    }

    // applyGravity() {
    //     setInterval(() => {
    //         if (this.isAboveGround() || this.speedY > 0) {
    //             this.posY -= this.speedY;
    //             this.speedY -= this.acceleration;
    //             this.isGrounded = false;
    //         }
    //         else {
    //             this.isGrounded = true;
    //         }
    //     }, 1000 / 25)
    // }

    // isAboveGround() {
    //     return this.posY < 22;
    // }

    // moveRight() {
    //     this.isMirrored = false;
    //     this.posX += this.speed;
    // }

    // moveLeft() {
    //     this.isMirrored = true;
    //     this.posX -= this.speed;
    // }

    // playAnimation(anim) {
    //     let i = this.currentImg % anim.length;
    //     let path = anim[i];
    //     this.img = this.imgCache[path];
    //     this.currentImg++;
    // }

    // jump() {
    //     this.speedY = 5;
    // }

    // isColliding(mo) {
    //     return this.posX + this.offset.left + this.width / this.offset.sizeX > mo.posX + mo.offset.left && this.posY + this.offset.top + this.height / this.offset.sizeY > mo.posY + mo.offset.top && this.posX + this.offset.left / 4 < mo.posX + mo.offset.left && this.posY + this.offset.top < mo.posY + mo.offset.top + mo.height / mo.offset.sizeY;
    // }



    //this.posX + this.width = point right point 
    //this.posX = point left point
    //this.posY = point top point 
    //this.posY + this.height = point bottom point 
}