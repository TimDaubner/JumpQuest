class EndBoss extends MovableObject {
    width = 128 * 1;
    height = 128 * 1;

    IMAGES_IDLE = [
        'img/Boss/Idle/idle_r_00.png',
        'img/Boss/Idle/idle_r_01.png',
        'img/Boss/Idle/idle_r_02.png',
        'img/Boss/Idle/idle_r_03.png',
        'img/Boss/Idle/idle_r_04.png',
        'img/Boss/Idle/idle_r_05.png',
        'img/Boss/Idle/idle_r_06.png',
    ];
    IMAGES_WALKING = [
        'img/Boss/Walk/walk_r_00.png',
        'img/Boss/Walk/walk_r_01.png',
        'img/Boss/Walk/walk_r_02.png',
        'img/Boss/Walk/walk_r_03.png',
        'img/Boss/Walk/walk_r_04.png',
        'img/Boss/Walk/walk_r_05.png',
        'img/Boss/Walk/walk_r_06.png',
        'img/Boss/Walk/walk_r_07.png',
        'img/Boss/Walk/walk_r_08.png',
        'img/Boss/Walk/walk_r_09.png',
    ];

    currentImg = 0;
    constructor() {
        super().loadImg('./img/Enemy_Anim/Idle/idle_r_00.png');
        this.loadImgs(this.IMAGES_WALKING);
        this.animate();

        this.posX = 300;
        this.posX += Math.random() * 200;
        this.posY = 20;
        this.speed = 0.15 + Math.random() * 0.25;
    }

    animate() {
        this.moveLeft();

        setInterval(() => {
            let i = this.currentImg % this.IMAGES_WALKING.length;
            let path = this.IMAGES_WALKING[i];
            this.img = this.imgCache[path];
            this.currentImg++;
        }, 1000 / 6);
    }
}