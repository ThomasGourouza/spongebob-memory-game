function pictureClick(div, firstSelectedSquareId, canPlay, player1, player2, playerElement, scoreElement) {
    const returnValues = {
        firstSelectedSquareId,
        canPlay,
        currentPlayerInfo: '',
        player1,
        player2
    };
    const id = div.getAttribute('id');
    if (returnValues.firstSelectedSquareId === id || !div.classList.contains('hidden') || returnValues.canPlay === false) {
        return null;
    }
    setImage(div);
    if (returnValues.firstSelectedSquareId === 0) {
        returnValues.firstSelectedSquareId = id;
    } else {
        const firstSelectedSquare = getById(returnValues.firstSelectedSquareId);
        if (firstSelectedSquare.getAttribute('name') === div.getAttribute('name')) {
            firstSelectedSquare.classList.remove("hidden");
            div.classList.remove("hidden");
            incrementScoreOfCurrentPlayer(returnValues.player1, returnValues.player2, playerElement, scoreElement);
            setTimeout(() => {
                checkEndGame(returnValues.player1, returnValues.player2, playerElement, returnValues);
            }, 500);
        } else {
            returnValues.canPlay = false;
            setTimeout(() => {
                removeImage(firstSelectedSquare);
                removeImage(div);
                returnValues.canPlay = true;
                const next = isCurrentPlayer(playerElement, returnValues.player1) ? returnValues.player2.name : returnValues.player1.name;
                returnValues.currentPlayerInfo = nextPlayer(next);
            }, 2000);
        }
        returnValues.firstSelectedSquareId = 0;
        return returnValues;
    }
}

function setImage(div) {
    const characterName = div.getAttribute('name');
    const img = create('img');
    img.src = `images/${characterName}.png`;
    img.alt = characterName;
    img.setAttribute('class', characterName);
    div.appendChild(img);
}
function removeImage(div) {
    div.removeChild(div.firstChild);
}

function incrementScoreOfCurrentPlayer(player1, player2, playerElement, scoreElement) {
    const currentPlayer = isCurrentPlayer(playerElement, player1) ? player1 : player2;
    currentPlayer.score++;
    scoreElement.innerHTML = printScore();
}

function checkEndGame(player1, player2, playerElement, returnValues) {
    const remainingSquares = getByClassName('hidden');
    if (remainingSquares.length === 2) {
        const current = isCurrentPlayer(playerElement, player1) ? player1.name : player2.name;
        remainingSquares.forEach((square) => {
            setImage(square);
            square.classList.remove("hidden");
            square.classList.add("alone");
        });
        returnValues.currentPlayerInfo = congratulatePlayer(current);
    }
}

function isCurrentPlayer(playerElement, player) {
    return playerElement.innerHTML === nextPlayer(player.name);
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
