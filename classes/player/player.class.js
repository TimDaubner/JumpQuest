class Player extends MovableObject {
    width = 25.6 * 5;
    height = 25.6 * 5;
    posX = 0;
    posY = -75;//22
    world;
    speed = 0.7;
    adjustValue = 1;

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
    IMAGES_JUMP = [
        'img/Player_Anim/Jump/jump_00.png',
        'img/Player_Anim/Jump/jump_01.png',
        'img/Player_Anim/Jump/jump_02.png',
        'img/Player_Anim/Jump/jump_03.png',
        'img/Player_Anim/Jump/jump_04.png',
        'img/Player_Anim/Jump/jump_05.png',
        'img/Player_Anim/Jump/jump_06.png',
        'img/Player_Anim/Jump/jump_07.png',
        'img/Player_Anim/Jump/jump_08.png',
    ];



    currentImg = 0;

    constructor() {
        super().loadImg('./img/Player_Anim/Idle/idle_00.png');
        this.loadImgs(this.IMAGES_IDLE);
        this.loadImgs(this.IMAGES_WALKING);
        this.loadImgs(this.IMAGES_JUMP);
        this.animate();
        this.applyGravity();
    }

    animate() {
        setInterval(() => {
            this.sprint();
            if (this.world.controller.RIGHT && level1.levelEndX > this.posX) {
                this.moveRight();
            }
            if (this.world.controller.LEFT && this.posX > -100) {
                this.moveLeft();
            }
            this.world.camera_x = -this.posX + 15;
        }, 1000 / 60);

        setInterval(() => {
            if (this.world.controller.RIGHT && this.isGrounded || this.world.controller.LEFT && this.isGrounded) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 1000 / 11);

        setInterval(() => {
            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMP);
            }
            if (this.world.controller.JUMP && this.isGrounded) {
                this.jump();
            }
        }, 300);



        setInterval(() => {
            if (!this.world.controller.RIGHT && !this.world.controller.LEFT && this.isGrounded) {
                this.playAnimation(this.IMAGES_IDLE);
            }
        }, 1000 / 11);
    }

    sprint() {
        if (this.world.controller.RUN && this.isGrounded) {
            this.speed = 1.4;
        }
        else {
            this.speed = 0.7;
        }
    }
    //IDLE 5
    //WALKING 10
}