/*----- constants -----*/
const ROWS = 5;
const COLUMNS = 5;
const COLORS = {
    background: "black",
    text: "white",
    normalTiles: "lightgray",
    toClickTiles: "cadetblue",
};
const WINNINGCOUNT = 30;
const WINNINGTIME = 60;
// const MAXTILETIME = 0.5;
// winning time: TBD amount of seconds

/*----- state variables -----*/
let squaresClicked;
let won = false;
// let ranRow = 0;
// let ranCol = 0;
// board = 2d array (size tbd)

/*----- cached elements  -----*/
let boardEl = document.getElementById("board");

/*----- event listeners -----*/
boardEl.addEventListener("click", handleClick);

/*----- functions -----*/
init();

// window.location.href = "/game-html/game.html";

function init() {
    squaresClicked = 0;

    for (let row = 0; row < ROWS; row++) {
        for (let column = 0; column < COLUMNS; column++) {
            let newTile = document.createElement("div");
            // newTile.style.backgroundColor = COLORS.normalTiles;
            newTile.className = "normal";
            newTile.id = `r${row}c${column}`;
            boardEl.append(newTile);
        }
    }
    tileTimer();
    render();
}

function handleClick(e) {
    if (e.target === boardEl) return;
    console.log(e.target.getAttribute("id"));
    e.target.className = "normal";
    render();
}

function tileTimer() {
    setInterval(() => {
    let ranRow = Math.floor(Math.random() * (ROWS));
    let ranCol = Math.floor(Math.random() * (COLUMNS));
    while (document.getElementById(`r${ranRow}c${ranCol}`).className == "toBeClicked") {
        ranRow = Math.floor(Math.random() * (ROWS));
        ranCol = Math.floor(Math.random() * (COLUMNS));
    };
    document.getElementById(`r${ranRow}c${ranCol}`).className =
        "toBeClicked";
    render();
    }, (WINNINGCOUNT / WINNINGTIME) * 1000);
}

function render() {
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
