let enemies = [];
let bgo = [];

/**
 * Creates the first level of the game.
 *
 * @returns {Level} The fully constructed level with enemies, clouds, and background objects
 */
function createLevel1() {
    enemies = [];
    bgo = [];
    createBackground(10);
    createEnemies(60);

    return new Level(
        enemies,
        [new Cloud(0), new Cloud(299), new Cloud(598)],
        bgo,
    );
}

/**
 * Populates the global `enemies` array.
 * Adds one EndBoss and a number of standard enemies.
 *
 * @param {number} times - Number of standard enemies to create
 */
function createEnemies(times) {
    enemies.push(new EndBoss());
    for (let i = 0; i < times; i++) {
        enemies.push(new Enemy(i, 750));
    }
}

/**
 * Populates the global `bgo` array with background objects.
 *
 * @param {number} times - Number of background segments to create
 */
function createBackground(times) {
    for (let i = -1; i < times; i++) {
        bgo.push(new BackgroundObject("img/Background_City/city 1/1_bg.png", 299 * i, 0, false, null, 0));
        bgo.push(new BackgroundObject("img/Background_City/city 1/2_sun.png", 299 * i, 0, false, null, 0));
        bgo.push(new BackgroundObject("img/Background_City/city 1/4_shadow_skyline.png", 299 * i, 0, false, null, 0));
        bgo.push(new BackgroundObject("img/Background_City/city 1/5_skyline.png", 299 * i, 0, false, null, 0));
        bgo.push(new BackgroundObject("img/Background_City/city 1/6_smog.png", 299 * i, 0, true, "left", 0.022));
        bgo.push(new BackgroundObject("img/Background_City/city 1/7_cars.png", 299 * i, 0, true, "right", 0.01));
        bgo.push(new BackgroundObject("img/Background_City/city 1/8_skyscrappers.png", 299 * i - 1, 0, false, null));
        bgo.push(new BackgroundObject("img/Background_City/city 1/10_shops.png", 299 * i, 0, false, null, 0));
        bgo.push(new BackgroundObject("img/Background_City/city 1/9_smallsmog.png", 299 * i, 0, true, "right", 0.05));
    }
}