class MovableObject {
    posX = 0;
    posY = 0;
    img;
    imgCache = {};
    speed = 0.15;

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

    moveRight() {
        console.log("moving right!");
    }

    moveLeft() {
        setInterval(() => {
            this.posX -= this.speed;
        }, 1000 / 60);
    }
}