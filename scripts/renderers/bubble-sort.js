import {
  cleanupPreviousSort,
  renderArray,
  setNumberOfOperations,
} from "../renderers/dom.js";
import { wait } from "../helpers.js";
import { initiateBubbleSortGenerator } from "../sorting-logic/index.js";

// TODO abstract these functions to handle all algorithms later

let generator;
export let paused = false;

export async function runSort(array, algorithm, onDone) {
  paused = false;
  if (!generator) {
    switch (algorithm) {
      case "bubble":
        generator = initiateBubbleSortGenerator(array);
        break;
      default:
        console.error("Unknown algorithm");
    }
  }
  doStep(onDone);
}

export function pauseSort() {
  paused = true;
}

export function resetSort() {
  paused = false;
  generator = undefined;
}

async function doStep(onDone) {
  let sortStepResult = await generator?.next();
  if (!sortStepResult) return;

  const DELAY = getDelay();
  if (sortStepResult.done) {
    onDone?.();
    return;
  }
  const { array, comparing, operationCount } = sortStepResult.value;
  highlightColumns(comparing);
  await wait(DELAY);

  setNumberOfOperations(operationCount);
  cleanupPreviousSort();
  renderArray(array, "sortedOrder");

  await wait(DELAY);
  if (!paused) {
    doStep(onDone);
  }
}

function getDelay() {
  const speedValue = Number(document.getElementById("speedControl").value);
  const DELAY = Math.max(10, 100 - speedValue * 10);

  return DELAY;
}

function highlightColumns(columnIndeces) {
  const sortedArrayNode = document.getElementById("sortedOrder");
  const childNodesArray = Array.from(sortedArrayNode.children);
  childNodesArray[columnIndeces[0]].firstChild.style.backgroundColor =
    "papayawhip";
  childNodesArray[columnIndeces[1]].firstChild.style.backgroundColor =
    "papayawhip";
}
