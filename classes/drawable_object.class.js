/**
 * Base class for all drawable objects.
 * Handles image loading and rendering on canvas.
 */
class DrawableObject {
    posX = 0;
    posY = 0;
    width = 0;
    height = 0;
    img;
    imgCache = {};

    /**
     * Loads a single image.
     *
     * @param {string} path - Path to the image
     */
    loadImg(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads multiple images and stores them in the image cache.
     *
     * @param {string[]} arr - Array of image paths
     */
    loadImgs(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imgCache[path] = img;
        });
    }

     /**
     * Draws the object on the canvas.
     *
     * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height);
    }

    /**
     * Draws collision frames for debugging purposes.
     *
     * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
     */
    drawFrame(ctx) {
        if (this instanceof Player || this instanceof Enemy || this instanceof EndBoss) {
            ctx.beginPath();
            ctx.lineWidth = 0.5;
            ctx.strokeStyle = 'red';
            ctx.rect(this.posX + this.offset.left, this.posY + this.offset.top, this.width / this.offset.sizeX, this.height / this.offset.sizeY);
            ctx.stroke();
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'green';
            ctx.rect(this.posX, this.posY, this.width, this.height);
            ctx.stroke();
        }
    }
}