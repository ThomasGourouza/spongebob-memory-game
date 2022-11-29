const squares = getByClassName("square");

function playAi(name) {
  switch (name) {
    case "bob":
    case "carlos":
      return playAiWithMemory();
    case "patrick":
      return playAiPatrick();
    default:
      return playGod();
  }
}

function playAiPatrick() {
  const cards = getCards();
  const firstCard = getRandomItem(cards);
  const secondCard = getRandomWrongCardFromIn(firstCard, cards);
  playAnimation(firstCard, secondCard);
}

function playAiWithMemory() {
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
      firstCard = getRandomItem(cards);
      secondCard = getMatchingCardToIn(firstCard, gameMemory);
      if (!secondCard) {
        secondCard = getRandomCardDifferentFromIn(firstCard, cards);
      }
    }
  }
  playAnimation(firstCard, secondCard);
}

function playGod() {
  const winCards = getWinCardsFrom(getCards());
  const firstCard = getRandomItem(winCards);
  const secondCard = getMatchingCardToIn(firstCard, winCards);
  playAnimation(firstCard, secondCard);
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
