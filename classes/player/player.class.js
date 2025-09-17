class Player extends MovableObject {
    width = 25.6 * 5;
    height = 25.6 * 5;

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

    currentImg = 0;

    constructor() {
        super().loadImg('./img/Player_Anim/Idle/idle_00.png');
        this.loadImgs(this.IMAGES_IDLE);

        this.animate();

        this.posX = 0;
        this.posY = 22;
    }

    animate() {
        setInterval(() => {
            let i = this.currentImg % this.IMAGES_IDLE.length;
            let path = this.IMAGES_IDLE[i];
            this.img = this.imgCache[path];
            this.currentImg++;
        }, 1000 / 8);
    }
    //IDLE 5
    //WALKING 10
}