/**
 * Document constants
 */
 const player = getById('playerName');
 const score = getById('PlayersScore');
 
/**
 * Constants
 */
 const characters = [
    'bob', 'carlos', 'gary', 'krabs', 'patrick', 'pearl', 'plancton', 'puff', 'sandy'
];

/**
 * Variables
 */
let firstSelectedSquareId = 0;
let canPlay = true;
let player1 = {
    name: 'Vika',
    score: 0
};
let player2 = {
    name: 'Tom',
    score: 0
};

/**
 * Game initialization
 */
initGame();

/**
 * Initialization function
 */
function initGame() {
    const squares = getByClassName('square');
    let intAlreadyChoosen = [];
    let randomInt;

    squares.forEach((square) => {
        if (intAlreadyChoosen.length > 8) {
            intAlreadyChoosen = [];
        }
        do {
            randomInt = getRandomInt(0, 8);
        } while(intAlreadyChoosen.includes(randomInt));

        intAlreadyChoosen.push(randomInt);
        const randomCharacter = characters[randomInt];
        square.setAttribute('name', randomCharacter);
    });
    player.innerHTML = nextPlayer(player1.name);
    score.innerHTML = printScore();
}

/**
 * Event function
 */
function showPicture(div) {
    const id = div.getAttribute('id');
    if (firstSelectedSquareId === id || !div.classList.contains('hidden') || canPlay === false) {
        return;
    }
    setImage(div);
    if (firstSelectedSquareId === 0) {
        firstSelectedSquareId = id;
    } else {
        const firstSelectedSquare = getById(firstSelectedSquareId);
        if (firstSelectedSquare.getAttribute('name') === div.getAttribute('name')) {
            firstSelectedSquare.classList.remove("hidden");
            div.classList.remove("hidden");
            incrementScoreOfCurrentPlayer();
            setTimeout(() => {
                checkEndOfGame();
            }, 500);
        } else {
            canPlay = false;
            setTimeout(() => {
                removeImage(firstSelectedSquare);
                removeImage(div);
                canPlay = true;
                const next = isCurrentPlayer1() ? player2.name : player1.name;
                player.innerHTML = nextPlayer(next);
            }, 2000);
        }
        firstSelectedSquareId = 0;
    }
}

/**
 * Helper functions
 */
function setImage(div) {
    const characterName = div.getAttribute('name');
    const img = createElement('img');
    img.src = `images/${characterName}.png`;
    img.alt = characterName;
    img.setAttribute('class', characterName);
    div.appendChild(img);
}
function removeImage(div) {
    const img = div.firstChild;
    div.removeChild(img);
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function checkEndOfGame() {
    const remainingSquares = getByClassName('hidden');
    if (remainingSquares.length === 2) {
        const current = isCurrentPlayer1() ? player1.name : player2.name;
        player.innerHTML = congratulatePlayer(current);
        remainingSquares.forEach((square) => {
            setImage(square);
            square.classList.remove("hidden");
            square.classList.add("alone");
        });
    }
}
function incrementScoreOfCurrentPlayer() {
    const currentPlayer = isCurrentPlayer1() ? player1 : player2;
    currentPlayer.score++;
    score.innerHTML = printScore();
}
function nextPlayer(name) {
    return `Au tour de ${name}.`;
}
function congratulatePlayer(name) {
    return `Bravo ${name}!`;
}
function printScore() {
    return `${player1.name}: ${player1.score} | ${player2.name}: ${player2.score}`;
}
function isCurrentPlayer1() {
    return player.innerHTML === nextPlayer(player1.name);
}

/**
 * Helper Document functions
 */
function getById(id) {
    return document.getElementById(id);
}
function getByClassName(name) {
    return [...document.getElementsByClassName(name)];
}
function createElement(elmt) {
    return document.createElement(elmt);
}
