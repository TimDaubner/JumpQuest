/**
 * Represents an end-of-level screen (win or lose).
 *
 * @extends DrawableObject
 */
class EndScreen extends DrawableObject {
    IMAGE_GAME = [
        './img/GUI/PNG/You_Win/Header.png',
        './img/GUI/PNG/You_Lose/Header.png',
    ];

    /**
    * Creates a new end screen at the given position.
    *
    * @param {number} posX - X position of the end screen
    * @param {number} posY - Y position of the end screen
    * @param {number} img - Index of the image to display (0 = win, 1 = lose)
    */
    constructor(posX, posY, img) {
        super();
        this.loadImg(this.IMAGE_GAME[img]);
        this.posX = posX;
        this.posY = posY;
        this.width = 60;
        this.height = 20;
    }
}