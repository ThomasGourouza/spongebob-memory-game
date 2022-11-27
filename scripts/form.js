const bob = getById("bob");
const patrick = getById("patrick");
const carlos = getById("carlos");
const jellyfish = getById("jellyfish");
const audio = getElements("audio")[0];

audio.volume = 0;
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
}

function playAgainst(name) {
  const buttonId = getButtonId(name);
  const isAIPlaying = getById(buttonId).innerHTML.includes("Quit");
  const otherPlayButtons = getByName("play").filter(
    (button) => button.getAttribute("id") !== buttonId
  );
  otherPlayButtons.forEach((button) => (button.disabled = !isAIPlaying));

  if (jellyfish.className === "goAway") {
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
      }, 1000);
    }

    setTimeout(() => {
      jellyfish.className = "notHere";
    }, 2000);
  }
}

function toggleButtonText(aiInfo) {
  aiInfo.button.innerHTML =
    aiInfo.button.innerHTML === aiInfo.text ? "Quit" : aiInfo.text;
}

function disableButtonsFor2sec() {
  const buttons = getByName("control");
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
