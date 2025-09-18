class World {
    character = new Player();
    enemies = [new Enemy(), new Enemy(), new Enemy()];
    clouds = [new Cloud(0), new Cloud(299), new Cloud(598)];
    backgroundObjects = [
        new BackgroundObject("img/Background_City/city 1/1_bg.png", 0, 0),
        new BackgroundObject("img/Background_City/city 1/2_sun.png", 0, 0),
        new BackgroundObject("img/Background_City/city 1/4_shadow_skyline.png", 0, 0),
        new BackgroundObject("img/Background_City/city 1/5_skyline.png", 0, 0),
        new BackgroundObject("img/Background_City/city 1/6_smog.png", 0, 0),
        new BackgroundObject("img/Background_City/city 1/7_cars.png", -25, 0),
        new BackgroundObject("img/Background_City/city 1/8_skyscrappers.png", 0, 0),
        new BackgroundObject("img/Background_City/city 1/10_shops.png", 100, 0),
        new BackgroundObject("img/Background_City/city 1/9_smallsmog.png", 0, 0),
    ];
    canvas;
    ctx;
    controller;

    constructor(canvas, controller) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.controller = controller;
        //scale up or down
        // this.ctx.scale(6.2, 6.2);
        this.draw();
        this.setWorld();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addObjectToMap(this.backgroundObjects);
        this.addObjectToMap(this.clouds);
        this.addObjectToMap(this.enemies);
        this.addToMap(this.character);

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
        this.ctx.drawImage(mo.img, mo.posX, mo.posY, mo.width, mo.height);
    }
}