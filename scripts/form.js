function toggleAudio() {
    const audio = getElement('audio');
    audio.volume = (audio.volume === 1) ? 0 : 1;
    const bob = getElement('#bob > img');
    const patrick = getElement('#patrick > img');
    const carlos = getElement('#carlos > img');
    if (audio.volume === 1) {
        [bob, patrick, carlos].forEach((img) => {
            img.classList.add('dance');
            img.classList.remove('sad');
        });
    } else {
        [bob, patrick, carlos].forEach((img) => {
            img.classList.add('sad');
            img.classList.remove('dance');
        });
    }
}

/**
 * Helper Document functions
 */
function getElement(elmt) {
    return document.querySelector(elmt);
}
