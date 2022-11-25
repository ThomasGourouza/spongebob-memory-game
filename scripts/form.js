const bob = getElement('#bob');
const patrick = getElement('#patrick');
const carlos = getElement('#carlos');
const audio = getElement('audio');

audio.volume = 0;
toggleAudio();

/**
 * Event function
 */
function toggleAudio() {
    audio.volume = (audio.volume === 1) ? 0 : 1;
    [bob, patrick, carlos].forEach((character) => {
        character.classList.add(audio.volume === 1 ? 'dance' : 'sad');
        character.classList.remove(audio.volume === 1 ? 'sad' : 'dance');
    });
}

/**
 * Helper Document functions
 */
function getElement(elmt) {
    return document.querySelector(elmt);
}
