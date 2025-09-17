class Enemy extends MovableObject {
    constructor() {
        super().loadImg('./img/Enemy_Anim/Idle/idle_r_00.png');

        this.posX = 150;
        this.posX += Math.random() * 50;
        this.posY = 60;
        this.width = 128 * 0.7;
        this.height = 128 * 0.7;
    }
}