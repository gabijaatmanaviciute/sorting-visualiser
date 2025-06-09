export function generateRandomArray(size) {
  const array = [];
  for (let i = 0; i < size; i++) {
    array.push(Math.floor(Math.random() * 100) + 1);
  }
  return array;
}

export function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
