class World {
    character = new Player();
    enemies = [new Enemy(), new Enemy(), new Enemy()];
    clouds = [new Cloud(0), new Cloud(299), new Cloud(598)];
    backgroundObjects = [
        // new BackgroundObject("img/Background_City/city 1/1_bg.png", 0, 0, false, null, 0),
        // new BackgroundObject("img/Background_City/city 1/2_sun.png", 0, 0, false, null, 0),
        // new BackgroundObject("img/Background_City/city 1/4_shadow_skyline.png", 0, 0, false, null, 0),
        // new BackgroundObject("img/Background_City/city 1/5_skyline.png", 0, 0, false, null, 0),
        // new BackgroundObject("img/Background_City/city 1/6_smog.png", 0, 0, true, "left", 0.022),
        // new BackgroundObject("img/Background_City/city 1/6_smog.png", 299, 0, true, "left", 0.022),
        // new BackgroundObject("img/Background_City/city 1/7_cars.png", 0, 0, true, "right", 0.01),
        // new BackgroundObject("img/Background_City/city 1/8_skyscrappers.png", 0, 0, false, null),
        // new BackgroundObject("img/Background_City/city 1/10_shops.png", 0, 0, false, null, 0),
        // new BackgroundObject("img/Background_City/city 1/9_smallsmog.png", 0, 0, true, "right", 0.05),
        // new BackgroundObject("img/Background_City/city 1/9_smallsmog.png", -299, 0, true, "right", 0.05),

        // new BackgroundObject("img/Background_City/city 1/1_bg.png", 299, 0, false, null, 0),
        // new BackgroundObject("img/Background_City/city 1/2_sun.png", 299, 0, false, null, 0),
        // new BackgroundObject("img/Background_City/city 1/4_shadow_skyline.png", 299, 0, false, null, 0),
        // new BackgroundObject("img/Background_City/city 1/5_skyline.png", 299, 0, false, null, 0),
        // new BackgroundObject("img/Background_City/city 1/6_smog.png", 299, 0, true, "left", 0.022),
        // new BackgroundObject("img/Background_City/city 1/6_smog.png", 599, 0, true, "left", 0.022),
        // new BackgroundObject("img/Background_City/city 1/7_cars.png", 299, 0, true, "right", 0.01),
        // new BackgroundObject("img/Background_City/city 1/8_skyscrappers.png", 300, 0, false, null),
        // new BackgroundObject("img/Background_City/city 1/10_shops.png", 299, 0, false, null, 0),
        // new BackgroundObject("img/Background_City/city 1/9_smallsmog.png", 299, 0, true, "right", 0.05),
        // new BackgroundObject("img/Background_City/city 1/9_smallsmog.png", 299, 0, true, "right", 0.05),
    ];
    canvas;
    ctx;
    controller;
    camera_x;

    constructor(canvas, controller) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.controller = controller;

        //scale up or down
        // this.ctx.scale(6.2, 6.2);
        this.createBackground();
        this.draw();
        this.setWorld();
    }

    createBackground() {
        for (let i = -1; i < 10; i++) {
            this.backgroundObjects.push(new BackgroundObject("img/Background_City/city 1/1_bg.png", 299 * i, 0, false, null, 0));
            this.backgroundObjects.push(new BackgroundObject("img/Background_City/city 1/2_sun.png", 299 * i, 0, false, null, 0));
            this.backgroundObjects.push(new BackgroundObject("img/Background_City/city 1/4_shadow_skyline.png", 299 * i, 0, false, null, 0));
            this.backgroundObjects.push(new BackgroundObject("img/Background_City/city 1/5_skyline.png", 299 * i, 0, false, null, 0));
            this.backgroundObjects.push(new BackgroundObject("img/Background_City/city 1/6_smog.png", 299 * i, 0, true, "left", 0.022));
            this.backgroundObjects.push(new BackgroundObject("img/Background_City/city 1/7_cars.png", 299 * i, 0, true, "right", 0.01));
            this.backgroundObjects.push(new BackgroundObject("img/Background_City/city 1/8_skyscrappers.png", 299 * i - 1, 0, false, null));
            this.backgroundObjects.push(new BackgroundObject("img/Background_City/city 1/10_shops.png", 299 * i, 0, false, null, 0));
            this.backgroundObjects.push(new BackgroundObject("img/Background_City/city 1/9_smallsmog.png", 299 * i, 0, true, "right", 0.05));
        }

    }

    draw() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectToMap(this.backgroundObjects);
        this.addObjectToMap(this.clouds);
        this.addObjectToMap(this.enemies);
        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0);

        // const dpi = window.devicePixelRatio;
        // this.ctx.scale(dpi, dpi);

        let self = this;
        requestAnimationFrame(function () { self.draw(); });
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
        this.ctx.drawImage(mo.img, mo.posX, mo.posY, mo.width, mo.height);
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