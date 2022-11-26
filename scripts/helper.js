/**
 * Helper Document functions
 */
function getElements(tag) {
  return [...document.getElementsByTagName(tag)];
}

function getById(id) {
  return document.getElementById(id);
}

function getByClassName(name) {
  return [...document.getElementsByClassName(name)];
}

function createElement(elmt) {
  return document.createElement(elmt);
}

/**
 * Helper functions
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}
