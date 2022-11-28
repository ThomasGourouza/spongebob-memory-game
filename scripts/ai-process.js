const squares = getByClassName("square");

function playAi(name) {
  switch (name) {
    case "bob":
    case "patrick":
      return playAiPatrick();
    case "carlos":
      return playAiCarlos();
    default:
      return;
  }
}

function playAiPatrick() {
  const cards = getCards();
  const firstCard = getRandomItem(cards);
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
  }, 2000 + timeToMemorize);
}

// Carlos
const carlosMemory = [];

function playAiCarlos() {
  console.log(carlosMemory);
  const cards = getCards();
  // Si mémoire vide
  if (carlosMemory.length === 0) {
    const index1 = getRandomInt(0, cards.length - 1);
    let index2;
    do {
      index2 = getRandomInt(0, cards.length - 1);
    } while (index1 === index2);
    carlosMemory.push(cards[index1]);
    carlosMemory.push(cards[index2]);
    const firstSquare = getById(cards[index1].id);
    const secondSquare = getById(cards[index2].id);
    setTimeout(() => {
      gameProcess(firstSquare, false);
    }, 1000);
    setTimeout(() => {
      if (gameProcess(secondSquare, false)) {
        playAiCarlos();
      } else {
        setTimeout(() => {
          makeSquaresCliquable();
        }, timeToMemorize);
      }
    }, 2000);
  } else {
    // si deux cartes de meme name dans la mémoire, les jouer
    const winCards = carlosMemory.filter((card) =>
      carlosMemory
        .filter((c) => c.id !== card.id)
        .map((c) => c.name)
        .includes(card.name)
    );
    if (winCards.length > 1) {
      const firstCard = getRandomItem(winCards);
      const firstSquare = getById(firstCard.id);
      const secondSquare = getById(
        winCards.find(
          (card) => card.id !== firstCard.id && card.name === firstCard.name
        ).id
      );
      setTimeout(() => {
        gameProcess(firstSquare, false);
      }, 1000);
      setTimeout(() => {
        if (gameProcess(secondSquare, false)) {
          playAiCarlos();
        } else {
          setTimeout(() => {
            makeSquaresCliquable();
          }, timeToMemorize);
        }
      }, 2000);
    } else {
      // sinon jouer la première au hasard, puis si la deuxiéme du même name dans la mémoire la jouer
      const firstCard = getRandomItem(cards);
      carlosMemory.push(firstCard);
      const firstSquare = getById(firstCard.id);
      let secondCard = carlosMemory.find(
        (card) => card.id !== firstCard.id && card.name === firstCard.name
      );
      if (!!secondCard) {
        const secondSquare = getById(secondCard.id);
        setTimeout(() => {
          gameProcess(firstSquare, false);
        }, 1000);
        setTimeout(() => {
          if (gameProcess(secondSquare, false)) {
            playAiCarlos();
          } else {
            setTimeout(() => {
              makeSquaresCliquable();
            }, timeToMemorize);
          }
        }, 2000);
      } else {
        // sinon jouer aussi la deuxième au hasard
        let secondCard;
        do {
          secondCard = getRandomItem(cards);
        } while (firstSquare.id === secondCard.id);
        carlosMemory.push(secondCard);
        const secondSquare = getById(secondCard.id);
        setTimeout(() => {
          gameProcess(firstSquare, false);
        }, 1000);
        setTimeout(() => {
          if (gameProcess(secondSquare, false)) {
            playAiCarlos();
          } else {
            setTimeout(() => {
              makeSquaresCliquable();
            }, timeToMemorize);
          }
        }, 2000);
      }
    }
  }
}

function playGod() {
  const cards = getCards();
  const winCards = cards.filter((card) =>
    cards
      .filter((c) => c.id !== card.id)
      .map((c) => c.name)
      .includes(card.name)
  );
  const firstCard = getRandomItem(winCards);
  const firstSquare = getById(firstCard.id);
  const secondSquare = getById(
    winCards.find(
      (card) => card.id !== firstCard.id && card.name === firstCard.name
    ).id
  );
  setTimeout(() => {
    gameProcess(firstSquare, false);
  }, 1000);
  setTimeout(() => {
    if (gameProcess(secondSquare, false)) {
      playGod();
    } else {
      setTimeout(() => {
        makeSquaresCliquable();
      }, timeToMemorize);
    }
  }, 2000);
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
