import { generateRandomArray } from "./helpers.js";
import {
  runSort,
  pauseSort,
  resetSort,
  renderArray,
  setNumberOfOperations,
} from "./renderers/index.js";

const NumberOfElementsRange = document.getElementById("numberOfElementsInput");
const SpeedControl = document.getElementById("speedControl");
const BubbleSortRadioInput = document.getElementById("bubbleSort");
const PlayButton = document.getElementById("play");
const ResetButton = document.getElementById("reset");

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

let isRunning;
PlayButton.addEventListener("click", async () => {
  if (isRunning) {
    pauseSort();
    PlayButton.innerText = "Play";
    isRunning = false;
    ResetButton.disabled = false;
  } else {
    NumberOfElementsRange.disabled = true;
    SpeedControl.disabled = true;
    PlayButton.innerText = "Pause";
    ResetButton.disabled = true;

    isRunning = true;
    await runSort(
      initialArray,
      BubbleSortRadioInput.checked ? "bubble" : undefined,
      () => {
        NumberOfElementsRange.disabled = false;
        SpeedControl.disabled = false;
      }
    );
  }
});

ResetButton.addEventListener("click", () => {
  resetSort();
  isRunning = false;
  initialArray = generateRandomArray(NumberOfElementsRange.value);
  renderArray(initialArray, "initialOrder");
  renderArray(initialArray, "sortedOrder");
  setNumberOfOperations(0);
  PlayButton.innerText = "Play";
  NumberOfElementsRange.disabled = false;
  SpeedControl.disabled = false;
});
