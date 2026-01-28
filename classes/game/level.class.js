/**
 * Represents a game level.
 * Holds enemies, clouds, background objects and level boundaries.
 */
class Level {
    enemies;
    clouds;
    backgroundObjects;
    levelEndX = 2700;

    /**
     * Creates a new game level.
     *
     * @param {MovableObject[]} enemies - Array of enemies in the level
     * @param {Cloud[]} clouds - Array of cloud objects for the level
     * @param {BackgroundObject[]} backgroundObjects - Array of background objects
     */
    constructor(enemies, clouds, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}