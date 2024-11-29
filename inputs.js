let pressed = false;

window.addEventListener("keydown", (ev) => {
  if (ev.code == "Space") {
      startSin();
  }
})

window.addEventListener("keydown", (ev) => {
  if (ev.code == "Q") {
      startFm();
  }
})

window.addEventListener("keydown", (ev) => {
  if (ev.code == "W") {
      startAm();
  }
})