const squares = getByClassName("square");

function playAi(name) {
  switch (name) {
    case "bob":
    case "patrick":
      return playAiPatrick(name);
    case "carlos":
      return playAiCarlos(name);
    default:
      return playGod();
  }
}

function playAiPatrick(name) {
  const cards = getCards();
  const firstCard = getRandomItem(cards);
  const secondCard = getRandomWrongCardFromIn(firstCard, cards);
  playAnimation(name, firstCard, secondCard);
}

function playAiCarlos(name) {
  const cards = getCards();
  let firstCard;
  let secondCard;
  if (carlosMemory.length === 0) {
    firstCard = getRandomItem(cards);
    secondCard = getRandomCardDifferentFromIn(firstCard, cards);
  } else {
    const winCards = getWinCardsFrom(carlosMemory);
    if (winCards.length > 1) {
      firstCard = getRandomItem(winCards);
      secondCard = getMatchingCardToIn(firstCard, winCards);
    } else {
      firstCard = getRandomItem(cards);
      secondCard = getMatchingCardToIn(firstCard, carlosMemory);
      if (!secondCard) {
        secondCard = getRandomCardDifferentFromIn(firstCard, cards);
      }
    }
  }
  playAnimation(name, firstCard, secondCard);
}

function playGod(name) {
  const winCards = getWinCardsFrom(getCards());
  const firstCard = getRandomItem(winCards);
  const secondCard = getMatchingCardToIn(firstCard, winCards);
  playAnimation(name, firstCard, secondCard);
}

function playAnimation(name, firstCard, secondCard) {
  const firstSquare = getById(firstCard.id);
  const secondSquare = getById(secondCard.id);
  setTimeout(() => {
    gameProcess(firstSquare, false);
    setTimeout(() => {
      if (gameProcess(secondSquare, false)) {
        carlosMemory = carlosMemory.filter((card) => ![firstCard.id, secondCard.id].includes(card.id));
        playAi(name);
      } else {
        setTimeout(() => {
          makeSquaresCliquable();
        }, timeToMemorize);
      }
    }, 1000);
  }, 1000);
}

function getWinCardsFrom(array) {
  return array.filter((card) =>
      array
        .filter((c) => c.id !== card.id)
        .map((c) => c.name)
        .includes(card.name)
    );
}

function getMatchingCardToIn(card, array) {
  return array.find(
    (c) => c.id !== card.id && c.name === card.name
  );
}

function getRandomCardDifferentFromIn(card, array) {
  let randomCard;
  do {
    randomCard = getRandomItem(array);
  } while (randomCard.id === card.id);
  return randomCard;
}

function getRandomWrongCardFromIn(card, array) {
  let randomCard;
  do {
    randomCard = getRandomItem(array);
  } while (randomCard.name === card.name);
  return randomCard;
}

function getRandomItem(array) {
  return array[getRandomInt(0, array.length - 1)];
}

function setEndgame(name) {
  getById(name).classList.add("lost");
}

function getCards() {
  return squares
    .filter((square) => square.classList.contains("hidden"))
    .map(
      (square) =>
        new Card(square.getAttribute("id"), square.getAttribute("name"))
    );
}
