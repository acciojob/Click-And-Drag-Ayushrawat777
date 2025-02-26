// Your code here.
const itemsContainer = document.querySelector(".items");
const items = document.querySelectorAll(".item");
let selectedItem = null;
let offsetX, offsetY;
let boundary;

items.forEach((item) => {
  item.addEventListener("mousedown", (e) => {
    selectedItem = item;
    boundary = itemsContainer.getBoundingClientRect();
    const rect = selectedItem.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    selectedItem.style.position = "absolute";
    selectedItem.style.zIndex = "1000";
  });
});

document.addEventListener("mousemove", (e) => {
  if (!selectedItem) return;
  
  let newX = e.clientX - offsetX;
  let newY = e.clientY - offsetY;
  
  // Constrain movement within the container
  newX = Math.max(boundary.left, Math.min(newX, boundary.right - selectedItem.offsetWidth));
  newY = Math.max(boundary.top, Math.min(newY, boundary.bottom - selectedItem.offsetHeight));
  
  selectedItem.style.left = `${newX}px`;
  selectedItem.style.top = `${newY}px`;
});

document.addEventListener("mouseup", () => {
  if (selectedItem) {
    selectedItem.style.zIndex = "1";
    selectedItem = null;
  }
});