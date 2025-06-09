import { generateRandomArray } from "./helpers.js";
import { renderArray } from "./dom.js";
import { bubbleSort } from "./sorts/bubble-sort.js";
import { setNumberOfOperations } from "./dom.js";

const NumberOfElementsRange = document.getElementById("numberOfElementsInput");
const SpeedControl = document.getElementById("speedControl");
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

const BubbleSortRadioInput = document.getElementById("bubbleSort");
const PlayButton = document.getElementById("play");
const ResetButton = document.getElementById("reset");

PlayButton.addEventListener("click", async () => {
  ResetButton.disabled = true;
  PlayButton.disabled = true;
  NumberOfElementsRange.disabled = true;
  SpeedControl.disabled = true;

  if (BubbleSortRadioInput.checked) {
    await bubbleSort(initialArray);
  }
  NumberOfElementsRange.disabled = false;
  SpeedControl.disabled = false;
  ResetButton.disabled = false;
});

ResetButton.addEventListener("click", () => {
  initialArray = generateRandomArray(NumberOfElementsRange.value);
  renderArray(initialArray, "initialOrder");
  renderArray(initialArray, "sortedOrder");
  setNumberOfOperations(0);
  PlayButton.disabled = false;
});
