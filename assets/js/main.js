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

const formElement = document.querySelector("form");
const submitElement = document.querySelector("form button");
/* create the difficulty levels */
formElement.addEventListener("submit", function (event) {
  event.preventDefault();
  const difficulty = parseInt(event.target[0].value);
  const containerElement = document.querySelector(".container");
  let colsNumber = 0;
  if (difficulty === 1) {
    containerElement.classList.add("easy");
    colsNumber = 100;
  } else if (difficulty === 2) {
    containerElement.classList.add("medium");
    colsNumber = 81;
  } else if (difficulty === 3) {
    containerElement.classList.add("hard");
    colsNumber = 49;
  }
  /* create the grid */
  /* create numbers in each cell */
  createGrid(".row", colsNumber, "div", "col", "span");
  /* generate bombs numbers */
  // console.log(generateBombs(16, colsNumber));
  /* create "on click" effect */
  selectElementByClick(".col", colsNumber, "bomb", "active");
});

/* functions */
/**
 * Grid generator
 * @param {string} selector a css selector to define the container of the grid
 * @param {number} limit a number value that indicates the total number of the cells of the grid
 * @param {string} tagName an HTML element tag to define the HTML element for each cell
 * @param {string} className a css selector to add some style to the new cells (optional)
 * @param {string} tagNameNumberContainer an HTML element tag to define the HTML element where will be put the cell number
 */
function createGrid(
  selector,
  limit,
  tagName,
  className,
  tagNameNumberContainer
) {
  const rowElement = document.querySelector(selector);
  rowElement.innerHTML = "";

  for (let i = 1; i <= limit; i++) {
    const colElement = document.createElement(tagName);
    colElement.classList.add(className);
    rowElement.append(colElement);
    const numberContainer = document.createElement(tagNameNumberContainer);
    numberContainer.append(i);
    colElement.append(numberContainer);
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

function selectElementByClick(
  selector,
  colsNumber,
  classNameBomb,
  classNameSafe
) {
  const cols = document.querySelectorAll(selector);
  const bombsNumbers = generateBombs(16, colsNumber);
  console.log(
    bombsNumbers.sort(function (a, b) {
      return a - b;
    })
  );
  let safeClickSum = 0;
  const maxClicks = colsNumber - 16;
  // console.log(maxClicks);

  for (let i = 1; i <= colsNumber; i++) {
    const col = cols[i - 1];
    const colsClicked = [];
    // console.log(col);
    col.addEventListener("click", function () {
      if (!colsClicked.includes(i)) {
        if (bombsNumbers.includes(i)) {
          this.classList.add(classNameBomb);
          colsClicked.push(i);
          // console.log(i);
          let j = 0;
          while (j < bombsNumbers.length) {
            for (let i = 1; i <= colsNumber; i++) {
              const col = cols[i - 1];
              if (bombsNumbers.includes(i)) {
                col.classList.add(classNameBomb);
              }
            }
            j++;
          }
          for (let i = 1; i <= cols.length; i++) {
            console.log(col);
            col.classList.add("unable_click");
          }
          const message = `Oh no! Hai schiacciato una bomba e hai perso!<br>Punteggio: ${safeClickSum}`;
          createAlert(message);
          // console.log(safeClickSum);
        } else {
          this.classList.add(classNameSafe);
          colsClicked.push(i);
          safeClickSum++;
          // console.log(i);
          // console.log(safeClickSum);
          if (safeClickSum === maxClicks) {
            const message = `Complimenti! Sei passato su tutte le caselle prive di bomba e hai vinto.<br>Punteggio: ${safeClickSum}`;
            createAlert(message);
            // console.log(safeClickSum);
          }
        }
      }
    });
  }
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

function generateBombs(limit, colsNumber) {
  const bombsNumbers = [];
  while (bombsNumbers.length !== limit) {
    const bombsNumber = getRndInteger(1, colsNumber);
    if (!bombsNumbers.includes(bombsNumber)) {
      bombsNumbers.push(bombsNumber);
    }
  }
  return bombsNumbers;
}
