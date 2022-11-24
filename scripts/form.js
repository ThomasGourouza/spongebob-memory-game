function toggleAudio() {
    const audio = getElement('audio');
    audio.volume = (audio.volume === 1) ? 0 : 1;
    const bob = getElement('#bob > img');
    const patrick = getElement('#patrick > img');
    const carlos = getElement('#carlos > img');
    if (audio.volume === 1) {
        bob.classList.add('dance');
        patrick.classList.add('dance');
        carlos.classList.add('dance');
    } else {
        bob.classList.remove('dance');
        patrick.classList.remove('dance');
        carlos.classList.remove('dance');
    }
}

/**
 * Helper Document functions
 */
function getElement(elmt) {
    return document.querySelector(elmt);
}
