document.addEventListener("DOMContentLoaded", () => {
    const itemsContainer = document.querySelector(".items");
    const items = document.querySelectorAll(".item");
    let selectedItem = null;
    let offsetX, offsetY;

    // Ensure the container has position: relative
    itemsContainer.style.position = "relative";

    items.forEach(item => {
        item.style.position = "absolute"; // Ensure absolute positioning

        item.addEventListener("mousedown", (event) => {
            selectedItem = event.target;
            let rect = selectedItem.getBoundingClientRect();
            let containerRect = itemsContainer.getBoundingClientRect();

            offsetX = event.clientX - rect.left;
            offsetY = event.clientY - rect.top;

            // Adjust left and top relative to the container
            selectedItem.style.left = `${rect.left - containerRect.left}px`;
            selectedItem.style.top = `${rect.top - containerRect.top}px`;

            selectedItem.style.zIndex = "1000";
            document.body.style.cursor = "grabbing";

            event.preventDefault(); // Prevents text selection
        });
    });

    document.addEventListener("mousemove", (event) => {
        if (!selectedItem) return;

        let containerRect = itemsContainer.getBoundingClientRect();
        let x = event.clientX - offsetX - containerRect.left;
        let y = event.clientY - offsetY - containerRect.top;

        let maxX = containerRect.width - selectedItem.offsetWidth;
        let maxY = containerRect.height - selectedItem.offsetHeight;

        if (x < 0) x = 0;
        if (y < 0) y = 0;
        if (x > maxX) x = maxX;
        if (y > maxY) y = maxY;

        selectedItem.style.left = `${x}px`;
        selectedItem.style.top = `${y}px`;
    });

    document.addEventListener("mouseup", () => {
        if (selectedItem) {
            selectedItem.style.zIndex = "1";
            selectedItem = null;
            document.body.style.cursor = "default";
        }
    });

    itemsContainer.addEventListener("mousedown", (event) => {
        event.preventDefault();
    });
});
