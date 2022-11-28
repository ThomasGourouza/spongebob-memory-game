const squares = getByClassName("square");

function playAi(name) {
  // TODO: make Bob and Carlos AI
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

// Carlos
const carlosMemory = [];
function playAiCarlos() {
  makeSquaresUncliquable();
  const cards = getCards();

  if (carlosMemory.length === 0) {
    const index1 = getRandomInt(0, cards.length - 1);
    let index2;
    do {
      index2 = getRandomInt(0, cards.length - 1);
    } while (index1 === index2);

    const firstCard = cards[index1];
    const secondCard = cards[index2];
    
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

function setEndgame(name) {
    getById(name).classList.add('lost');
}

function getCards() {
  return squares
    .filter((square) => square.classList.contains("hidden"))
    .map(
      (square) =>
        new Card(square.getAttribute("id"), square.getAttribute("name"))
    );
}
