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
        // new Statusbar(180, 10, 5, 10),
        // new Statusbar(210, 10, 6, 10),
        new Statusbar(4, 27, 7, 7),
    ];
    throwableObjects = [
    ];
    collectableObjects = [
    ];
    punches = [
    ];

    constructor(canvas, controller) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.controller = controller;

        this.level = createLevel1();

        //scale up or down
        this.ctx.scale(6.2, 6.2);
        createBackground();

        this.draw();
        this.setWorld();
        this.checkCollisions();
        this.createCollectables();
        this.run();
    }

    createCollectables() {
        for (let i = 0; i < 100; i++) {
            this.collectableObjects.push(new CollectableObject(200, 25, 0));
            // console.log(i % 10);
            if (i % 10 == 9) {
                this.collectableObjects.push(new CollectableObject(200, 25, 1));
            }
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectToMap(this.level.backgroundObjects);
        this.addObjectToMap(this.level.clouds);
        this.addObjectToMap(this.level.enemies);
        this.addToMap(this.character);
        this.addObjectToMap(this.collectableObjects);
        this.addObjectToMap(this.throwableObjects);
        this.addObjectToMap(this.punches);
        this.ctx.translate(-this.camera_x, 0);
        this.addObjectToMap(this.statusbars);
        this.ctx.translate(this.camera_x, 0);
        this.ctx.translate(-this.camera_x, 0);

        this.ctx.font = "8px Arial";
        this.ctx.fillStyle = "white";
        this.ctx.fillText(this.score || 0, 162, 18);
        let self = this;
        requestAnimationFrame(function () { self.draw(); });
    }

    run() {
        intervals.push(setInterval(() => {
            if (isRunning) {
                this.checkCollisions();
                this.checkThrowObjects();
                this.checkPunchHit();
            }
        }, 100));
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !world.character.isHurt()) {
                this.character.gotHit();
            }
        });
        this.collectableObjects.forEach((collectable, index) => {
            if (this.character.isColliding(collectable)) {
                if (collectable.id == 1 && this.character.gas < 100) {
                    console.log("gas");
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
        });
        this.level.enemies.forEach((enemy, index) => {
            this.throwableObjects.forEach(throwableObject => {
                if (throwableObject.isColliding(enemy)) {
                    if (enemy.energy <= 0) {
                        this.level.enemies.splice(index, 1);
                    }
                    if (!enemy.isHit) {
                        enemy.energy -= 50;
                    }
                    if (enemy.energy <= 0) {
                        this.level.enemies.splice(index, 1);
                    }
                    enemy.stopHit();
                }
            });
        });
    }

    checkThrowObjects() {

        if (controller.THROW && !this.character.isDead() && this.character.endurance >= 100 && this.character.gas > 24) {
            let attack = new ThrowableObject(this.character.posX, this.character.posY);
            this.throwableObjects.push(attack);
            this.character.gas -= 25;
            this.statusbars[2].setPercentage(this.character.gas);
        }
    }

    checkPunchHit() {
        if (this.controller.ATTACK && !this.character.isDead()) {
            console.log("ATTACK");
            let currentAttack = new Attack(this.character.posX + 50, this.character.posY);
            this.punches.push = currentAttack;

            this.level.enemies.forEach((enemy) => {
                if (currentAttack.isColliding(enemy)) {
                    console.log("ATTACK HIT");
                }
            });
        }
    }

    setWorld() {
        this.character.world = this;
    }

    addObjectToMap(o) {
        o.forEach(element => {
            this.addToMap(element);
        });
    }

    addToMap(mo) {
        if (mo.isMirrored) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.isMirrored) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.posX = mo.posX * -1;
    }

    flipImageBack(mo) {
        mo.posX = mo.posX * -1;
        this.ctx.restore();
    }
}