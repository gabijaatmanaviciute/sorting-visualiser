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
  let numberOfOperations = 0;
  // iteration rounds:
  for (let i = 0; i < array.length - 1; i++) {
    let swappedAtLeastOnce = false;
    // pairwise comparisons:
    for (let j = 0; j < array.length - i - 1; j++) {
      numberOfOperations++;
      const firstNumber = array[j];
      const secondNumber = array[j + 1];

      if (firstNumber > secondNumber) {
        array[j] = secondNumber;
        array[j + 1] = firstNumber;
        swappedAtLeastOnce = true;
      }
      yield {
        array: [...array],
        comparing: [j, j + 1],
        operationCount: numberOfOperations,
      };
    }
    if (!swappedAtLeastOnce) break;
  }
}
