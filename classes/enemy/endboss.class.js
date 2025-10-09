class EndBoss extends MovableObject {
    width = 128 * 1;
    height = 128 * 1;
    offset = {
        top: 55,
        left: 57,
        sizeX: 6,
        sizeY: 1.8
    }
    energy = 500;
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
    oneTime = false;
    currentImg = 0;
    constructor() {
        super().loadImg(this.IMAGES_IDLE[0]);
        this.loadImgs(this.IMAGES_IDLE);
        this.loadImgs(this.IMAGES_WALKING);
        this.animate();

        this.posX = 2600;
        this.posX += Math.random() * 200;
        this.posY = 25;
        this.speed = 0.15 + Math.random() * 0.25;
    }

    animate() {
        intervals.push(setInterval(() => {
            if (isRunning) {
                if (this.checkPlayerDistance() && !world.character.isDead() || this.checkPlayerSide() && !world.character.isDead()) {
                    this.playAnimation(this.IMAGES_WALKING);
                }
                else {
                    this.playAnimation(this.IMAGES_IDLE);
                }
            }
        }, 1000 / 6));
        intervals.push(setInterval(() => {
            if (isRunning) {
                if (this.checkPlayerDistance() && !world.character.isDead()) {
                    if (!this.oneTime) {
                        world.statusbars.push(new Statusbar(124, 144, 8, 100));
                        this.oneTime = true;
                    }
                    world.statusbars[world.statusbars.length - 1].setPercentage(this.energy / 5);
                    if (this.checkPlayerSide()) {
                        this.posX += 1.2;
                        this.isMirrored = true;
                    }
                    else {
                        this.posX -= 1.2;
                        this.isMirrored = false;
                    }
                }
                else if (this.checkPlayerSide()) {
                    this.posX += 1.2;
                    this.isMirrored = true;
                }
            }
        }, 1000 / 6));
    }

    stopHit() {
        setInterval(() => {
            if (this.isHit)
                this.isHit = false;
        }, 5000);
        this.isHit = true;
    }

    checkPlayerDistance() {
        return (this.posX - world.character.posX) < 100;
    }

    checkPlayerSide() {
        if (this.posX < world.character.posX) {
            return true;
        }
        else {
            return false;
        }

    }
}