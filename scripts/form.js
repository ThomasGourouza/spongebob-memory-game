const bob = getElements("#bob");
const patrick = getElements("#patrick");
const carlos = getElements("#carlos");
const jellyfish = getElements("#jellyfish");
const audio = getElements("audio");

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
  audio.volume = audio.volume === 1 ? 0 : 1;
  [bob, patrick, carlos].forEach((character) => {
    audio.volume === 1
      ? character.classList.replace("sad", "dance")
      : character.classList.replace("dance", "sad");
  });
}
function playPatrick(button) {
  button.innerHTML = toggleButtonText(button);
  toggleAudioPossible = false;
  if (jellyfish.className === "goAway") {
    toggleAudioPossible = true;
    return;
  }
  const currentState = audio.volume === 1 ? "dance" : "sad";
  const toPatrick = audio.volume === 1 ? "toPatrickDance" : "toPatrickSad";
  if (!patrick.classList.contains("player")) {
    runPatrickAI(true);
    jellyfish.className = toPatrick;
    setTimeout(() => {
      jellyfish.className = "isHere";
      patrick.classList.replace(currentState, "player");
      toggleAudioPossible = true;
    }, 1000);
  } else {
    runPatrickAI(false);
    patrick.classList.replace("player", currentState);
    jellyfish.className = "goAway";
    setTimeout(() => {
      jellyfish.className = "notHere";
      toggleAudioPossible = true;
    }, 1000);
  }
}

function toggleButtonText(button) {
  const playPatrickText = 'Play Patrick';
  return (button.innerHTML === playPatrickText) ? 'Play 1 vs 1' : playPatrickText;
}
