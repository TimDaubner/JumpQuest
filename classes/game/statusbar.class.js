/**
 * Represents a status bar (health, energy, coins, boss HP, etc.).
 *
 * @extends DrawableObject
 */
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
        './img/GUI/PNG/Main_UI/Boss_HP_Bar_2.png'
    ];

    percentage = 100;

    /**
     * Creates a new status bar.
     *
     * @param {number} posX - X position of the status bar
     * @param {number} posY - Y position of the status bar
     * @param {number} img - Index of the image to display
     * @param {number} percentage - Initial fill percentage (width)
     */
    constructor(posX, posY, img, percentage) {
        super();
        this.loadImg(this.IMAGE_BARS[img]);
        this.posX = posX;
        this.posY = posY;
        this.width = percentage;
        this.height = this.checkHeight(img);
    }

    /**
     * Updates the width of the status bar.
     *
     * @param {number} percentage - New width percentage
     */
    setPercentage(percentage) {
        this.width = percentage;
    }

    /**
     * Determines the height of the status bar based on image type.
     *
     * @param {number} img - Index of the image
     * @returns {number} Height of the status bar
     */
    checkHeight(img) {
        if ('./img/Objects/heart.png' === this.IMAGE_BARS[img] || './img/Objects/coin.png' === this.IMAGE_BARS[img] || './img/Objects/sprayer.png' === this.IMAGE_BARS[img]) {
            return 10;
        }
        else {
            return 5;
        }
    }
}