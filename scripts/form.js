const bob = getById("bob");
const patrick = getById("patrick");
const carlos = getById("carlos");
const jellyfish = getById("jellyfish");
const audio = getElements("audio")[0];

let buttonsAvailable = true;

audio.volume = 0;
toggleAudio();

/**
 * Event functions
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

function playAgainst(name) {
  if (jellyfish.className === "goAway" || !buttonsAvailable) {
    return;
  }
  const aiInfo = getAIInfo(name);
  disableButtonsFor2sec();
  toggleButtonText(aiInfo);
  const currentState = audio.volume === 1 ? "dance" : "sad";
  if (!aiInfo.character.classList.contains("player")) {
    aiInfo.runAI(true);
    jellyfish.className = aiInfo.toCharacter;
    setTimeout(() => {
      jellyfish.className = "isHere";
      aiInfo.character.classList.replace(currentState, "player");
    }, 1000);
  } else {
    aiInfo.runAI(false);
    aiInfo.character.classList.replace("player", currentState);
    jellyfish.className = aiInfo.toCharacter;
    setTimeout(() => {
      jellyfish.className = "goAway";
    }, 1000);
    setTimeout(() => {
      jellyfish.className = "notHere";
    }, 2000);
  }
}

function toggleButtonText(aiInfo) {
  aiInfo.button.innerHTML = (aiInfo.button.innerHTML === aiInfo.text) ? 'Play 1 vs 1' : aiInfo.text;
}

function disableButtonsFor2sec() {
  buttonsAvailable = false;
  getElements('button').forEach((button) => button.disabled = true);
  setTimeout(() => {
    buttonsAvailable = true;
    getElements('button').forEach((button) => button.disabled = false);
  }, 2000);
}

function getAIInfo(name) {
  switch (name) {
    case 'bob':
      return new AIInfo(bob, 'toBob', (value) => setAI('Bob', value), 'Play Bob', getById('playBob'));
    case 'patrick':
      return new AIInfo(patrick, 'toPatrick', (value) => setAI('Patrick', value), 'Play Patrick', getById('playPatrick'));
    case 'carlos':
      return new AIInfo(carlos, 'toCarlos', (value) => setAI('Carlos', value), 'Play Carlos', getById('playCarlos'));
    default:
      return undefined;
  }
}

function setAI(name, enabled) {
  ai.name = name.toLowerCase();
  ai.enabled = enabled;
  player2.name = ai.enabled ? name : "Tom";
  player2.score = 0;
  initGame();
}
