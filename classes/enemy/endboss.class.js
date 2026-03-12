/**
 * Represents the final boss of the game.
 * Handles animations, player interactions, movement, and death sequence.
 *
 * @extends MovableObject
 */
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

    IMAGES_ATTACK = [
        './img/Boss/Attack/attack_00.png',
        './img/Boss/Attack/attack_01.png',
        './img/Boss/Attack/attack_02.png',
        './img/Boss/Attack/attack_03.png',
        './img/Boss/Attack/attack_04.png',
    ];


    oneTime = false;
    oneTimeDeath = false;
    currentImg = 0;

    /**
     * Creates a new EndBoss, initializes images, position, and speed.
     */
    constructor() {
        super().loadImg(this.IMAGES_IDLE[0]);
        this.loadImgs(this.IMAGES_IDLE);
        this.loadImgs(this.IMAGES_WALKING);
        this.loadImgs(this.IMAGES_DEATH);
        this.loadImgs(this.IMAGES_ATTACK);
        this.animate();

        this.posX = 2600;
        this.posX += Math.random() * 200;
        this.posY = 25;
        this.speed = 0.4 + Math.random() * 0.25;
    }

    /**
     * Starts the boss animation loop and reacts to player proximity.
     */
    animate() {
        this.checkPlayerIsDead();
        intervals.push(setInterval(() => {
            if (isRunning) {
                if (!this.isDead) {
                    if (this.checkPlayerDistance() && !world.character.isDead()) {
                        this.reactionWhenPlayerInRange();
                    }
                    else if (this.checkPlayerSide()) {
                        this.posX += Math.random() * 10;
                        this.isMirrored = true;
                    }
                }
            }
        }, 1000 / 6));
    }

    /**
     * Boss reaction when the player is in range.
     */
    reactionWhenPlayerInRange() {
        if (!this.oneTime) {
            world.statusbars.push(new Statusbar(124, 144, 8, 100));
            SoundHub.pauseOne(SoundHub.BACKGROUND);
            SoundHub.playLoop(SoundHub.BOSS);
            this.oneTime = true;
            spawnLateGameEnemy();
        }
        world.statusbars[world.statusbars.length - 1].setPercentage(this.energy / 10);
        this.checkPlayerForHit();
        if (this.checkPlayerSide()) {
            this.posX += Math.random() * 10;
            this.isMirrored = true;
        }
        else {
            this.posX -= Math.random() * 10;
            this.isMirrored = false;
        }
    }

    checkPlayerForHit() {
        if (this.checkPlayerDistanceForHit() && !world.character.isDead()) {
            this.playAnimation(this.IMAGES_ATTACK);
        }
    }

    /**
     * Animates walking or idle depending on player position.
     */
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

    /**
     * Plays death animation and stops game when finished.
     * @param {number} index - Index of the boss in the enemies array
     */
    playDeathAnimation(index) {
        this.currentImg = 0;

        let deathInterval = setInterval(() => {
            let path = this.IMAGES_DEATH[this.currentImg];
            this.img = this.imgCache[path];

            this.currentImg++;

            if (this.currentImg >= this.IMAGES_DEATH.length) {
                clearInterval(deathInterval);
            }
            else {
                this.stopGamePlaying(index);
                setTimeout(() => {
                    clearInterval(deathInterval);
                }, 1000);
            }
        }, 150);

    }

    /**
     * Stops the game when boss is defeated and shows end screen.
     * @param {number} index - Index of the boss in the enemies array
     */
    stopGamePlaying(index) {
        if (this.oneTimeDeath) return;
        this.oneTimeDeath = true;
        this.isDead = true;
        world.statusbars[world.statusbars.length - 1].setPercentage(0);
        world.cacheTimeout.push(
            setTimeout(() => {
                world.level.enemies.splice(index, 1);
                isRunning = false;
                world.endScreen.push(new EndScreen(90, 55, 0));
                SoundHub.pauseOne(SoundHub.BOSS);
                SoundHub.pauseOne(SoundHub.BACKGROUND);
                SoundHub.playOne(SoundHub.WON);
                document.getElementById('container_end').classList.add('endscreen');
            }, 2500)
        );
    }

    /**
     * Sets the boss as "hit" and resets hit status after 5 seconds.
     */
    stopHit() {
        setInterval(() => {
            if (this.isHit)
                this.isHit = false;
        }, 5000);
        this.isHit = true;
    }

    /**
     * Checks if player is within attack distance.
     * @returns {boolean}
     */
    checkPlayerDistance() {
        return (this.posX - world.character.posX) < 275;
    }

    checkPlayerDistanceForHit() {
        return Math.abs(this.posX - world.character.posX) < 35;
    }

    /**
     * Checks if the player is on the right side of the boss.
     * @returns {boolean} True if player is on the right, false otherwise
     */
    checkPlayerSide() {
        if (this.posX < world.character.posX) {
            return true;
        }
        else {
            return false;
        }

    }
}