class CollectableObject extends MovableObject {
    id;
    IMAGE_COLLECTABLE = [
        './img/Objects/coin.png',
        './img/Objects/sprayer.png',
        './img/Objects/crystal.png',
        './img/Objects/key.png',
        './img/Objects/heart.png'
    ];

    constructor(posX, posY, img) {
        super();
        this.id = img;
        this.loadImg(this.IMAGE_COLLECTABLE[img]);
        this.posX = posX;
        this.posX += Math.random() * 2500;
        this.posY = posY;
        this.posY += (Math.random() * 100) +20 ;
        this.checkSprayer(img);
        this.height = 10;
    }

    checkSprayer(img) {
        if (img === 1) {
            this.width = 7;
        }
        else {
            this.width = 10;
        }
    }
}