//1. Html-elemente bringen
const cells =document.querySelectorAll(".cell");
const startBtn = document.getElementById ("start-btn");
const gameStatus = document.getElementById ("game-status");
const scoreX = document.getElementById ("score-x");
const scoreO = document.getElementById ("score-o");

//2.Variabeln
let board = [" "," "," "," "," "," "," "," "," "];
let WinsX = 0;
let WinsO = 0;
let currentPlayer= "X";
let gameActive = false;


//3 .Gewinnmöglichkeiten
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
];

// 4.Spiel starten 
function startGame() {

    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;

    for (let i = 0; i < cells.length; i++) {           //تفريغ المربعات
        cells[i].textContent = ""; //  alle Zellen leeren
    }

    gameStatus.textContent = "Player X's turn";
    startBtn.textContent = "Restart Game";  //durch klicken beginnt das Spiel nochmal 
}


/* 5. Spielfeld anklicken */
function play(index) {
    if (gameActive === false) {
        return;
    }
    if (board[index] !== "") {    //kann nicht auf eine bereits besetzte Zelle klicken
        return;
    }
    board[index] = currentPlayer;   //board[2] = "X"; store
    cells[index].textContent = currentPlayer; // zeigt das Symbol des Spielers auf der Seite an

    // التحقق من الفوز
    if (checkWinner() === true) {

        gameStatus.textContent = currentPlayer + " wins!";
        gameActive = false;

        updateScore();
        return;
    }


    // Überprüfen, ob das Spiel unentschieden endet
    if (board.includes("") === false) { //wird keine leeren Zellen gibt.

        gameStatus.textContent = "Draw!";
        gameActive = false;
        return;
    }


    // Spiel wechseln
    if (currentPlayer === "X") {
        currentPlayer = "O";
    } else {
        currentPlayer = "X";
    }

    gameStatus.textContent = "Player " + currentPlayer + "'s turn";
}


// 6. Gewinner prüfen
function checkWinner() {

    for (let i = 0; i < winningCombinations.length; i++) {

        let combination = winningCombinations[i];  
        let a = combination[0];
        let b = combination[1];
        let c = combination[2];

        if (
            board[a] === currentPlayer &&
            board[b] === currentPlayer &&
            board[c] === currentPlayer
        ) {
            return true;
        }
    }

    return false;
}


// aktualisieren der Siege
function updateScore() {

    if (currentPlayer === "X") {

        WinsX++;
        scoreX.textContent = WinsX;

    } else {

        WinsO++;
        scoreO.textContent = WinsO;
    }
}


// Meldungen auf die Knöpfe
startBtn.addEventListener("click", startGame);

for (let i = 0; i < cells.length; i++) {

    cells[i].addEventListener("click", function () { // Anonyme Funktion: Führt play(i) erst beim Klick aus.
        play(i);
    });
}
