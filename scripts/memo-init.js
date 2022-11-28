/**
 * Document constants
 */
const player = getById("playerName");
const score = getById("PlayersScore");

/**
 * Constants
 */
const player1Name = (getById("player1").value = "Vika");
const player2Name = (getById("player2").value = "Tom");
const player1 = new Player(player1Name, 0);
const player2 = new Player(player2Name, 0);
const ai = new Ai(false, undefined);
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
 * Variables
 */
let canPlay = false;
let currentPlayer;
let firstSelectedSquareId = 0;

/**
 * Game initialization
 */
initGame();

/**
 * Initialization function
 */
function initGame() {
  checkNameEmpty();
  removeEndGame();
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
function checkNameEmpty() {
  const name1 = getById("player1").value;
  const name2 = getById("player2").value;
  getById("newGameVersus").disabled = [name1, name2].includes("") || ai.enabled;
}

function setCurrentPlayerName(name) {
  currentPlayer = name;
  player.innerHTML = `Waiting for ${currentPlayer}.`;
}
function printScore() {
  score.innerHTML = `${player1.name}: ${player1.score} | ${player2.name}: ${player2.score}`;
}
function removeEndGame() {
  const bob = getById("bob");
  const patrick = getById("patrick");
  const carlos = getById("carlos");
  bob.classList.remove("lost");
  bob.classList.remove("win");
  patrick.classList.remove("lost");
  patrick.classList.remove("win");
  carlos.classList.remove("lost");
  carlos.classList.remove("win");
}
