function initGame(divs) {
    let intAlreadyChoosen = [];
    let randomInt;
    divs.forEach((square) => {
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
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}
