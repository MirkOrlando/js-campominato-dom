/* 
L'utente indica un livello di difficoltà in base al quale 
viene generata una griglia di gioco quadrata, 
in cui ogni cella contiene un numero tra quelli compresi in un range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49
Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro.
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
  createGrid(".row", colsNumber, "div", "col");
  /* create numbers in each cell */
  generateCellsNumbers(colsNumber, ".col", "span");
  /* create "on click" effect */
  selectElementByClick(".col", "active");
});
/* functions */
/**
 * Grid generator
 * @param {string} selector a css selector to define the container of the grid
 * @param {number} limit a number value that indicates the total number of the cells of the grid
 * @param {string} tagName an HTML element tag to define the HTML element for each cell
 * @param {string} className a css selector to add some style to the new cells (optional)
 */
function createGrid(selector, limit, tagName, className) {
  const rowElement = document.querySelector(selector);
  rowElement.innerHTML = "";

  for (let i = 0; i < limit; i++) {
    const colElement = document.createElement(tagName);
    colElement.classList.add(className);
    rowElement.append(colElement);
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

function selectElementByClick(selector, className) {
  const cols = document.querySelectorAll(selector);

  for (let i = 0; i < cols.length; i++) {
    const col = cols[i];
    col.addEventListener("click", function () {
      this.classList.add(className);
    });
  }
}

function generateCellsNumbers(limit, selector, tagName) {
  const randomNumbers = [];
  while (randomNumbers.length !== limit) {
    const randomnumber = getRndInteger(1, limit);
    if (!randomNumbers.includes(randomnumber)) {
      randomNumbers.push(randomnumber);
    }
  }
  console.log(randomNumbers.length);
  const cols = document.querySelectorAll(selector);
  for (let i = 0; i < limit; i++) {
    const col = cols[i];
    const spanElement = document.createElement(tagName);
    spanElement.append(randomNumbers[i]);
    col.append(spanElement);
  }
}
