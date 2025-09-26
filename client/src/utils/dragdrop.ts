export function enableSectionDragDrop(): void {
    const container = document.getElementById("app") as HTMLElement | null;
    if (!container) {
        return;
    }

    let dragItem: HTMLElement | null = null;

    container.addEventListener("dragstart", (e: DragEvent) => {
        const target = e.target as HTMLElement;
        if (target && target.classList.contains("draggable-section")) {
            dragItem = target;
            target.classList.add("dragging");
            if (e.dataTransfer) e.dataTransfer.effectAllowed = "move";
        }
    });

    container.addEventListener("dragend", () => {
        if (dragItem) {
            dragItem.classList.remove("dragging");
            dragItem = null;
        }
    });

    container.addEventListener("dragover", (e: DragEvent) => {
        e.preventDefault();
        if (e.dataTransfer) e.dataTransfer.dropEffect = "move";

        const afterElement = getDragAfterElement(container, e.clientY);
        const current = document.querySelector(".dragging") as HTMLElement | null;
        if (!current) return;

        if (afterElement == null) {
            container.appendChild(current);
        } else {
            container.insertBefore(current, afterElement);
        }
    });

    function getDragAfterElement(container: HTMLElement, y: number): HTMLElement | null {
        const elements = Array.from(
            container.querySelectorAll<HTMLElement>(".draggable-section:not(.dragging)")
        );

        return elements.reduce<{ offset: number; element: HTMLElement | null }>(
            (closest, child) => {
                const box = child.getBoundingClientRect();
                const offset = y - box.top - box.height / 2;
                if (offset < 0 && offset > closest.offset) {
                    return { offset, element: child };
                } else {
                    return closest;
                }
            },
            { offset: Number.NEGATIVE_INFINITY, element: null }
        ).element;
    }
}