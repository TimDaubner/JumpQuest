function spawnEnemy() {
    let counter = 0;
    intervals.push(setInterval(() => {
        enemies.push(new Enemy(100 + counter, 3000,false));
    }, 5000))
}

function spawnLateGameEnemy(){
    let counter = 0;
    intervals.push(setInterval(() => {
        enemies.push(new Enemy(100 + counter, 0,true));
    }, 5000))
}