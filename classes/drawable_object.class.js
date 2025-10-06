class DrawableObject {
    posX = 0;
    posY = 0;
    width = 0;
    height = 0;
    img;
    imgCache = {};

    loadImg(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImgs(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imgCache[path] = img;
        });
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Player || this instanceof Enemy || this instanceof EndBoss) {
            ctx.beginPath();
            ctx.lineWidth = 0.5;
            ctx.strokeStyle = 'red';
            ctx.rect(this.posX + this.offset.left, this.posY + this.offset.top, this.width / this.offset.sizeX, this.height / this.offset.sizeY);
            ctx.stroke();
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'green';
            ctx.rect(this.posX, this.posY, this.width, this.height);
            ctx.stroke();
        }
    }
}