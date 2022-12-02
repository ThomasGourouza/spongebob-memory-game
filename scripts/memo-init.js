/**
 * Document constants
 */
const player = getById("playerName");
const score = getById("PlayersScore");
const bob = getById("bob");
const patrick = getById("patrick");
const squidward = getById("squidward");
const plankton = getById("plankton");
const bubblePlankton = getById("bubblePlankton");

/**
 * Constants
 */
const player1Name = (getById("player1").value = "Vika");
const player2Name = (getById("player2").value = "Tom");
const player1 = new Player(player1Name);
const player2 = new Player(player2Name);
const ai = new Ai();
const characters = [
  "bob",
  "squidward",
  "gary",
  "krabs",
  "patrick",
  "pearl",
  "plankton",
  "puff",
  "sandy",
];

/**
 * Variables
 */
let canPlay = false;
let currentPlayer;
let firstSelectedSquareId = 0;
let gameMemory = [];

/**
 * Game initialization
 */
initGame();

/**
 * Initialization function
 */
function initGame() {
  makeSquaresCliquable();
  checkNameEmpty();
  removeEndGame();
  gameMemory = [];
  firstSelectedSquareId = 0;
  const squares = getByClassName("square");
  let intAlreadyChoosen = [];
  let randomInt;

  squares.forEach((square) => {
    if (intAlreadyChoosen.length > 8) {
      intAlreadyChoosen = [];
    }
    do {
      randomInt = getRandomInt(0, 8);
    } while (intAlreadyChoosen.includes(randomInt));

    intAlreadyChoosen.push(randomInt);
    const randomCharacter = characters[randomInt];
    square.setAttribute("name", randomCharacter);
    square.classList.add("hidden");
    square.classList.remove("alone");
    square.classList.remove("player1");
    square.classList.remove("player2");

    const img = createElement("img");
    img.src = `images/cards/${randomCharacter}.png`;
    img.alt = randomCharacter;
    img.className = randomCharacter;
    if (square.firstChild) {
      square.removeChild(square.firstChild);
    }
    square.appendChild(img);
  });
  canPlay = true;
  player1.score = 0;
  player2.score = 0;
  setCurrentPlayerName(player1.name);
  printScore();
}

/**
 * Helper functions
 */
function checkNameEmpty() {
  const name1 = getById("player1").value;
  const name2 = getById("player2").value;
  if ([name1, name2].includes("")) {
    getById("newGameVersus").disabled = true;
  }
}

function setCurrentPlayerName(name) {
  currentPlayer = name;
  player.innerHTML = `${currentPlayer} is playing.`;
  if (
    ai.versus &&
    ["Patrick", "Bob", "Squidward", "Plankton"].includes(player2.name)
  ) {
    player2.name = "Tom";
    ai.versus = false;
  }
  getById("player2").value = player2.name;
}
function printScore() {
  score.innerHTML = `${player1.name}: ${player1.score} | ${player2.name}: ${player2.score}`;
}
function removeEndGame() {
  bob.classList.remove("lost");
  bob.classList.remove("won");
  patrick.classList.remove("lost");
  squidward.classList.remove("lost");
  squidward.classList.remove("won");
  if (ai.enabled) {
    plankton.classList.remove("leaving");
  }
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
