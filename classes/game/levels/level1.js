let bgo = [];
const level1 = new Level(
    [new Enemy(), new Enemy(), new Enemy()],
    [new Cloud(0), new Cloud(299), new Cloud(598)],
    bgo,
);

function createBackground() {
    for (let i = -1; i < 10; i++) {
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