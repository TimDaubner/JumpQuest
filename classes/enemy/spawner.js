/**
 * Spawns a new enemy at a fixed position every 5 seconds.
 * Enemies move normally (not inverted).
 */
function spawnEnemy() {
    let counter = 0;
    intervals.push(setInterval(() => {
        enemies.push(new Enemy(100 + counter, 3000,false));
    }, 5000))
}

/**
 * Spawns a new enemy during late game every 5 seconds.
 * These enemies start at X=0 and move inverted (to the right).
 */
function spawnLateGameEnemy(){
    let counter = 0;
    intervals.push(setInterval(() => {
        enemies.push(new Enemy(100 + counter, 0,true));
    }, 5000))
}