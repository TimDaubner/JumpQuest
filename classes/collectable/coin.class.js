let coinTypes = [
    {
        "name": "lightCoin",
        "value": "0.5",
        "speed": "1",
        "id": "coin_"
    },
    {
        "name": "MiddleCoin",
        "value": "1",
        "speed": "0.8",
        "id": "coin_"
    },
    {
        "name": "HeavyCoin",
        "value": "2.5",
        "speed": "0.6",
        "id": "coin_"
    },
];

let number = 0;
class Coin extends DrawableObject {
    name;
    id;

    constructor(_name, _id) {
        this.name = _name;
        this.id = _id + number;
        number++;
    }

    callThisMethod() {
        console.log("this logout");
        //TODO - Collect Coin
        //TODO - Put Effect 
    }
}

