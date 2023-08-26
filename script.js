import Ship from "./modules/ship.js";
import GameBoard from "./modules/gameboard.js";
import Player from "./modules/player.js";
import { Computer } from "./modules/player.js";
import {
    createCells,
    handleAttackPlayer,
    handleAttackComp,
    playerHasWon,
    computerHasWon,
} from "./modules/dom.js";

createCells();
let alreadyCreatedShip=[];
function createGameBoard() {
    let g1 = new GameBoard();
    return g1;
}
function createShip(length, align) {
    let s1 = new Ship(length);
    return s1;
}

export let playerGameBoard = createGameBoard();
export let compGameBoard = createGameBoard();
let comp = new Computer("comp", compGameBoard);
let player = new Player("ronak", playerGameBoard);

export function gameAssetCreation() {
    let playerShip1 = createShip(4);
    let playerShip2 = createShip(3);
    let playerShip3 = createShip(2);
    let playerShip4 = createShip(1);
    let compShip1 = createShip(4);
    let compShip2 = createShip(3);
    let compShip3 = createShip(2);
    let compShip4 = createShip(1);

    compGameBoard.placeShip(compShip1, 0,0);
    compGameBoard.placeShip(compShip2, 4,2);
    compGameBoard.placeShip(compShip3, 7,4);
    compGameBoard.placeShip(compShip4,2,5);
    playerGameBoard.placeShip(playerShip1, 0,0);
    playerGameBoard.placeShip(playerShip2, 4,2);
    playerGameBoard.placeShip(playerShip3, 7,4);
    playerGameBoard.placeShip(playerShip4, 2,5);
}

gameAssetCreation();

function randomNo() {
    let x=Math.floor(Math.random() * 9);
    let y=Math.floor(Math.random() * 9);
    alreadyCreatedShip.forEach(obj=>{
        if(obj.x==x&&obj.y==y){
            randomNo();
        }
    });
    alreadyCreatedShip.push({x,y});
    return {x,y};
}

export function game() {
    const computerCells = document.querySelectorAll("#computerGrid .cell");
    computerCells.forEach((cell) => {
        cell.addEventListener(
            "click",
            () => {
                console.log(cell.dataset.cx, cell.dataset.cy);
                player.attack(cell.dataset.cx, cell.dataset.cy);
                handleAttackPlayer(cell.dataset.cx, cell.dataset.cy);
                checkWinPlayer();
                playComputer();
            },
            { once: true }
        );
    });
    console.log("game is working");
}
game();

function playComputer() {
    let attackedObj = comp.attack();
    console.log("attacked obj", attackedObj.x, attackedObj.y);
    handleAttackComp(attackedObj.x, attackedObj.y);
    checkWinComp();
}

function checkWinPlayer() {
    if (compGameBoard.hasEveryShipSunk()) {
        playerHasWon();
        showEndScreen();
    }
}
function checkWinComp() {
    console.log("checkWinComp")
    if (playerGameBoard.hasEveryShipSunk()) {
        console.log("everyship has sunk")
        computerHasWon();
        showEndScreen();
    }
}
function showEndScreen() {
    document.querySelector("#end-screen").classList.remove("invisible");
    const messageDiv = document.querySelector("#messages");
    messageDiv.style.display = "flex";
}
