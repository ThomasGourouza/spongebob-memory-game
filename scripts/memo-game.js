/**
 * Document constants
 */
const player = getById("playerName");
const score = getById("PlayersScore");

/**
 * Constants
 */
const timeToMemorize = 2000;
const timeBeforeRevealEndGame = 500;

/**
 * Variables
 */
let firstSelectedSquareId = 0;
let canPlay = false;
let player1 = {
  name: "Vika",
  score: 0,
};
let player2 = {
  name: "Tom",
  score: 0,
};
let currentPlayer;

/**
 * Starts the game directly
 */
startGame();

/**
 * Event function
 */
function showPicture(div) {
  const id = div.getAttribute("id");
  if (
    firstSelectedSquareId === id ||
    !div.classList.contains("hidden") ||
    canPlay === false
  ) {
    return;
  }
  setImage(div);
  if (firstSelectedSquareId === 0) {
    firstSelectedSquareId = id;
  } else {
    const firstSelectedSquare = getById(firstSelectedSquareId);
    if (firstSelectedSquare.getAttribute("name") === div.getAttribute("name")) {
      firstSelectedSquare.classList.remove("hidden");
      div.classList.remove("hidden");
      incrementScoreOfCurrentPlayer();
      setTimeout(() => {
        checkEndOfGame();
      }, timeBeforeRevealEndGame);
    } else {
      canPlay = false;
      setTimeout(() => {
        removeImage(firstSelectedSquare);
        removeImage(div);
        canPlay = true;
        setCurrentPlayerName(getNextPlayerName());
      }, timeToMemorize);
    }
    firstSelectedSquareId = 0;
  }
}
function startGame() {
  canPlay = true;
  setCurrentPlayerName(player1.name);
  printScore();
}

/**
 * Helper functions
 */
function setImage(div) {
  const characterName = div.getAttribute("name");
  const img = createElement("img");
  img.src = `images/${characterName}.png`;
  img.alt = characterName;
  img.setAttribute("class", characterName);
  div.appendChild(img);
}
function removeImage(div) {
  const img = div.firstChild;
  div.removeChild(img);
}
function checkEndOfGame() {
  const remainingSquares = getByClassName("hidden");
  if (remainingSquares.length === 2) {
    const winner = getWinnerName();
    congratulatePlayer(winner);
    remainingSquares.forEach((square) => {
      setImage(square);
      square.classList.remove("hidden");
      square.classList.add("alone");
    });
  }
}
function incrementScoreOfCurrentPlayer() {
  getCurrentPlayer().score++;
  printScore();
}
function getCurrentPlayer() {
  return currentPlayer === player1.name ? player1 : player2;
}
function getNextPlayerName() {
  return currentPlayer === player1.name ? player2.name : player1.name;
}
function getWinnerName() {
  return player1.score > player2.score ? player1.name : player2.name;
}
function setCurrentPlayerName(name) {
  currentPlayer = name;
  player.innerHTML = `Au tour de ${currentPlayer}.`;
}
function congratulatePlayer(name) {
  player.innerHTML = `Bravo ${name}!`;
}
function printScore() {
  score.innerHTML = `${player1.name}: ${player1.score} | ${player2.name}: ${player2.score}`;
}

/**
 * Helper Document functions
 */
function getById(id) {
  return document.getElementById(id);
}
function getByClassName(name) {
  return [...document.getElementsByClassName(name)];
}
function createElement(elmt) {
  return document.createElement(elmt);
}
