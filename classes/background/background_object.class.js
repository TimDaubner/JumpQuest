class BackgroundObject extends MovableObject {
    posX = 0;
    posY = 0;
    width = 300;
    height = 155;
    constructor(imgPath) {
        super().loadImg(imgPath);
    }
}