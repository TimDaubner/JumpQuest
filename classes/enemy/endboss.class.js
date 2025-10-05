class EndBoss extends MovableObject {
    width = 128 * 1;
    height = 128 * 1;

    IMAGES_IDLE = [
        './img/Boss/Idle/idle_r_00.png',
        './img/Boss/Idle/idle_r_01.png',
        './img/Boss/Idle/idle_r_02.png',
        './img/Boss/Idle/idle_r_03.png',
        './img/Boss/Idle/idle_r_04.png',
        './img/Boss/Idle/idle_r_05.png',
        './img/Boss/Idle/idle_r_06.png',
    ];
    IMAGES_WALKING = [
        './img/Boss/Walk/walk_r_00.png',
        './img/Boss/Walk/walk_r_01.png',
        './img/Boss/Walk/walk_r_02.png',
        './img/Boss/Walk/walk_r_03.png',
        './img/Boss/Walk/walk_r_04.png',
        './img/Boss/Walk/walk_r_05.png',
        './img/Boss/Walk/walk_r_06.png',
        './img/Boss/Walk/walk_r_07.png',
        './img/Boss/Walk/walk_r_08.png',
        './img/Boss/Walk/walk_r_09.png',
    ];

    currentImg = 0;
    constructor() {
        super().loadImg(this.IMAGES_IDLE[0]);
        this.loadImgs(this.IMAGES_IDLE);
        this.animate();

        this.posX = 2600;
        this.posX += Math.random() * 200;
        this.posY = 25;
        this.speed = 0.15 + Math.random() * 0.25;
    }

    animate() {
        // this.moveLeft();

        intervals.push(setInterval(() => {
            if (isRunning) {
                this.playAnimation(this.IMAGES_IDLE);
            }
        }, 1000 / 6));
    }
}