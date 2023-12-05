/*----- constants -----*/
const ROWS = 5;
const COLUMNS = 5;
const COLORS = {
    normalTiles: "var(--tile)",
    toClickTiles: "var(--tile-highlight)",
};
const WINNINGCOUNT = 10;
const WINNINGTIME = 30;
const TILESCOUNT = 25;

/*----- state variables -----*/
let gameOver;
let tilesTapped;
let tileTimerInterval;
let tilesToBeTapped;

/*----- cached elements  -----*/
let boardEl = document.getElementById("board");
let scoreEl = document.getElementById("score");
let winningCountEl = document.getElementById("winningCount");
let totalTilesEl = document.getElementById("totalTiles");
let buttonEl = document.getElementsByTagName("button")[0];
let resultMessageEl = document.getElementById("resultMessage");

/*----- event listeners -----*/
boardEl.addEventListener("click", handleClick);
buttonEl.addEventListener("click", init);

/*----- functions -----*/
init();

function init() {
    resultMessageEl.style.display = "none";
    boardEl.style.display = "grid";
    gameOver = false;
    tilesTapped = 0;
    tilesToBeTapped = 0;
    winningCountEl.innerText = WINNINGCOUNT;
    for (let row = 0; row < ROWS; row++) {
        for (let column = 0; column < COLUMNS; column++) {
            let newTile = document.createElement("div");
            // newTile.style.backgroundColor = COLORS.normalTiles;
            newTile.className = "normal";
            newTile.id = `r${row}c${column}`;
            boardEl.append(newTile);
        }
    }
    clearInterval(tileTimerInterval);
    clearBoard();
    tileTimer();
    render();
}

function handleClick(e) {
    if (gameOver) return;
    if (e.target === boardEl) return;
    if (e.target.getAttribute("class") == "normal") {
        clearInterval(tileTimerInterval);
        displayLoss();
    };
    e.target.className = "normal";
    tilesTapped++;
    tilesToBeTapped--;
    render();
    checkForWin();
}

function checkForWin() {
    if (tilesTapped >= WINNINGCOUNT) {
        clearInterval(tileTimerInterval);
        displayWin();
    }
}

function displayWin() {
    console.log("Won!");
    gameOver = true;
    boardEl.style.display = "none";
    clearBoard();
    resultMessageEl.style.display = "block";
    resultMessageEl.innerHTML = "Congrats, you've won!";
}

function displayLoss() {
    console.log("Lost!");
    gameOver = true;
    boardEl.style.display = "none";
    clearBoard()
    resultMessageEl.style.display = "block";
    resultMessageEl.innerHTML = "Sorry, you've lost";
}

function tileTimer() {
    tileTimerInterval = setInterval(() => {
        let ranRow = Math.floor(Math.random() * ROWS);
        let ranCol = Math.floor(Math.random() * COLUMNS);
        while (
            document.getElementById(`r${ranRow}c${ranCol}`).className ==
            "toBeClicked"
        ) {
            if (tilesToBeTapped >= TILESCOUNT) return;
            ranRow = Math.floor(Math.random() * ROWS);
            ranCol = Math.floor(Math.random() * COLUMNS);
        }
        document.getElementById(`r${ranRow}c${ranCol}`).className =
            "toBeClicked";
        tilesToBeTapped++;
        render();
        if (tilesToBeTapped >= TILESCOUNT) {
            clearInterval(tileTimerInterval);
            displayLoss();
            return;
        }
    }, (WINNINGCOUNT / WINNINGTIME) * 1000);
}

function clearBoard() {
    for (let row = 0; row < ROWS; row++) {
        for (let column = 0; column < COLUMNS; column++) {
            let curTile = document.getElementById(`r${row}c${column}`);
            curTile.className = "normal";
        }
    }
    tilesToBeTapped = 0;
    render();
}

function render() {
    scoreEl.innerText = tilesTapped;
    totalTilesEl.innerText = tilesToBeTapped;
    for (let row = 0; row < ROWS; row++) {
        for (let column = 0; column < COLUMNS; column++) {
            let curTile = document.getElementById(`r${row}c${column}`);
            if (curTile.className == "normal") {
                curTile.style.backgroundColor = COLORS.normalTiles;
                curTile.style.width = "14vmin";
                curTile.style.height = "14vmin";
                curTile.style.margin = "1vmin";
            } else {
                // toBeClicked
                curTile.style.backgroundColor = COLORS.toClickTiles;
                curTile.style.width = "15vmin";
                curTile.style.height = "15vmin";
                curTile.style.margin = ".5vmin";
            }
        }
    }
}
