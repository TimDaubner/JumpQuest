class Attack extends DrawableObject {
    width = 100;
    height = 100;
    img = './img/Objects/box2.png'
    offset = {
        top: 0,
        left: 50,
        sizeX: 1,
        sizeY: 1
    }
    constructor() {
        super();
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