class MovableObject {
    posX = 0;
    posY = 0;
    img;

    loadImg(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {
        console.log("moving right!");
    }
}