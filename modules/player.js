import { playerGameBoard, compGameBoard } from "../script.js";

export default class Player {
    constructor(name, gameboard) {
        this.name = name;
        this.gameboard = gameboard;
    }

    attack(x, y) {
        compGameBoard.receiveAttack(x, y);
    }
}

export class Computer extends Player {
    attack() {
        let isAlreadyAttacked = true;
        let x, y;
        while (isAlreadyAttacked) {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
            isAlreadyAttacked = playerGameBoard.alreadyAttacked.some(
                (obj) => obj.x == x && obj.y == y
            );
        }
        playerGameBoard.receiveAttack(x, y);
        playerGameBoard.alreadyAttacked.push({ x, y });
        console.log("computer attacked at", x, y);
        return { x, y };
    }
}
