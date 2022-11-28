const bob = getById("bob");
const patrick = getById("patrick");
const carlos = getById("carlos");
const jellyfish = getById("jellyfish");
const audio = getElements("audio")[0];

audio.volume = 0;
const audioButton = getById("audio");
toggleAudio();

/**
 * Event functions
 */
function toggleAudio() {
  audio.volume = audio.volume === 1 ? 0 : 1;
  [bob, patrick, carlos].forEach((character) => {
    audio.volume === 1
      ? character.classList.replace("sad", "dance")
      : character.classList.replace("dance", "sad");
  });
  audioButton.innerHTML =
    audio.volume === 1 ? "Turn music off" : "Turn music on";
}

function validatePlayerForm() {
  const name1 = getById("player1").value;
  const name2 = getById("player2").value;
  if ([name1, name2].includes("")) {
    return;
  }
  player1.name = name1;
  player2.name = name2;
  setCurrentPlayerName(player1.name);
  printScore();
  initGame();
}

function playAgainst(name) {
  if (jellyfish.className === "goAway") {
    return;
  }
  const aiInfo = getAIInfo(name);
  toggleButtons(name, aiInfo);
  const currentState = audio.volume === 1 ? "dance" : "sad";
  if (!aiInfo.character.classList.contains("player")) {
    aiInfo.runAI(true);
    jellyfish.className = aiInfo.toCharacter;
    setTimeout(() => {
      jellyfish.className = "isHere";
      if (name === "bob") {
        jellyfish.classList.add("withBob");
        bob.classList.add("invisible");
      }
      aiInfo.character.classList.replace(currentState, "player");
    }, 1000);
  } else {
    aiInfo.runAI(false);
    if (name === "bob") {
      jellyfish.className = "goAwayRight";
      jellyfish.classList.add("withBob");
      bob.classList.replace("player", "notHere");
      setTimeout(() => {
        bob.classList.replace("notHere", currentState);
      }, 1000);
    } else {
      aiInfo.character.classList.replace("player", currentState);
      jellyfish.className = aiInfo.toCharacter;
      setTimeout(() => {
        jellyfish.className = "goAway";
        if (name === "patrick") {
          jellyfish.classList.add("fromPatrick");
        }
      }, 1000);
    }

    setTimeout(() => {
      jellyfish.className = "notHere";
    }, 2000);
  }
}

function toggleButtons(name, aiInfo) {
  const buttonId = getButtonId(name);
  const currentButton = getById(buttonId);
  const isAIPlaying = currentButton.innerHTML.includes("Quit");
  if (!isAIPlaying) {
    // désactive tout 2sec puis remet seulement le joueur courant
    getByName("play")
      .filter((button) => button.getAttribute("id") !== buttonId)
      .forEach((button) => (button.disabled = !isAIPlaying));
    disableButtonsFor2sec([currentButton]);
  } else {
    // désactive tout 2sec puis remet tout
    const playButtons = getByName("play");
    disableButtonsFor2sec(playButtons);
  }
  // désactive les controls pendant 2sec
  const controlButtons = getByName("control");
  disableButtonsFor2sec(controlButtons);
  // toggle le texte du button
  aiInfo.button.innerHTML =
    aiInfo.button.innerHTML === aiInfo.text ? "Quit" : aiInfo.text;
}

function disableButtonsFor2sec(buttons) {
  buttons.forEach((button) => (button.disabled = true));
  setTimeout(() => {
    buttons.forEach((button) => (button.disabled = false));
  }, 2000);
}

function getAIInfo(name) {
  switch (name) {
    case "bob":
      return new AIInfo(
        bob,
        "toBob",
        (value) => setAI("Bob", value),
        "Play Bob",
        getById("playBob")
      );
    case "patrick":
      return new AIInfo(
        patrick,
        "toPatrick",
        (value) => setAI("Patrick", value),
        "Play Patrick",
        getById("playPatrick")
      );
    case "carlos":
      return new AIInfo(
        carlos,
        "toCarlos",
        (value) => setAI("Carlos", value),
        "Play Carlos",
        getById("playCarlos")
      );
    default:
      return undefined;
  }
}

function getButtonId(name) {
  switch (name) {
    case "bob":
      return "playBob";
    case "patrick":
      return "playPatrick";
    case "carlos":
      return "playCarlos";
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
