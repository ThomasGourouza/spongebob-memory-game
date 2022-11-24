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
  const squares = getByClass("square");
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

    const img = createElement("img");
    img.src = `images/${randomCharacter}.png`;
    img.alt = randomCharacter;
    img.setAttribute("class", randomCharacter);
    square.appendChild(img);
  });

}

/**
 * Helper functions
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Helper Document functions
 */
function getByClass(name) {
  return [...document.getElementsByClassName(name)];
}
function createElement(elmt) {
  return document.createElement(elmt);
}
