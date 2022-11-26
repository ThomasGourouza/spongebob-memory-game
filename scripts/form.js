const bob = getElement('#bob');
const patrick = getElement('#patrick');
const carlos = getElement('#carlos');
const jellyfish = getElement('#jellyfish');
const audio = getElement('audio');

let toggleAudioPossible = true;

audio.volume = 0;
toggleAudio();

/**
 * Event function
 */
function toggleAudio() {
    if (!toggleAudioPossible) {
        return;
    }
    audio.volume = (audio.volume === 1) ? 0 : 1;
    [bob, patrick, carlos].forEach((character) => {
        (audio.volume === 1)
        ? character.classList.replace('sad', 'dance')
        : character.classList.replace('dance', 'sad');
    });
}
function playPatrick() {
    toggleAudioPossible = false;
    if (jellyfish.className === 'goAway') {
        toggleAudioPossible = true;
        return;
    }
    const currentState = (audio.volume === 1) ? 'dance' : 'sad';
    const toPatrick = (audio.volume === 1) ? 'toPatrickDance' : 'toPatrickSad';
    if (!patrick.classList.contains('player')) {
        jellyfish.className = toPatrick;
        setTimeout(() => {
            jellyfish.className = 'isHere';
            patrick.classList.replace(currentState, 'player');
            toggleAudioPossible = true;
        }, 1000);
    } else {
        patrick.classList.replace('player', currentState);
        jellyfish.className = 'goAway';
        setTimeout(() => {
            jellyfish.className = 'notHere';
            toggleAudioPossible = true;
        }, 1000);
    }
}

/**
 * Helper Document functions
 */
function getElement(elmt) {
    return document.querySelector(elmt);
}
