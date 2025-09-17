class BackgroundObject extends MovableObject {
    width = 720 / 2.4;
    height = 480 / 3.2;
    constructor(imgPath, posX, posY) {
        super().loadImg(imgPath);
        this.posX = posX;
        this.posY = posY;
    }
}