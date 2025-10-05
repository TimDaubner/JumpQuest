class BackgroundObject extends MovableObject {
    width = 720 / 2.4;
    height = 480 / 3.2;
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