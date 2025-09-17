class World {
    character = new Player();
    enemies = [new Enemy()];
    clouds = [new Cloud()];
    backgroundObjects = [
        new BackgroundObject("img/Background_City/city 1/1.png"),
        new BackgroundObject("img/Background_City/city 1/2.png"),
        new BackgroundObject("img/Background_City/city 1/4.png"),
        new BackgroundObject("img/Background_City/city 1/5.png"),
        new BackgroundObject("img/Background_City/city 1/6.png"),
        new BackgroundObject("img/Background_City/city 1/7.png"),
        new BackgroundObject("img/Background_City/city 1/8.png"),
        new BackgroundObject("img/Background_City/city 1/9.png"),
        new BackgroundObject("img/Background_City/city 1/10.png"),
    ];
    canvas;
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        //scale up or down
        // this.ctx.scale(6.2, 6.2);
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addObjectToMap(this.backgroundObjects);
        this.addObjectToMap(this.clouds);
        this.addObjectToMap(this.enemies);
        this.addToMap(this.character);

        const dpi = window.devicePixelRatio;
        this.ctx.scale(dpi, dpi);

        let self = this;
        requestAnimationFrame(function () { self.draw(); });
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