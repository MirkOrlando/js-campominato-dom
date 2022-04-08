/* 
L'utente indica un livello di difficoltà in base al quale 
viene generata una griglia di gioco quadrata, 
in cui ogni cella contiene un numero tra quelli compresi in un range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49
Il computer deve generare 16 numeri casuali nello stesso range 
della difficoltà prescelta: le bombe.
I numeri nella lista delle bombe non possono essere duplicati.
In seguito l'utente clicca su una cella:
se il numero è presente nella lista dei numeri generati - 
abbiamo calpestato una bomba
la cella si colora di rosso e la partita termina,
altrimenti la cella cliccata si colora di azzurro e 
l'utente può continuare a cliccare sulle altre celle.
La partita termina quando:
- il giocatore clicca su una bomba;
- o raggiunge il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve comunicare il punteggio, 
cioè il numero di volte che l’utente ha cliccato su una cella 
che non era una bomba.
*/

/* 1. creare la griglia al click di play 
con un numero di celle stabilito dalla difficoltà*/
// - inizializzare una variabile per il form
const formElement = document.querySelector("form");
// - inizializzare in una variabile l'elemento dalla DOM in cui inserirò la griglia
const gameBoardElement = document.querySelector(".game_board");
// - aggiungere un evento all'invio del form
formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  //console.log("hai cliccato play");
  //console.log(event);
  // - inizializzare una variabile per le option disponibili
  const difficulty = document.getElementById("difficulty").value;
  //console.log(difficulty);
  // - individuare quante celle ha la griglia
  let totalCellsNumber;
  if (difficulty == 1) {
    gameBoardElement.classList.add("easy");
    totalCellsNumber = 100;
  } else if (difficulty == 2) {
    gameBoardElement.classList.add("medium");
    totalCellsNumber = 81;
  } else if (difficulty == 3) {
    gameBoardElement.classList.add("hard");
    totalCellsNumber = 49;
  }
  //console.log(gameBoardElement, totalCellsNumber);
  // - generare la griglia
  generateGrid(gameBoardElement, totalCellsNumber);
  /* 2. generare la lista delle bombe */
  const bombs = generateBombs(16, totalCellsNumber);
  console.log(bombs.sort((a, b) => a - b));
  const maxPoints = totalCellsNumber - bombs.length;
  console.log(maxPoints);
  /* 3. aggiungere un evento al click su una cella:
  se il numero è presente nella lista dei numeri generati, abbiamo calpestato una bomba:
  la cella si colora di rosso e la partita termina;
  altrimenti la cella cliccata si colora di azzurro e 
  l'utente può continuare a cliccare sulle altre celle. */
  // inizializzare in una variabile (array) tutte le celle della griglia
  const cells = document.querySelectorAll(".cell");
  const attempts = [];
  //console.log(cells);
  // ciclare tutte le celle della griglia
  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    // aggiungere un evento al click su una cella
    cell.bombs = bombs;
    cell.attempts = attempts;
    cell.maxPoints = maxPoints;
    cell.addEventListener("click", clickOnACell);
  }
});

/* functions */

function gameOver(bombs, attempts, maxPoints) {
  // - inizializzare una variabile (tipo array) che contenga tutte le celle
  const cells = document.querySelectorAll(".cell");
  //console.log(cells);
  // - ciclare le celle
  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    const cellNumber = Number(cell.innerHTML);
    console.log(cellNumber, typeof cellNumber);
    // - rivelare tutte le celle che contengono una bomba
    if (bombs.includes(cellNumber)) {
      cell.classList.add("bomb");
    }
    cell.removeEventListener("click", clickOnACell);
  }
  // - mostrare un alert con il punteggio
  alert(`Punteggio: ${attempts.length}/${maxPoints}`);
  // - rimuovere l'evente al click della cella
  console.log(this);
}

function clickOnACell(event) {
  //console.log(event);
  //console.log(event.target.bombs);
  //console.log("hai cliccato su una cella!");
  //console.log(this);
  // - verificare se contine una bomba oppure è "libera"
  //console.log(this.innerHTML);
  const bombs = event.target.bombs;
  const attempts = event.target.attempts;
  const maxPoints = event.target.maxPoints;
  const cellNumber = Number(this.innerHTML);
  if (bombs.includes(cellNumber)) {
    this.classList.add("bomb");
    console.log("game over");
    gameOver(bombs, attempts, maxPoints);
  } else if (!attempts.includes(cellNumber)) {
    this.classList.add("active");
    attempts.push(cellNumber);
    if (attempts.length == maxPoints) {
      gameOver(bombs, attempts, maxPoints);
    }
  }
  console.log(attempts);
}

function generateGrid(cellContainerElement, totalCellsNumber) {
  cellContainerElement.innerHTML = "";
  // - creare un ciclo che si ripeterà per il numero di celle che dovrò creare
  for (let i = 1; i <= totalCellsNumber; i++) {
    //console.log(i);
    //const totalCellsNumber = i + 1;
    //console.log(totalCellsNumber);
    // - creare una cella
    // - assegnare ad ogni cella il proprio numero (visibile o no)
    const cell = `<div class="cell">${i}</div>`;
    //console.log(cell);
    cellContainerElement.insertAdjacentHTML("beforeend", cell);
  }
}

/**
 *
 * Generate a random number value included
 * between the minimum and maximum
 * values indicated in the params.
 * This function includes the extremes.
 * @param {number} min A number value that indicates the minimum value
 * @param {number} max A number value that indicates the maximum value
 * @returns {number}
 */
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createAlert(message) {
  const body = document.querySelector("body");
  const divAlert = document.createElement("div");
  const divAlertMessage = document.createElement("div");
  const divDark = document.createElement("div");
  const btnExit = document.createElement("button");
  divAlert.classList.add("alert");
  divAlertMessage.classList.add("alert_message");
  btnExit.classList.add("exit");
  divDark.classList.add("dark");
  body.insertAdjacentElement("afterbegin", divAlert);
  body.insertAdjacentElement("afterbegin", divDark);
  divAlert.insertAdjacentElement("afterbegin", divAlertMessage).innerHTML =
    message;
  divAlert.insertAdjacentElement("afterbegin", btnExit).innerHTML = "OK";
  btnExit.addEventListener("click", function () {
    body.removeChild(divAlert);
    body.removeChild(divDark);
  });
}

function generateBombs(limit, totalCellsNumber) {
  const bombsNumbers = [];
  while (bombsNumbers.length !== limit) {
    const bombsNumber = getRndInteger(1, totalCellsNumber);
    if (!bombsNumbers.includes(bombsNumber)) {
      bombsNumbers.push(bombsNumber);
    }
  }
  return bombsNumbers;
}
