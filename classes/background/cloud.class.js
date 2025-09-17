class Cloud extends MovableObject {
    width = 300;
    height = 100;
    speed = 0.15;

    constructor(posX) {
        super().loadImg('./img/Background_City/city 1/3_clouds.png');
        this.posX = posX;
        this.animate();
    }

    animate() {
        this.moveLeft();
    }
}