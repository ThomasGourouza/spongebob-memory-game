const karen = getById("karen");
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
  [bob, patrick, squidward].forEach((character) => {
    audio.volume === 1
      ? character.classList.replace("not-dancing", "dancing")
      : character.classList.replace("dancing", "not-dancing");
  });
  audioButton.innerHTML =
    audio.volume === 1 ? "Mute" : "Music";
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
  ai.enabled ? playAgainstNewOpponent(ai.name) : initGame();
}

function rematch() {
  const name1 = getById("player1").value;
  const name2 = getById("player2").value;
  if (name1 !== "") {
    player1.name = name1;
  }
  if (name2 !== "" && !ai.enabled) {
    player2.name = name2;
  }
  initGame();
}

function playAgainst(name) {
  if (ai.enabled) {
    validatePlayerForm();
    setTimeout(() => {
      playAgainstNewOpponent(name);
    }, 2500);
  } else {
    playAgainstNewOpponent(name);
  }
}

function playAgainstNewOpponent(name) {
  if (jellyfish.className === "goAway") {
    return;
  }
  const aiInfo = getAIInfo(name);
  toggleButtons();
  const currentState = audio.volume === 1 ? "dancing" : "not-dancing";
  if (aiInfo.character.classList.contains("playing")) {
    leaveTheGame(name, aiInfo, currentState);
  } else {
    comeToPlay(name, aiInfo, currentState);
  }
}

function comeToPlay(name, aiInfo, currentState) {
  aiInfo.runAI(true);
  if (name === "plankton") {
    karen.className = "transition";
    plankton.className = "transition";
    karen.classList.add("playing");
    plankton.classList.add("playing");
  } else {
    jellyfish.className = aiInfo.toCharacter;
    setTimeout(() => {
      jellyfish.className = "isHere";
      aiInfo.character.classList.replace(currentState, "playing");
      if (name === "bob") {
        jellyfish.classList.add("withBob");
        bob.classList.add("invisible");
        setTimeout(() => {
          jellyfish.classList.remove("withBob");
          bob.classList.remove("invisible");
        }, 700);
      }
    }, 1000);
  }
}

function leaveTheGame(name, aiInfo, currentState) {
  aiInfo.runAI(false);
  if (name === "bob") {
    jellyfish.className = "goAwayWithBob";
    bob.classList.replace("playing", "notHere");
    setTimeout(() => {
      bob.classList.replace("notHere", currentState);
    }, 1000);
  } else if (name === "plankton") {
    karen.classList.replace("playing", "goBack");
    plankton.classList.replace("playing", "goBack");
    setTimeout(() => {
      karen.classList.remove("transition");
      karen.classList.remove("goBack");
      plankton.classList.remove("transition");
      plankton.classList.remove("goBack");
      plankton.classList.remove("leaving");
    }, 2000);
  } else {
    aiInfo.character.classList.replace("playing", currentState);
    jellyfish.className = aiInfo.toCharacter;
    setTimeout(() => {
      jellyfish.className = "goAway";
      if (name === "patrick") {
        jellyfish.classList.add("fromPatrick");
      }
    }, 1000);
  }
  if (name !== "plankton") {
    setTimeout(() => {
      jellyfish.className = "notHere";
    }, 2000);
  }
}

function toggleButtons() {
  const isAIPlaying = ai.enabled;
  const playButtons = getByName("play");
  if (!isAIPlaying) {
    // désactive  le bouton du "player" courant
    playButtons
      .filter((button) => (button.getAttribute("id").toLowerCase().includes(ai.name)))
      .forEach((button) => (button.disabled = true));
  } else {
    // désactive tout 2sec puis remet tout
    disableButtonsFor2sec(playButtons);
  }
  // désactive les controls pendant 2sec
  const controlButtons = getByName("control");
  disableButtonsFor2sec(controlButtons);
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
        (value) => setAI("Bob", value)
      );
    case "patrick":
      return new AIInfo(
        patrick,
        "toPatrick",
        (value) => setAI("Patrick", value)
      );
    case "squidward":
      return new AIInfo(
        squidward,
        "toSquidward",
        (value) => setAI("Squidward", value)
      );
    case "plankton":
      return new AIInfo(
        plankton,
        "toPlankton",
        (value) => setAI("Plankton", value)
      );
    default:
      return;
  }
}

function getButtonId(name) {
  return getElements("button")
    .find((button) => button.getAttribute("id").toLowerCase().includes(name))
    ?.getAttribute("id");
}

function setAI(name, enabled) {
  ai.name = name.toLowerCase();
  ai.enabled = enabled;
  if (ai.enabled) {
    player2.name = name;
    player2.score = 0;
  }
  initGame();
}
