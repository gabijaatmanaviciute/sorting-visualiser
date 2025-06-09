import {
  cleanupPreviousSort,
  renderArray,
  setNumberOfOperations,
} from "../dom.js";
import { wait } from "../helpers.js";

/*
BUBBLE SORT:
* Go through each pair of numbers and compare their values;
* If the second value is smaller than the first one, swap the numbers
* Move one place to the right
* Repeat the process
* Once all the adjacent number pairs have been processed once, do a second iteration with the same logic,
*/
// TODO probably rewrite this with a generator
export async function bubbleSort(array) {
  const DELAY = 100 - document.getElementById("speedControl").value * 10;

  console.log("dd", DELAY);
  let numberOfOperations = 0;
  let isDone = false;
  // iteration rounds:
  for (let i = 0; i < array.length - 1 && !isDone; i++) {
    let swappedAtLeastOnce = false; // reset the swap tracker
    // pairwise comparisons:
    for (let j = 0; j < array.length - 1 && !isDone; j++) {
      numberOfOperations++;
      const firstNumber = array[j];
      const secondNumber = array[j + 1];

      /** Render logic */
      const sortedArrayNode = document.getElementById("sortedOrder");
      const childNodes = sortedArrayNode.children;
      const childNodesArray = Array.from(childNodes);
      childNodesArray[j].firstChild.style.backgroundColor = "papayawhip";
      childNodesArray[j + 1].firstChild.style.backgroundColor = "papayawhip";
      await wait(DELAY);
      setNumberOfOperations(numberOfOperations);
      /** Render logic */

      if (firstNumber > secondNumber) {
        array[j] = secondNumber;
        array[j + 1] = firstNumber;
        swappedAtLeastOnce = true;
      }
      /** Render logic */
      cleanupPreviousSort();
      renderArray(array, "sortedOrder");

      await wait(DELAY);
      /** Render logic */
    }

    if (!swappedAtLeastOnce) {
      isDone = true;
    }
  }

  return array;
}
