import { generateRandomArray } from "./helpers.js";
import { renderArray } from "./dom.js";
import { initiateBubbleSortGenerator } from "./sorts/bubble-sort.js";
import { setNumberOfOperations } from "./dom.js";

const NumberOfElementsRange = document.getElementById("numberOfElementsInput");
const SpeedControl = document.getElementById("speedControl");
const BubbleSortRadioInput = document.getElementById("bubbleSort");
const PlayButton = document.getElementById("play");
const PauseButton = document.getElementById("pause");
const ResetButton = document.getElementById("reset");
PauseButton.disabled = true;
export let paused = false;

document.getElementById("numberOfElements").innerText =
  NumberOfElementsRange.value;
document.getElementById("speedControlValue").innerText = SpeedControl.value;

let initialArray = generateRandomArray(NumberOfElementsRange.value);
const element = document.querySelector(".column-wrapper");
const width = element.getBoundingClientRect().width;
document.documentElement.style.setProperty(
  "--column-width",
  `${width / NumberOfElementsRange.value}px`
);
renderArray(initialArray, "initialOrder");
renderArray(initialArray, "sortedOrder");

NumberOfElementsRange.addEventListener("input", () => {
  const element = document.querySelector(".column-wrapper");
  const width = element.getBoundingClientRect().width;
  document.getElementById("numberOfElements").innerText =
    NumberOfElementsRange.value;
  initialArray = generateRandomArray(NumberOfElementsRange.value);
  document.documentElement.style.setProperty(
    "--column-width",
    `${width / NumberOfElementsRange.value}px`
  );
  renderArray(initialArray, "initialOrder");
  renderArray(initialArray, "sortedOrder");
});

SpeedControl.addEventListener("input", () => {
  document.getElementById("speedControlValue").innerText = SpeedControl.value;
});

let generator;
PlayButton.addEventListener("click", async () => {
  ResetButton.disabled = true;
  PlayButton.disabled = true;
  NumberOfElementsRange.disabled = true;
  SpeedControl.disabled = true;
  PauseButton.disabled = false;

  if (BubbleSortRadioInput.checked) {
    generator = initiateBubbleSortGenerator(initialArray);
    let sortStepResult = await generator.next();
    while (!sortStepResult.done && !paused) {
      sortStepResult = await generator.next();
    }
    if (sortStepResult.done) {
      NumberOfElementsRange.disabled = false;
      SpeedControl.disabled = false;
    }
    ResetButton.disabled = false;
  }
});

PauseButton.addEventListener("click", async () => {
  if (paused) {
    paused = false;
    ResetButton.disabled = true;
    PauseButton.innerText = "Pause";
    // Resume with the generator
    let sortStepResult = await generator.next();
    while (!sortStepResult.done && !paused) {
      sortStepResult = await generator.next();
    }
    if (sortStepResult.done) {
      NumberOfElementsRange.disabled = false;
      SpeedControl.disabled = false;
    }
    ResetButton.disabled = false;
  } else {
    paused = true;
    PauseButton.innerText = "Resume";
  }
});

ResetButton.addEventListener("click", () => {
  initialArray = generateRandomArray(NumberOfElementsRange.value);
  renderArray(initialArray, "initialOrder");
  renderArray(initialArray, "sortedOrder");
  setNumberOfOperations(0);
  PlayButton.disabled = false;
  paused = false;
  PauseButton.disabled = true;
  PauseButton.innerText = "Pause";
  generator = initiateBubbleSortGenerator(initialArray);
  NumberOfElementsRange.disabled = false;
  SpeedControl.disabled = false;
});
