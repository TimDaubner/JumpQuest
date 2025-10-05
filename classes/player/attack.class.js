class Attack extends DrawableObject {
    //TODO - Punch Attack

    posX = 20;
    posY = 40;
    img;
    imgCache = {};
    width = 100;
    height = 100;

    IMAGES_ATTACK = [
        './img/Objects/box2.png'
    ]

    constructor() {
        super().loadImg(this.IMAGES_ATTACK[0]);
        this.loadImg(this.img);
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