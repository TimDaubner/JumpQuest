class Enemy extends MovableObject {
    width = 128 * 0.7;
    height = 128 * 0.7;

    IMAGES_IDLE = [
        'img/Enemy_Anim/Idle/idle_r_00.png',
        'img/Enemy_Anim/Idle/idle_r_01.png',
        'img/Enemy_Anim/Idle/idle_r_02.png',
        'img/Enemy_Anim/Idle/idle_r_03.png',
        'img/Enemy_Anim/Idle/idle_r_04.png',
        'img/Enemy_Anim/Idle/idle_r_05.png'
    ];
    IMAGES_WALKING = [
        'img/Enemy_Anim/Walk/walk_r_00.png',
        'img/Enemy_Anim/Walk/walk_r_01.png',
        'img/Enemy_Anim/Walk/walk_r_02.png',
        'img/Enemy_Anim/Walk/walk_r_03.png',
        'img/Enemy_Anim/Walk/walk_r_04.png',
        'img/Enemy_Anim/Walk/walk_r_05.png',
        'img/Enemy_Anim/Walk/walk_r_06.png',
        'img/Enemy_Anim/Walk/walk_r_07.png',
        'img/Enemy_Anim/Walk/walk_r_08.png',
        'img/Enemy_Anim/Walk/walk_r_09.png',
    ];

    currentImg = 0;
    constructor() {
        super().loadImg('./img/Enemy_Anim/Idle/idle_r_00.png');
        this.loadImgs(this.IMAGES_WALKING);
        this.animate();

        this.posX = 300;
        this.posX += Math.random() * 200;
        this.posY = 60;
        this.speed = 0.15 + Math.random() * 0.25;
    }

    animate() {
        this.moveLeft();

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING)
        }, 1000 / 6);
    }
}