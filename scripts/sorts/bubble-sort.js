import {
  cleanupPreviousSort,
  renderArray,
  setNumberOfOperations,
} from "../dom.js";
import { wait } from "../helpers.js";

/*
BUBBLE SORT:
* We sort the array using multiple passes. 
* After the first pass, the maximum element goes to end (its correct position). 
* Same way, after second pass, the second largest element goes to second last position and so on.
* In every pass, we process only those elements that have already not moved to correct position. 
* After k passes, the largest k elements must have been moved to the last k positions.
* In a pass, we consider remaining elements and compare all adjacent and swap if larger element is before a smaller element. 
* If we keep doing this, we get the largest (among the remaining elements) at its correct position.
*/
export async function* initiateBubbleSortGenerator(array) {
  const speedValue = Number(document.getElementById("speedControl").value);
  const DELAY = Math.max(10, 100 - speedValue * 10);
  let numberOfOperations = 0;
  // iteration rounds:
  for (let i = 0; i < array.length - 1; i++) {
    let swappedAtLeastOnce = false;
    // pairwise comparisons:
    for (let j = 0; j < array.length - i - 1; j++) {
      numberOfOperations++;
      const firstNumber = array[j];
      const secondNumber = array[j + 1];

      /** Render logic - HIGHLIGHT COLUMNS */
      const sortedArrayNode = document.getElementById("sortedOrder");
      const childNodesArray = Array.from(sortedArrayNode.children);
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
      /** Render logic - SWAP COLUMNS */
      cleanupPreviousSort();
      renderArray(array, "sortedOrder");

      await wait(DELAY);
      /** Render logic */
      yield {
        array: [...array],
        comparing: [j, j + 1],
        swapped: firstNumber > secondNumber,
        operationCount: numberOfOperations,
      };
    }
    if (!swappedAtLeastOnce) break;
  }
}
