/**
 * Represents a standard enemy in the game.
 * Handles movement, animations, hit detection, and death.
 *
 * @extends MovableObject
 */
class Enemy extends MovableObject {
    width = 128 * 0.7;
    height = 128 * 0.7;
    id;
    isHit = false;
    isDead = false;
    offset = {
        top: 40,
        left: 34,
        sizeX: 6,
        sizeY: 1.8
    }
    energy = 100;
    isInsverse = false;

    IMAGES_IDLE = [
        './img/Enemy_Anim/Idle/idle_00.png',
        './img/Enemy_Anim/Idle/idle_01.png',
        './img/Enemy_Anim/Idle/idle_02.png',
        './img/Enemy_Anim/Idle/idle_03.png',
        './img/Enemy_Anim/Idle/idle_04.png',
        './img/Enemy_Anim/Idle/idle_05.png'
    ];
    IMAGES_WALKING = [
        './img/Enemy_Anim/Walk/walk_00.png',
        './img/Enemy_Anim/Walk/walk_01.png',
        './img/Enemy_Anim/Walk/walk_02.png',
        './img/Enemy_Anim/Walk/walk_03.png',
        './img/Enemy_Anim/Walk/walk_04.png',
        './img/Enemy_Anim/Walk/walk_05.png',
        './img/Enemy_Anim/Walk/walk_06.png',
        './img/Enemy_Anim/Walk/walk_07.png',
        './img/Enemy_Anim/Walk/walk_08.png',
        './img/Enemy_Anim/Walk/walk_09.png',
    ];
    IMAGES_DEATH = [
        './img/Enemy_Anim/Dead/dead_00.png',
        './img/Enemy_Anim/Dead/dead_01.png',
        './img/Enemy_Anim/Dead/dead_02.png',
        './img/Enemy_Anim/Dead/dead_03.png',
        './img/Enemy_Anim/Dead/dead_04.png',
    ];

    currentImg = 0;

    /**
     * Creates a new Enemy.
     * @param {number} id - Unique identifier for the enemy
     * @param {number} posX - Initial X position
     * @param {boolean} [isInverse=false] - Whether the enemy moves to the right instead of left
     */
    constructor(id, posX, isInverse = false) {
        super().loadImg('./img/Enemy_Anim/Idle/idle_r_00.png');
        this.isInverse = isInverse;
        this.loadImgs(this.IMAGES_WALKING);
        this.loadImgs(this.IMAGES_DEATH);
        this.animate();
        this.id = id;
        this.posX = posX;
        this.posX += Math.random() * 8500;
        this.posY = 60;
        this.speed = 0.15 + Math.random() * 0.5;
    }

    /**
     * Animates the enemy movement and walking animation.
     */
    animate() {
        intervals.push(setInterval(() => {
            if (isRunning) {
                if (this.isInverse) {
                    if (this.energy > 0) this.moveRight();
                }
                else {
                    if (this.energy > 0) this.moveLeft();
                }
            }
        }, 1000 / 60));
        intervals.push(setInterval(() => {
            if (isRunning) {
                if (this.energy > 0)
                    this.playAnimation(this.IMAGES_WALKING);
            }
        }, 1000 / 6));
    }

    /**
     * Plays the death animation of the enemy.
     * @param {number} index - Index of the enemy in the world enemies array
     */
    playDeathAnimation(index) {
        let i = this.currentImg % this.IMAGES_DEATH.length;
        let path = this.IMAGES_DEATH[i];
        this.img = this.imgCache[path];
        if (this.IMAGES_DEATH.length - 1 > i) {
            this.currentImg++;
        }
        else {
            this.isDead = true;
            setTimeout(() => {
                world.level.enemies.splice(index, 1);
            }, 2500);
        }
    }

    /**
     * Sets the enemy as "hit" and resets hit status after 2 seconds.
     */
    stopHit() {
        setInterval(() => {
            if (this.isHit)
                this.isHit = false;
        }, 2000);
        this.isHit = true;
    }
}