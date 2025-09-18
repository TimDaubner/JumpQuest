class Player extends MovableObject {
    width = 25.6 * 5;
    height = 25.6 * 5;
    posX = 0;
    posY = 22;
    world;
    speed = 0.7;

    IMAGES_IDLE = [
        './img/Player_Anim/Idle/idle_00.png',
        './img/Player_Anim/Idle/idle_01.png',
        './img/Player_Anim/Idle/idle_02.png',
        './img/Player_Anim/Idle/idle_03.png',
        './img/Player_Anim/Idle/idle_04.png',
        './img/Player_Anim/Idle/idle_05.png',
        './img/Player_Anim/Idle/idle_06.png'
    ];
    IMAGES_WALKING = [
        './img/Player_Anim/Walk/walk_00.png',
        './img/Player_Anim/Walk/walk_01.png',
        './img/Player_Anim/Walk/walk_02.png',
        './img/Player_Anim/Walk/walk_03.png',
        './img/Player_Anim/Walk/walk_04.png',
        './img/Player_Anim/Walk/walk_05.png',
        './img/Player_Anim/Walk/walk_06.png',
        './img/Player_Anim/Walk/walk_07.png',
        './img/Player_Anim/Walk/walk_08.png',
        './img/Player_Anim/Walk/walk_09.png',
    ];
    IMAGES_WALKING_R = [
        './img/Player_Anim/Walk/walk_00.png',
        './img/Player_Anim/Walk/walk_01.png',
        './img/Player_Anim/Walk/walk_02.png',
        './img/Player_Anim/Walk/walk_03.png',
        './img/Player_Anim/Walk/walk_04.png',
        './img/Player_Anim/Walk/walk_05.png',
        './img/Player_Anim/Walk/walk_06.png',
        './img/Player_Anim/Walk/walk_07.png',
        './img/Player_Anim/Walk/walk_08.png',
        './img/Player_Anim/Walk/walk_09.png',
    ];

    currentImg = 0;

    constructor() {
        super().loadImg('./img/Player_Anim/Idle/idle_00.png');
        this.loadImgs(this.IMAGES_WALKING);

        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.world.controller.RIGHT) {
                this.posX += this.speed;
                this.isMirrored = false;
            }
            if (this.world.controller.LEFT) {
                this.posX -= this.speed;
                this.isMirrored = true;
            }
            this.world.camera_x = -this.posX;
        }, 1000 / 60);

        setInterval(() => {
            if (this.world.controller.RIGHT) {
                let i = this.currentImg % this.IMAGES_WALKING.length;
                let path = this.IMAGES_WALKING[i];
                this.img = this.imgCache[path];
                this.currentImg++;
            }
            if (this.world.controller.LEFT) {
                let i = this.currentImg % this.IMAGES_WALKING_R.length;
                let path = this.IMAGES_WALKING_R[i];
                this.img = this.imgCache[path];
                this.currentImg++;
            }
        }, 1000 / 11);
    }
    //IDLE 5
    //WALKING 10
}