class Player extends MovableObject {
    width = 25.6 * 5;
    height = 25.6 * 5;
    posX = 0;
    posY = 22;
    world;
    speed = 0.7;
    adjustValue = 1;
    endurance = 100;

    offset = {
        top: 77,
        left: 47,
        sizeX: 6,
        sizeY: 2.5
    }

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
        './img/Player_Anim/Jump/jump_00.png',
        './img/Player_Anim/Jump/jump_01.png',
        './img/Player_Anim/Jump/jump_02.png',
        './img/Player_Anim/Jump/jump_03.png',
        './img/Player_Anim/Jump/jump_04.png',
        './img/Player_Anim/Jump/jump_05.png',
        './img/Player_Anim/Jump/jump_06.png',
        './img/Player_Anim/Jump/jump_07.png',
        './img/Player_Anim/Jump/jump_08.png',
    ];

    IMAGES_DEAD = [
        './img/Player_Anim/Dead/dead_00.png',
        './img/Player_Anim/Dead/dead_01.png',
        './img/Player_Anim/Dead/dead_02.png',
        './img/Player_Anim/Dead/dead_03.png',
        './img/Player_Anim/Dead/dead_04.png',
        './img/Player_Anim/Dead/dead_05.png',
        './img/Player_Anim/Dead/dead_06.png',
        './img/Player_Anim/Dead/dead_07.png',
        './img/Player_Anim/Dead/dead_08.png'
    ];

    IMAGES_HURT = [
        './img/Player_Anim/Hurt/hurt_00.png',
        './img/Player_Anim/Hurt/hurt_01.png',
        './img/Player_Anim/Hurt/hurt_02.png',
        './img/Player_Anim/Hurt/hurt_03.png',
    ];



    currentImg = 0;

    constructor() {
        super().loadImg('./img/Player_Anim/Idle/idle_00.png');
        this.loadImgs(this.IMAGES_IDLE);
        this.loadImgs(this.IMAGES_WALKING);
        this.loadImgs(this.IMAGES_JUMP);
        this.loadImgs(this.IMAGES_HURT);
        this.loadImgs(this.IMAGES_DEAD);
        this.animate();
        this.applyGravity();
    }

    animate() {
        setInterval(() => {
            if (this.isDead()) {
                world.statusbars[0].setPercentage(this.energy);
                this.playDeathAnimation(this.IMAGES_DEAD);
            }
            else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
                world.statusbars[0].setPercentage(this.energy);
            }
        }, 1000 / 10);
        setInterval(() => {
            if (this.isDead()) return;
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
            if (this.isDead()) return;
            if (this.world.controller.RIGHT && this.isGrounded || this.world.controller.LEFT && this.isGrounded) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 1000 / 11);

        setInterval(() => {

            if (this.isDead()) return;
            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMP);
            }
            if (this.world.controller.JUMP && this.isGrounded && this.endurance > 24) {
                this.jump();
                this.endurance -= 25;
                if (this.endurance < 0) this.endurance = 0;
            }
        }, 300);

        setInterval(() => {
            if (this.isDead()) return;
            if (!this.world.controller.RIGHT && !this.world.controller.LEFT && this.isGrounded || this.world.controller.RIGHT && this.world.controller.LEFT) {
                this.playAnimation(this.IMAGES_IDLE);
            }
        }, 1000 / 11);
    }



    sprint() {
        if (this.world.controller.RUN && this.isGrounded) {
            if (this.endurance > 0 && this.world.controller.LEFT || this.endurance > 0 && this.world.controller.RIGHT) {
                this.speed = 2.2;
                this.sprintDrain();
            }
            else {
                this.speed = 1.4;
            }
        }
        else {
            this.speed = 1.4;
            this.gainEndurance();
        }
    }

    sprintDrain() {
        if (this.endurance > 0) {
            this.endurance -= 0.5;
        }
        world.statusbars[1].setPercentage(this.endurance);
    }

    gainEndurance() {
        if (this.endurance < 100 && this.isGrounded) {
            this.endurance++;
        }
        world.statusbars[1].setPercentage(this.endurance);
    }
    //IDLE 5
    //WALKING 10
}