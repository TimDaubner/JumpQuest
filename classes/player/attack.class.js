class Attack extends DrawableObject {

    posX = 0;
    posY = 0;
    img;
    imgCache = {};
    width = 20;
    height = 20;
    offset = {
        top: 0,
        left: 100,
        sizeX: 1,
        sizeY: 1
    }


    IMAGES_ATTACK = [
        './img/Objects/box2.png'
    ]

    constructor(posX, posY) {
        super();
        this.posX = posX;
        this.posY = posY;
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