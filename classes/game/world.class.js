/**
 * Represents the game world.
 * Handles the main game loop, drawing, collisions, score, status bars, and interactions.
 */
class World {
    character = new Player();
    level;
    canvas;
    ctx;
    controller;
    camera_x;
    score = 0;
    statusbars = [
        new Statusbar(10, 10, 0, 100),
        new Statusbar(10, 20, 1, 100),
        new Statusbar(10, 30, 2, 100),
        new Statusbar(3, 7, 3, 10),
        new Statusbar(150, 10, 4, 10),
        new Statusbar(4, 27, 7, 7),
    ];
    throwableObjects = [
    ];
    collectableObjects = [
    ];
    punches = [
    ];
    endScreen = [
    ];
    wonGame = false;
    oneTime = false;
    button = {
        x: 180,
        y: 10,
        w: 30,
        h: 15,
        r: 6,
        label: 'Click me!',
        state: 'idle', // idle | hover | active
    };

    /**
    * Creates the game world, sets up the canvas, controller, level, collectables, and starts the game loop.
    *
    * @param {HTMLCanvasElement} canvas - The game canvas
    * @param {Controller} controller - Input controller instance
    */
    constructor(canvas, controller) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.controller = controller;

        this.level = createLevel1();

        this.ctx.scale(6.2, 6.2);
        createBackground();

        this.draw();
        this.setWorld();
        this.createCollectables();
        this.run();
    }

    /**
     * Creates collectable objects (coins and sprays) and adds them to the world.
     */
    createCollectables() {
        for (let i = 0; i < 100; i++) {
            this.collectableObjects.push(new CollectableObject(200, 25, 0));
            if (i % 10 == 9) {
                this.collectableObjects.push(new CollectableObject(200, 25, 1));
            }
        }
    }

    /**
     * Draws the world, including background, player, enemies, collectables, status bars, and end screens.
     * Loops with requestAnimationFrame.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.bunchOfObjectsToMap();

        this.ctx.translate(-this.camera_x, 0);

        this.addObjectToMap(this.statusbars);
        this.addObjectToMap(this.endScreen);

        this.ctx.translate(this.camera_x, 0);
        this.ctx.translate(-this.camera_x, 0);

        this.coinCounter();

        let self = this;
        requestAnimationFrame(function () { self.draw(); });
    }

    /**
     * Draws all objects that need to be mapped (background, clouds, enemies, player, collectables, throwable objects, punches)
     */
    bunchOfObjectsToMap() {
        this.addObjectToMap(this.level.backgroundObjects);
        this.addObjectToMap(this.level.clouds);
        this.addObjectToMap(this.level.enemies);
        this.addToMap(this.character);
        this.addObjectToMap(this.collectableObjects);
        this.addObjectToMap(this.throwableObjects);
        this.addObjectToMap(this.punches);
    }

    /**
     * Draws the coin counter on the screen.
     */
    coinCounter() {
        this.ctx.font = "8px Arial";
        this.ctx.fillStyle = "white";
        this.ctx.fillText(this.score || 0, 162, 18);
    }

    /**
     * Starts the main game logic loop for collisions and throwables.
     */
    run() {
        intervals.push(setInterval(() => {
            if (isRunning) {
                this.checkThrowObjects();
                // this.checkPunchHit();
                this.checkCollisions();
            }
        }, 100));
    }

    /**
     * Checks all collisions: collectables, throwable objects, enemies
     */
    checkCollisions() {
        this.checkCollectableItemsCollisions();
        this.checkThrowableObjectHitEnemy();
        this.checkEnemyCollisions();
    }

    /**
    * Checks collision between player and enemies
    */
    checkEnemyCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !enemy.isDead && !world.character.isHurt()) {
                this.character.gotHit();
            }
        });
    }

    /**
     * Checks collision between player and collectable objects
     */
    checkCollectableItemsCollisions() {
        this.collectableObjects.forEach((collectable, index) => {
            if (this.character.isColliding(collectable)) {
                this.checkGasOrCoin(collectable, index);
            }
        });
    }

    /**
    * Checks collision between throwable objects and enemies
    */
    checkThrowableObjectHitEnemy() {
        this.level.enemies.forEach((enemy, index) => {
            this.throwableObjects.forEach(throwableObject => {
                if (throwableObject.isColliding(enemy)) {
                    this.checkEnemyReaction(enemy, index);
                    enemy.stopHit();
                }
            });
        });
    }

    /**
      * Handles enemy reaction to being hit
      * @param {MovableObject} enemy 
      * @param {number} index 
      */
    checkEnemyReaction(enemy, index) {
        if (enemy.energy <= 0) {
            enemy.playDeathAnimation(index);
        }
        if (!enemy.isHit) {
            enemy.energy -= 50;
        }
        if (enemy.energy <= 0) {
            enemy.playDeathAnimation(index);
        }
    }

    /**
    * Handles gas or coin collection
    * @param {CollectableObject} collectable 
    * @param {number} index 
    */
    checkGasOrCoin(collectable, index) {
        if (collectable.id == 1 && this.character.gas < 100) {
            this.character.gas = 100;
            this.statusbars[2].setPercentage(100);
            this.collectableObjects.splice(index, 1);
            SoundHub.playOne(SoundHub.SPRAY);
        }
        else if (collectable.id == 0) {
            this.collectableObjects.splice(index, 1);
            this.score++;
            let rnd = Math.round(Math.random());
            SoundHub.playOne(SoundHub.COIN[rnd]);
        }
    }

    /**
     * Handles creating throwable objects (fireballs) when attacking
     */
    checkThrowObjects() {
        if (controller.ATTACK && !this.character.isDead() && this.character.endurance >= 100 && this.character.gas > 24) {
            SoundHub.playOne(SoundHub.FIREBALL[0]);
            let attack = new ThrowableObject(this.character.posX, this.character.posY);
            this.throwableObjects.push(attack);
            this.character.gas -= 25;
            this.statusbars[2].setPercentage(this.character.gas);
        }
    }

    /**
     * Sets the world reference on the player
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Adds an array of objects to the map
     * @param {DrawableObject[]} o 
     */
    addObjectToMap(o) {
        o.forEach(element => {
            this.addToMap(element);
        });
    }

    /**
     * Draws a single object to the canvas, handling mirroring
     * @param {DrawableObject} mo 
     */
    addToMap(mo) {
        if (mo.isMirrored) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);

        if (mo.isMirrored) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips the object horizontally
     * @param {DrawableObject} mo 
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.posX = mo.posX * -1;
    }

    /**
     * Resets the flip transformation
     * @param {DrawableObject} mo 
     */
    flipImageBack(mo) {
        mo.posX = mo.posX * -1;
        this.ctx.restore();
    }
}