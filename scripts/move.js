const bob = document.getElementById("bob");
const patrick = document.getElementById("patrick");
const carlos = document.getElementById("carlos");

function moveToRight(restPixels, totalPixels) {
  if (restPixels === undefined) {
    restPixels = totalPixels;
    totalPixels += bob.getBoundingClientRect().left;
  }
  if (restPixels < 1) {
    return;
  }
  const screenWidth = window.screen.width;
  setTimeout(() => {
    bob.style.left = `${((totalPixels - restPixels) * 100) / screenWidth}%`;
    restPixels--;
    moveToRight(restPixels, totalPixels);
  }, 50);
}

// moveToRight(undefined, 300);
