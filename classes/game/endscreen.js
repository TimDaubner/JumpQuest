class EndScreen extends DrawableObject {
    IMAGE_GAME = [
        './img/GUI/PNG/You_Win/Header.png',
        './img/GUI/PNG/You_Lose/Header.png',
    ];

    constructor(posX, posY, img) {
        super();
        this.loadImg(this.IMAGE_GAME[img]);
        this.posX = posX;
        this.posY = posY;
        this.width = 60;
        this.height = 20;
    }
}