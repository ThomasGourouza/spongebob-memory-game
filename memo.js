function getById(id) {
    return document.getElementById(id);
}
function getByClassName(name) {
    return [...document.getElementsByClassName(name)];
}
function create(element) {
    return document.createElement(element);
}

const player = getById('playerName');
const score = getById('PlayersScore');

player.innerHTML = nextPlayer(player1.name);
score.innerHTML = printScore();

let firstSelectedSquareId = 0;
let canPlay = true;

const player1 = {
    name: 'Vika',
    score: 0
};
const player2 = {
    name: 'Tom',
    score: 0
};

const characters = [
    'bob', 'carlos', 'gary', 'krabs', 'patrick', 'pearl', 'plancton', 'puff', 'sandy'
];

const squares = getByClassName('square');
initGame(squares);

function onPictureClick(div) {
    const newValues = pictureClick(div, firstSelectedSquareId, canPlay, player1, player2, player, score)
    if (newValues !== null) {
        firstSelectedSquareId = newValues.firstSelectedSquareId;
        canPlay = newValues.canPlay;
        player.innerHTML = newValues.currentPlayerInfo;
        player1.score = newValues.player1.score;
        player2.score = newValues.player2.score;
    }
}
