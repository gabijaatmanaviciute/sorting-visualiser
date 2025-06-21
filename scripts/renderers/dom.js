export function renderArray(array, nodeId) {
  const node = document.getElementById(nodeId);
  node.innerHTML = "";
  array.forEach((number) => {
    const itemContainer = document.createElement("div");
    itemContainer.className = "column-container";
    const column = document.createElement("div");
    const label = document.createElement("span");
    column.className = "column";
    column.style.height = `${number}px`;
    label.innerText = number;
    label.style.fontSize = `8px`;
    itemContainer.appendChild(column);
    itemContainer.appendChild(label);
    node.appendChild(itemContainer);
  });

  return node;
}

export function cleanupPreviousSort() {
  const child = document.getElementById("sortedOrder");
  child.innerHTML = "";
}

export function setNumberOfOperations(number) {
  const node = document.getElementById("numberOfOperations");
  node.innerText = number;
}
