export default class Ship {
    constructor(length, align = "vertical") {
        this.length = length;
        this.align = align;
    }

    noOfHit = 0;
    hasSunk = false;

    hit() {
        this.noOfHit++;
    }

    isSunk() {
        this.hasSunk = this.length === this.noOfHit ? true : false;
        return this.hasSunk;
    }
}
