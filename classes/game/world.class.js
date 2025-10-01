class World {
    character = new Player();
    level = level1;
    canvas;
    ctx;
    controller;
    camera_x;
    statusbar_HP = new Statusbar(10, 0, 100);
    statusbar_ENDURANCE = new Statusbar(25, 1, 100);
    statusbar_GAS = new Statusbar(40, 2, 5);
    throwableObjects = [
        new ThrowableObject(),
        new ThrowableObject(),
        new ThrowableObject()
    ];

    constructor(canvas, controller) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.controller = controller;

        //scale up or down
        this.ctx.scale(6.2, 6.2);
        createBackground();

        this.draw();
        this.setWorld();
        this.checkCollisions();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectToMap(this.level.backgroundObjects);
        this.addObjectToMap(this.level.clouds);
        this.addObjectToMap(this.level.enemies);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusbar_HP);
        this.addToMap(this.statusbar_ENDURANCE);
        this.addToMap(this.statusbar_GAS);
        this.ctx.translate(this.camera_x, 0);
        this.ctx.translate(-this.camera_x, 0);


        // const dpi = window.devicePixelRatio;
        // this.ctx.scale(dpi, dpi);
        let self = this;
        requestAnimationFrame(function () { self.draw(); });
    }

    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy) && !world.character.isHurt()) {
                    console.log('Collision with Character', enemy);
                    this.character.gotHit();
                }
            });
        }, 100);
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