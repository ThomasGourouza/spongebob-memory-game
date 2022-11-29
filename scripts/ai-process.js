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
  let secondCard;
  let i;
  do {
    i = getRandomInt(0, cards.length - 1);
    secondCard = cards[i];
  } while (firstCard.name === secondCard.name);
  playAnimation(name, firstCard, secondCard);
}

function playAiCarlos(name) {
  const cards = getCards();
  let firstCard;
  let secondCard;
  // Si mémoire vide
  if (carlosMemory.length === 0) {
    firstCard = getRandomItem(cards);
    do {
      secondCard = getRandomItem(cards);
    } while (firstCard.id === secondCard.id);
  } else {
    // si deux cartes de meme name dans la mémoire, les jouer
    const winCards = carlosMemory.filter((card) =>
      carlosMemory
        .filter((c) => c.id !== card.id)
        .map((c) => c.name)
        .includes(card.name)
    );
    if (winCards.length > 1) {
      firstCard = getRandomItem(winCards);
      secondCard = winCards.find(
        (card) => card.id !== firstCard.id && card.name === firstCard.name
      );
    } else {
      // sinon jouer la première au hasard
      firstCard = getRandomItem(cards);
      secondCard = carlosMemory.find(
        (card) => card.id !== firstCard.id && card.name === firstCard.name
      );
      // si la deuxième du même name n'est pas dans la mémoire, jouer la deuxième au hasard
      if (!secondCard) {
        do {
          secondCard = getRandomItem(cards);
        } while (firstCard.id === secondCard.id);
      }
    }
  }
  playAnimation(name, firstCard, secondCard);
}

function playGod(name) {
  const cards = getCards();
  const winCards = cards.filter((card) =>
    cards
      .filter((c) => c.id !== card.id)
      .map((c) => c.name)
      .includes(card.name)
  );
  const firstCard = getRandomItem(winCards);
  const secondCard = winCards.find(
    (card) => card.id !== firstCard.id && card.name === firstCard.name
  );
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
