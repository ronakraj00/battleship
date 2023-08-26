import Ship from "./ship.js";

export default class GameBoard {
    array = [[], [], [], [], [], [], [], [], [], []];
    missedHit = [];
    alreadyAttacked = [];
    placeShip(ship,x, y) {
        console.log("placeShip",x,y);
        let length = ship.length;
        while (length--) {
            if (
                (ship.align === "vertical" && y + ship.length > 10) ||
                (ship.align === "horizontal" && x + ship.length > 10)
            ) {
                return;
            } else {
                if (ship.align === "vertical") this.array[x][y++] = ship;
                if (ship.align === "horizontal") this.array[x++][y] = ship;
            }
        }
    }

    receiveAttack(x, y) {
        let repeatedAttack = false;
        this.alreadyAttacked.forEach((ele) => {
            if (ele.x === x && ele.y === y) {
                console.log("already attacked");
                repeatedAttack = true;
            }
        });

        if(!repeatedAttack){
            if (this.array[x][y] instanceof Ship) {
                let ship = this.array[x][y];
                ship.hit();
                this.alreadyAttacked.push({ x, y });
                console.log(ship, this.alreadyAttacked);
            } else {
                let hitObject = { x, y };
                this.missedHit.push(hitObject);
                console.log(this.missedHit);
            }
        }
    }

    hasEveryShipSunk() {
        let allShipHasSunk = true;
        this.array.forEach((col) =>
            col.forEach((ele) => {
                if (ele instanceof Ship) {
                    if (!ele.isSunk()) {
                        allShipHasSunk = false;
                    }
                }
            })
        );
        return allShipHasSunk;
    }
}
