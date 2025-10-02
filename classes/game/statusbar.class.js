class Statusbar extends DrawableObject {
    IMAGE_BARS = [
        './img/GUI/PNG/Loading_Bar/Loading_Bar_1_2.png',
        './img/GUI/PNG/Loading_Bar/Loading_Bar_2_2.png',
        './img/GUI/PNG/Loading_Bar/Loading_Bar_3_2.png',
        './img/Objects/heart.png',
        './img/Objects/coin.png',
        './img/Objects/crystal.png',
        './img/Objects/key.png',
        './img/Objects/sprayer.png',
    ];

    percentage = 100;

    constructor(posX, posY, img, percentage) {
        super();
        this.loadImg(this.IMAGE_BARS[img]);
        this.posX = posX;
        this.posY = posY;
        this.width = percentage;
        this.height = 10;
    }

    setPercentage(percentage) {
        this.width = percentage;
    }
}