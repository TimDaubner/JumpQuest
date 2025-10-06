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
        this.posY += Math.random() * 75 - 1;
        this.width = 10;
        this.height = 10;
    }
    //  constructor() {
    //         super().loadImg('./img/Enemy_Anim/Idle/idle_r_00.png');
    //         this.loadImgs(this.IMAGES_WALKING);
    //         this.animate();

    //         this.posX = 300;
    //         this.posX += Math.random() * 10;
    //         this.posY = 60;
    //         this.speed = 0.15 + Math.random() * 0.25;
    //     }

}