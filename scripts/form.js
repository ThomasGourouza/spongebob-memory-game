const bob = getById("bob");
const patrick = getById("patrick");
const carlos = getById("carlos");
const jellyfish = getById("jellyfish");
const audio = getElements("audio")[0];

let buttonsAvailable = true;

audio.volume = 0;
toggleAudio();

/**
 * Event function
 */
function toggleAudio() {
  if (!buttonsAvailable) {
    return;
  }
  audio.volume = audio.volume === 1 ? 0 : 1;
  [bob, patrick, carlos].forEach((character) => {
    audio.volume === 1
      ? character.classList.replace("sad", "dance")
      : character.classList.replace("dance", "sad");
  });
}

function playPatrick(button) {
  if (jellyfish.className === "goAway" || !buttonsAvailable) {
    return;
  }
  disableButtonsFor2sec();
  button.innerHTML = toggleButtonText(button);
  const currentState = audio.volume === 1 ? "dance" : "sad";
  if (!patrick.classList.contains("player")) {
    runPatrickAI(true);
    jellyfish.className = "toPatrick";
    setTimeout(() => {
      jellyfish.className = "isHere";
      patrick.classList.replace(currentState, "player");
    }, 1000);
  } else {
    runPatrickAI(false);
    patrick.classList.replace("player", currentState);
    jellyfish.className = "toPatrick";
    setTimeout(() => {
      jellyfish.className = "goAway";
    }, 1000);
    setTimeout(() => {
      jellyfish.className = "notHere";
    }, 2000);
  }
}

function toggleButtonText(button) {
  const playPatrickText = 'Play Patrick';
  return (button.innerHTML === playPatrickText) ? 'Play 1 vs 1' : playPatrickText;
}

function disableButtonsFor2sec() {
  buttonsAvailable = false;
  getElements('button').forEach((button) => button.disabled = true);
  setTimeout(() => {
    buttonsAvailable = true;
    getElements('button').forEach((button) => button.disabled = false);
  }, 2000);
}