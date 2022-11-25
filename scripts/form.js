const bob = getElement('#bob');
const patrick = getElement('#patrick');
const carlos = getElement('#carlos');
const jellyfish = getElement('#jellyfish');
const audio = getElement('audio');

audio.volume = 0;
toggleAudio();

/**
 * Event function
 */
function toggleAudio() {
    audio.volume = (audio.volume === 1) ? 0 : 1;
    [bob, patrick, carlos].forEach((character) => {
        (audio.volume === 1)
        ? character.classList.replace('sad', 'dance')
        : character.classList.replace('dance', 'sad');
    });
}
function playPatrick() {
    if (jellyfish.className === 'goAway') {
        return;
    }
    const currentState = (audio.volume === 1) ? 'dance' : 'sad';
    if (patrick.classList.contains('player')) {
        patrick.classList.replace('player', currentState);
        jellyfish.className = 'goAway';
        setTimeout(() => {
            jellyfish.className = 'notHere';
        }, 2000);
    } else {
        jellyfish.className = 'isHere';
        setTimeout(() => {
            patrick.classList.replace(currentState, 'player');
        }, 1000);
    }
}

/**
 * Helper Document functions
 */
function getElement(elmt) {
    return document.querySelector(elmt);
}
