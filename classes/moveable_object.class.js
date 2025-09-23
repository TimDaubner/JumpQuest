class MovableObject {
    posX = 0;
    posY = 0;
    img;
    imgCache = {};
    speed = 0.15;
    isMirrored = false;

    acceleration = 0.15;
    speedY = 0;
    isGrounded = false;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.posY -= this.speedY;
                this.speedY -= this.acceleration;
                this.isGrounded = false;
            }
            else {
                this.isGrounded = true;
            }
        }, 1000 / 25)
    }

    isAboveGround() {
        return this.posY < 22;
    }

    loadImg(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImgs(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imgCache[path] = img;
        });
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

    jump() {
        this.speedY = 5;
    }
}