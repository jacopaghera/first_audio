let pressed = false;

window.addEventListener("keydown", (ev) => {
  if (ev.code == "Space") {
      startOsc();
  }
})

window.addEventListener("keydown", (ev) => {
  if (ev.code == "KeyQ") {
      startFm();
  }
})

window.addEventListener("keydown", (ev) => {
  if (ev.code == "KeyW") {
      startAm();
  }
})