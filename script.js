
        const container = document.getElementById("drag-container");
        let selectedCube = null;
        let offsetX, offsetY;

        container.addEventListener("mousedown", (event) => {
            if (event.target.classList.contains("cube")) {
                selectedCube = event.target;
                offsetX = event.clientX - selectedCube.offsetLeft;
                offsetY = event.clientY - selectedCube.offsetTop;

                selectedCube.style.zIndex = 1000; // Bring the selected cube to the front
            }
        });

        document.addEventListener("mousemove", (event) => {
            if (selectedCube) {
                let newX = event.clientX - offsetX;
                let newY = event.clientY - offsetY;

                // Get container boundaries
                let containerRect = container.getBoundingClientRect();
                let cubeRect = selectedCube.getBoundingClientRect();

                // Constrain movement within the container
                newX = Math.max(containerRect.left, Math.min(newX, containerRect.right - cubeRect.width));
                newY = Math.max(containerRect.top, Math.min(newY, containerRect.bottom - cubeRect.height));

                // Update cube position
                selectedCube.style.left = `${newX - containerRect.left}px`;
                selectedCube.style.top = `${newY - containerRect.top}px`;
            }
        });

        document.addEventListener("mouseup", () => {
            if (selectedCube) {
                selectedCube.style.zIndex = 1; // Reset z-index
                selectedCube = null;
            }
        });
   