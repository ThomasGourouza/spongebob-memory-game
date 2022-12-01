const squares = getByClassName("square");

function playAi(name) {
  switch (name) {
    case "bob":
    case "squidward":
    case "plankton":
      return playAiWithMemory(name);
    case "patrick":
      return playAiPatrick();
    default:
      return;
  }
}

function playAiPatrick() {
  const cards = getCards();
  const firstCard = getRandomItem(cards);
  const secondCard = getRandomWrongCardFromIn(firstCard, cards);
  playAnimation(firstCard, secondCard);
}

function playAiWithMemory(name) {
  const cards = getCards();
  let firstCard;
  let secondCard;
  if (gameMemory.length === 0) {
    firstCard = getRandomItem(cards);
    secondCard = getRandomCardDifferentFromIn(firstCard, cards);
  } else {
    const winCards = getWinCardsFrom(gameMemory);
    if (winCards.length > 1) {
      firstCard = getRandomItem(winCards);
      secondCard = getMatchingCardToIn(firstCard, winCards);
    } else {
      const strategy =
        name === "squidward"
          ? squidwardStrategy(cards)
          : planktonAndBobStrategy(cards);
      firstCard = strategy.firstCard;
      secondCard = strategy.secondCard;
    }
  }
  playAnimation(firstCard, secondCard);
}

function squidwardStrategy(cards) {
  const firstCard = getRandomItem(cards);
  return {
    firstCard,
    secondCard:
      getMatchingCardToIn(firstCard, gameMemory) ||
      getRandomCardDifferentFromIn(firstCard, cards),
  };
}

function planktonAndBobStrategy(cards) {
  const firstCard =
    getRandomItemInAndNotIn(cards, gameMemory) || getRandomItem(cards);
  return {
    firstCard,
    secondCard:
      getMatchingCardToIn(firstCard, gameMemory) ||
      getRandomCardDifferentFromIn(firstCard, gameMemory) ||
      getRandomCardDifferentFromIn(firstCard, cards),
  };
}

function playAnimation(firstCard, secondCard) {
  const firstSquare = getById(firstCard.id);
  const secondSquare = getById(secondCard.id);
  setTimeout(() => {
    gameProcess(firstSquare, false);
    setTimeout(() => {
      if (gameProcess(secondSquare, false)) {
        playAi(ai.name);
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
  return array.find((c) => c.id !== card.id && c.name === card.name);
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

function getRandomItemInAndNotIn(cards, gameMemory) {
  const possibilities = cards.filter(
    (card) => !gameMemory.map((c) => c.id).includes(card.id)
  );
  return getRandomItem(possibilities);
}

function getRandomItem(array) {
  return array[getRandomInt(0, array.length - 1)];
}

function setEndgamePicture(name) {
  if (name === "plankton") {
    plankton.classList.add("leaving");
    return;
  }
  if (isAIWinner()) {
    getById(name).classList.add("won");
  } else {
    getById(name).classList.add("lost");
  }
}

function getCards() {
  return squares
    .filter((square) => square.classList.contains("hidden"))
    .map(
      (square) =>
        new Card(square.getAttribute("id"), square.getAttribute("name"))
    );
}
