import {
    playerGameBoard,
    compGameBoard,
    game,
    gameAssetCreation,
} from "../script.js";
import Ship from "./ship.js";

export function createCells() {
    const playerGrid = document.querySelector("#playerGrid");
    const computerGrid = document.querySelector("#computerGrid");
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const cellP = document.createElement("div");
            cellP.setAttribute("data-px", `${i}`);
            cellP.setAttribute("data-py", `${j}`);
            cellP.classList.add("cell");
            playerGrid.append(cellP);
            const cellC = document.createElement("div");
            cellC.setAttribute("data-cx", `${i}`);
            cellC.setAttribute("data-cy", `${j}`);
            cellC.classList.add("cell");
            computerGrid.append(cellC);
        }
    }
    document
        .querySelector("#messages button")
        .addEventListener("click", handleReset);
}

export function handleAttackPlayer(x, y) {
    let classToAdd = "attacked-cell";
    if (compGameBoard.array[x][y] instanceof Ship) {
        classToAdd = "attacked-ship";
    }
    const computerCells = document.querySelectorAll("#computerGrid .cell");
    [...computerCells].forEach((cell) => {
        if (cell.dataset.cx == x && cell.dataset.cy == y) {
            cell.classList.add(classToAdd);
        }
    });
}
export function handleAttackComp(x, y) {
    let classToAdd = "attacked-cell";
    if (playerGameBoard.array[x][y] instanceof Ship) {
        classToAdd = "attacked-ship";
    }
    const playerCells = document.querySelectorAll("#playerGrid .cell");
    [...playerCells].forEach((cell) => {
        if (cell.dataset.px == x && cell.dataset.py == y) {
            cell.classList.add(classToAdd);
        }
    });
}

export function playerHasWon() {
    const message = document.querySelector("#winner");
    message.style.display = "flex";
    message.textContent = "Player Has Won";
}
export function computerHasWon() {
    const message = document.querySelector("#winner");
    message.style.display = "flex";
    message.textContent = "computer Has Won";
}

function handleReset() {
    document.querySelector("#end-screen").classList.add("invisible");
    playerGameBoard.array = [[], [], [], [], [], [], [], [], [], []];
    compGameBoard.array = [[], [], [], [], [], [], [], [], [], []];
    playerGameBoard.alreadyAttacked=[];
    compGameBoard.alreadyAttacked=[];
    playerGameBoard.missedHit=[];
    compGameBoard.missedHit=[];

    document.querySelector("#playerGrid").textContent = "";
    document.querySelector("#computerGrid").textContent = "";
    createCells();
    gameAssetCreation();
    game();
}
