import { directionalLight, camera } from "../main.js";

/** @type {HTMLButtonElement | null} */
const resetButton = document.querySelector("#ui button#reset-camera");
if (!resetButton) throw new Error("reset button not found");

/** @type {HTMLButtonElement | null} */
const revealButton = document.querySelector("#ui button#reveal-him");
if (!revealButton) throw new Error("reveal button not found");

let isRevealed = false;

resetButton.addEventListener("click", (e) => {
  camera.position.y = 1;
  camera.position.x = 0;
  camera.position.z = 5;
  camera.rotation.set(0, 0, 0)
})

revealButton.addEventListener("click", toggleReveal);

function toggleReveal() {
  isRevealed = !isRevealed;

  directionalLight.intensity = isRevealed ? 2 : 0.1;
  revealButton.innerText = isRevealed ? "HIDE HIM BACK OH GOD" : "Reveal him";
}
