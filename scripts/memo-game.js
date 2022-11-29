/**
 * Constants
 */
const timeToMemorize = 2000;
const timeBeforeRevealEndGame = 500;

/**
 * Event function
 */
function showPicture(div) {
  gameProcess(div, true);
}
function gameProcess(div, allowAI) {
  const id = div.getAttribute("id");
  if (
    firstSelectedSquareId === id ||
    !div.classList.contains("hidden") ||
    canPlay === false
  ) {
    return false;
  }
  if (ai.enabled) {
    fillMemory(ai.name, div);
  }
  div.classList.remove("hidden");
  if (firstSelectedSquareId === 0) {
    firstSelectedSquareId = id;
    return false;
  }
  const firstSelectedSquare = getById(firstSelectedSquareId);
  firstSelectedSquareId = 0;
  if (firstSelectedSquare.getAttribute("name") === div.getAttribute("name")) {
    incrementScoreOfCurrentPlayer();
    setColorOnSquares(firstSelectedSquare, div);
    const remainingSquares = getByClassName("hidden");
    if (remainingSquares.length === 2) {
      endOfGame(remainingSquares);
    }
    return remainingSquares.length > 2;
  }
  canPlay = false;
  makeSquaresUncliquable();
  setTimeout(() => {
    setCurrentPlayerName(getNextPlayerName());
    firstSelectedSquare.classList.add("hidden");
    div.classList.add("hidden");
    canPlay = true;
    if (ai.enabled && allowAI) {
      playAi(ai.name);
    } else {
      makeSquaresCliquable();
    }
  }, timeToMemorize);
  return false;
}

/**
 * Helper functions
 */
function fillMemory(name, div) {
  if (!["bob", "carlos"].includes(name)) {
    return;
  }
  const card = new Card(div.getAttribute("id"), div.getAttribute("name"));
  if (!isCardInArray(card, gameMemory)) {
    if (name === "bob" && gameMemory.length > 3) {
      gameMemory.shift();
    }
    gameMemory.push(card);
  }
}

function isCardInArray(card, array) {
  return array.map((c) => c.id).includes(card.id);
}

function endOfGame(remainingSquares) {
  setTimeout(() => {
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
  }, timeBeforeRevealEndGame);
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
  player.innerHTML = `Congratulations ${name}!`;
}
