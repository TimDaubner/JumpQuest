/**
 * Represents a cloud in the background.
 * Clouds move continuously to the left and loop around for parallax effect.
 *
 * @extends MovableObject
 */
class Cloud extends MovableObject {
    width = 300;
    height = 100;
    speed = 0.15;

    /**
     * Creates a new cloud.
     * @param {number} posX - Initial X position of the cloud
     */
    constructor(posX) {
        super().loadImg('./img/Background_City/city 1/3_clouds.png');
        this.posX = posX;
        this.animate();
    }

    /**
     * Animates the cloud movement to the left.
     * When it moves past -297, it wraps around to 600 for a looping effect.
     */
    animate() {
        intervals.push(setInterval(() => {
            if (isRunning) {

                if (this.posX <= -297) {
                    this.posX = 600;
                }
                this.posX -= this.speed;
            }
        }, 1000 / 60));
    }
}