class World {
    character = new Player();
    enemy = new Enemy();
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
        this.backgroundObjects.forEach(backgroundElement => {
            this.addToMap(backgroundElement);
        });

        this.ctx.drawImage(this.clouds[0].img, this.clouds[0].posX, this.clouds[0].posY, this.clouds[0].width, this.clouds[0].height);
        this.ctx.drawImage(this.enemy.img, this.enemy.posX, this.enemy.posY - 30, 128 * 1.4, 128 * 1.4);
        this.ctx.drawImage(this.character.img, this.character.posX, this.character.posY - 105, 25.6 * 10, 25.6 * 10);

        const dpi = window.devicePixelRatio;
        this.ctx.scale(dpi, dpi);

        let self = this;
        requestAnimationFrame(function () { self.draw(); });
    }

    addToMap(mo) {
        this.ctx.drawImage(mo.img, mo.posX, mo.posY, mo.width, mo.height);
    }
}