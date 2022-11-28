/**
 * Constants
 */
const timeToMemorize = 2000;
const timeBeforeRevealEndGame = 500;

/**
 * Event function
 */
function showPicture(div) {
  gameProcess(div, ai);
}
function gameProcess(div, ai) {
  const id = div.getAttribute("id");
  if (
    firstSelectedSquareId === id ||
    !div.classList.contains("hidden") ||
    canPlay === false
  ) {
    return;
  }
  div.classList.remove("hidden");
  if (firstSelectedSquareId === 0) {
    firstSelectedSquareId = id;
  } else {
    const firstSelectedSquare = getById(firstSelectedSquareId);
    firstSelectedSquareId = 0;
    if (firstSelectedSquare.getAttribute("name") === div.getAttribute("name")) {
      incrementScoreOfCurrentPlayer();
      setColorOnSquares(firstSelectedSquare, div);
      setTimeout(() => {
        checkEndOfGame();
      }, timeBeforeRevealEndGame);
    } else {
      canPlay = false;
      makeSquaresUncliquable();
      setTimeout(() => {
        setCurrentPlayerName(getNextPlayerName());
        firstSelectedSquare.classList.add("hidden");
        div.classList.add("hidden");
        canPlay = true;
        if (ai.enabled) {
          playAi(ai.name);
        }
        makeSquaresCliquable();
      }, timeToMemorize);
    }
  }
}

/**
 * Helper functions
 */
function checkEndOfGame() {
  const remainingSquares = getByClassName("hidden");
  if (remainingSquares.length === 2) {
    const winner = getWinnerName();
    congratulatePlayer(winner);
    remainingSquares.forEach((square) => {
      square.classList.remove("hidden");
      square.classList.remove("hidden");
      square.classList.add("alone");
    });
    if (ai.enabled) {
      setEndgame(ai.name);
    }
  }
}
function setColorOnSquares(firstSelectedSquare, div) {
  firstSelectedSquare.classList.add(getPlayerClass());
  div.classList.add(getPlayerClass());
}
function incrementScoreOfCurrentPlayer() {
  getCurrentPlayer().score++;
  printScore();
}
function getCurrentPlayer() {
  return currentPlayer === player1.name ? player1 : player2;
}
function getPlayerClass() {
  return currentPlayer === player1.name ? "player1" : "player2";
}
function getNextPlayerName() {
  return currentPlayer === player1.name ? player2.name : player1.name;
}
function getWinnerName() {
  return player1.score > player2.score ? player1.name : player2.name;
}

function congratulatePlayer(name) {
  player.innerHTML = `Bravo ${name}!`;
}
function makeSquaresUncliquable() {
  getByClassName("square").forEach((square) => {
    square.style.zIndex = -1;
  });
}
function makeSquaresCliquable() {
  getByClassName("square").forEach((square) => {
    square.style.zIndex = 3;
  });
}
