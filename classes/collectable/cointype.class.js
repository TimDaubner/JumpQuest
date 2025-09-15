class CoinType extends Coin {
    value;
    speed;

    constructor(_value, _speed) {
        super();
        this.value = _value;
        this.speed = _speed;
    }

    callThisMethod() {
        console.log("this logout");
        //TODO - Collect Coin
        //TODO - Put Effect 
    }
}

