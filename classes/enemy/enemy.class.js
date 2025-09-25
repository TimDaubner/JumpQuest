class Enemy extends MovableObject {
    width = 128 * 0.7;
    height = 128 * 0.7;

    offset = {
        top: 40,
        left: 34,
        sizeX: 6,
        sizeY: 1.8
    }

    IMAGES_IDLE = [
        'img/Enemy_Anim/Idle/idle_00.png',
        'img/Enemy_Anim/Idle/idle_01.png',
        'img/Enemy_Anim/Idle/idle_02.png',
        'img/Enemy_Anim/Idle/idle_03.png',
        'img/Enemy_Anim/Idle/idle_04.png',
        'img/Enemy_Anim/Idle/idle_05.png'
    ];
    IMAGES_WALKING = [
        'img/Enemy_Anim/Walk/walk_00.png',
        'img/Enemy_Anim/Walk/walk_01.png',
        'img/Enemy_Anim/Walk/walk_02.png',
        'img/Enemy_Anim/Walk/walk_03.png',
        'img/Enemy_Anim/Walk/walk_04.png',
        'img/Enemy_Anim/Walk/walk_05.png',
        'img/Enemy_Anim/Walk/walk_06.png',
        'img/Enemy_Anim/Walk/walk_07.png',
        'img/Enemy_Anim/Walk/walk_08.png',
        'img/Enemy_Anim/Walk/walk_09.png',
    ];

    currentImg = 0;
    constructor() {
        super().loadImg('./img/Enemy_Anim/Idle/idle_r_00.png');
        this.loadImgs(this.IMAGES_WALKING);
        this.animate();

        this.posX = 300;
        this.posX += Math.random() * 10;
        this.posY = 60;
        this.speed = 0.15 + Math.random() * 0.25;
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING)
        }, 1000 / 6);
    }
}