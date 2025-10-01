class Statusbar extends DrawableObject {
    IMAGE_BARS = [
        './img/GUI/PNG/Loading_Bar/Loading_Bar_1_2.png',
        './img/GUI/PNG/Loading_Bar/Loading_Bar_2_2.png',
        './img/GUI/PNG/Loading_Bar/Loading_Bar_3_2.png'
    ];

    percentage = 100;

    constructor(posY, img, percentage) {
        super();
        this.loadImg(this.IMAGE_BARS[img]);
        this.posX = 10;
        this.posY = posY;
        this.width = percentage;
        this.height = 10;
    }

    setPercentage(percentage) {
        this.width = percentage;
    }
}