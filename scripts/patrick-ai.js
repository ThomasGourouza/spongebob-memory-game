const squares = getByClassName("square");

function runPatrickAI(value) {
  player2 = {
    name: value ? "Patrick" : "Tom",
    score: 0,
  };
  aiPlay = value;
  initGame();
}

function playAiPatrick() {
  makeSquaresUncliquable();
  const cards = getCards();
  const index = getRandomInt(0, cards.length - 1);
  const firstCard = cards[index];
  let secondCard;
  let i;
  do {
    i = getRandomInt(0, cards.length - 1);
    secondCard = cards[i];
  } while (firstCard.name === secondCard.name);
  const firstSquare = getById(firstCard.id);
  const secondSquare = getById(secondCard.id);

  setTimeout(() => {
      gameProcess(firstSquare, false);
  }, 1000);
  setTimeout(() => {
      gameProcess(secondSquare, false);
  }, 2000);
  setTimeout(() => {
      makeSquaresCliquable();
  }, 3000);

}

function setPatrickEndgame() {
    getById('patrick').classList.add('endgame');
}

function getCards() {
  return squares
    .filter((square) => square.classList.contains("hidden"))
    .map(
      (square) =>
        new Card(square.getAttribute("id"), square.getAttribute("name"))
    );
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