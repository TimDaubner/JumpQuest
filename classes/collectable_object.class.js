/**
 * Represents a collectable object in the game
 * (e.g. coin, sprayer, crystal, key, heart).
 *
 * @extends MovableObject
 */
class CollectableObject extends MovableObject {
    id;
    IMAGE_COLLECTABLE = [
        './img/Objects/coin.png',
        './img/Objects/sprayer.png',
        './img/Objects/crystal.png',
        './img/Objects/key.png',
        './img/Objects/heart.png'
    ];

    /**
     * Creates a new collectable object at a random position offset.
     *
     * @param {number} posX - Base X position
     * @param {number} posY - Base Y position
     * @param {number} img - Index of the collectable image
     */
    constructor(posX, posY, img) {
        super();
        this.id = img;
        this.loadImg(this.IMAGE_COLLECTABLE[img]);
        this.posX = posX;
        this.posX += Math.random() * 2500;
        this.posY = posY;
        this.posY += (Math.random() * 100) + 20;
        this.checkSprayer(img);
        this.height = 10;
    }

    /**
     * Adjusts the width depending on the collectable type.
     *
     * @param {number} img - Index of the collectable image
     */
    checkSprayer(img) {
        if (img === 1) {
            this.width = 7;
        }
        else {
            this.width = 10;
        }
    }
}