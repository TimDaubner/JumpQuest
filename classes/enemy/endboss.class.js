class EndBoss extends MovableObject {
    width = 128 * 1;
    height = 128 * 1;
    offset = {
        top: 55,
        left: 57,
        sizeX: 6,
        sizeY: 1.8
    }
    energy = 1000;
    isDead = false;
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

    IMAGES_DEATH = [
        './img/Boss/Dead/dead_00.png',
        './img/Boss/Dead/dead_01.png',
        './img/Boss/Dead/dead_02.png',
        './img/Boss/Dead/dead_03.png',
        './img/Boss/Dead/dead_04.png',
    ];


    oneTime = false;
    currentImg = 0;
    constructor() {
        super().loadImg(this.IMAGES_IDLE[0]);
        this.loadImgs(this.IMAGES_IDLE);
        this.loadImgs(this.IMAGES_WALKING);
        this.loadImgs(this.IMAGES_DEATH);
        this.animate();

        this.posX = 2600;
        this.posX += Math.random() * 200;
        this.posY = 25;
        this.speed = 0.15 + Math.random() * 0.25;
    }

    animate() {
        this.checkPlayerIsDead();
        intervals.push(setInterval(() => {
            if (isRunning) {
                if (!this.isDead) {
                    if (this.checkPlayerDistance() && !world.character.isDead()) {
                        this.reactionWhenPlayerInRange();
                    }
                    else if (this.checkPlayerSide()) {
                        this.posX += 1.2;
                        this.isMirrored = true;
                    }
                }
            }
        }, 1000 / 6));
    }

    reactionWhenPlayerInRange() {
        if (!this.oneTime) {
            world.statusbars.push(new Statusbar(124, 144, 8, 100));
            SoundHub.pauseOne(SoundHub.BACKGROUND);
            SoundHub.playLoop(SoundHub.BOSS);
            this.oneTime = true;
        }
        world.statusbars[world.statusbars.length - 1].setPercentage(this.energy / 10);
        if (this.checkPlayerSide()) {
            this.posX += 1.2;
            this.isMirrored = true;
        }
        else {
            this.posX -= 1.2;
            this.isMirrored = false;
        }
    }

    checkPlayerIsDead() {
        intervals.push(setInterval(() => {
            if (isRunning) {
                if (!this.isDead) {
                    if (this.checkPlayerDistance() && !world.character.isDead() || this.checkPlayerSide() && !world.character.isDead()) {
                        this.playAnimation(this.IMAGES_WALKING);
                    }
                    else {
                        this.playAnimation(this.IMAGES_IDLE);
                    }
                }
            }
        }, 1000 / 6));
    }

    playDeathAnimation(index) {
        let i = this.currentImg % this.IMAGES_DEATH.length;
        let path = this.IMAGES_DEATH[i];
        this.img = this.imgCache[path];
        if (this.IMAGES_DEATH.length - 1 > i) {
            this.currentImg++;
        }
        else {
            this.stopGamePlaying(index);
        }
    }

    stopGamePlaying(index) {
        this.isDead = true;
        setTimeout(() => {
            world.level.enemies.splice(index, 1);
            isRunning = false;
            world.endScreen.push(new EndScreen(90, 55, 0));
            SoundHub.pauseOne(SoundHub.BOSS);
            SoundHub.pauseOne(SoundHub.BACKGROUND);
            SoundHub.playOne(SoundHub.WON);
        }, 2500);
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