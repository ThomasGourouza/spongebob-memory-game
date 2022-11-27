/**
 * Document constants
 */
const player = getById("playerName");
const score = getById("PlayersScore");

/**
 * Variables
 */
let canPlay = false;
let player1 = {
  name: "Vika",
  score: 0,
};
let player2 = {
  name: "Tom",
  score: 0,
};
let currentPlayer;

/**
 * Constants
 */
const characters = [
  "bob",
  "carlos",
  "gary",
  "krabs",
  "patrick",
  "pearl",
  "plancton",
  "puff",
  "sandy",
];

/**
 * Game initialization
 */
initGame();

/**
 * Initialization function
 */
function initGame() {
  removeEndGame();
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
    img.src = `images/${randomCharacter}.png`;
    img.alt = randomCharacter;
    img.setAttribute("class", randomCharacter);
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
function setCurrentPlayerName(name) {
  currentPlayer = name;
  player.innerHTML = `Au tour de ${currentPlayer}.`;
}
function printScore() {
  score.innerHTML = `${player1.name}: ${player1.score} | ${player2.name}: ${player2.score}`;
}
function removeEndGame() {
  const bob = getById('bob');
  const patrick = getById('patrick');
  const carlos = getById('carlos');
  bob.classList.remove('lost');
  bob.classList.remove('win');
  patrick.classList.remove('lost');
  patrick.classList.remove('win');
  carlos.classList.remove('lost');
  carlos.classList.remove('win');
}
         