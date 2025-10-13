function spawnEnemy() {
    let counter = 0;
    intervals.push(setInterval(() => {
        enemies.push(new Enemy(100 + counter, 3000));
    }, 5000))
}