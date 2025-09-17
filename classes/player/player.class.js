class Player extends MovableObject {
    constructor() {
        super().loadImg('./img/Player_Anim/Idle/idle_00.png')

        this.posX = 0;
        this.posY = 22;
        this.width = 25.6 * 5;
        this.height = 25.6 * 5;
    }
}