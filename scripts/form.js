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
  const isMusicOn = audio.volume === 1;
  audioButton.setAttribute("title", isMusicOn ? "Stop music" : "Start music");
  [bob, patrick, squidward].forEach((character) => {
    isMusicOn
      ? character.classList.replace("not-dancing", "dancing")
      : character.classList.replace("dancing", "not-dancing");
  });
}

function versus() {
  ai.versus = true;
  validatePlayerForm();
}

function validatePlayerForm() {
  const name1 = getById("player1").value;
  const name2 = getById("player2").value;
  if ([name1, name2].includes("")) {
    return;
  }
  player1.name = name1;
  player2.name = name2;
  if (!["Patrick", "Bob", "Squidward", "Plankton"].includes(player2.name)) {
    ai.playerName = player2.name;
  }
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
  if (name === ai.name) {
    rematch();
    return;
  }
  if (ai.enabled) {
    ai.changed = true;
    validatePlayerForm();
    makeSquaresUncliquable();
    setTimeout(() => {
      ai.changed = false;
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
        jellyfish.classList.replace("isHere", "isHereWithBob");
        bob.classList.add("invisible");
        setTimeout(() => {
          jellyfish.classList.remove("withBob");
          jellyfish.classList.replace("isHereWithBob", "isHere");
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
  if (!ai.enabled && !ai.changed && !!ai.name) {
    return;
  }
  const buttons = getElements("button");
  buttons.forEach((button) => (button.disabled = true));
  setTimeout(
    () => {
      buttons.forEach((button) => (button.disabled = false));
    },
    ai.changed ? 4500 : 2000
  );
}

function getAIInfo(name) {
  switch (name) {
    case "bob":
      return new AIInfo(
        bob,
        "toBob",
        (value) => setAI("Bob", value),
        "playBob"
      );
    case "patrick":
      return new AIInfo(
        patrick,
        "toPatrick",
        (value) => setAI("Patrick", value),
        "playPatrick"
      );
    case "squidward":
      return new AIInfo(
        squidward,
        "toSquidward",
        (value) => setAI("Squidward", value),
        "playSquidward"
      );
    case "plankton":
      return new AIInfo(
        plankton,
        "toPlankton",
        (value) => setAI("Plankton", value),
        "playPlankton"
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
  ai.enabled = enabled;
  ai.name = enabled ? name.toLowerCase() : undefined;
  if (ai.enabled) {
    player2.name = name;
    player2.score = 0;
  }
  initGame();
}
