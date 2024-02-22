import { draggable, droppable } from "../../src";
import { TDroppableEvent } from "../../src/droppable/createDroppable";

export const exampleSortableSimple = () => {
  draggable({
    element: document.querySelectorAll("#sortable-simple-droppable > div"),
    onDragStart(event) {
      setTimeout(() => {
        event.element.style.opacity = "0";
      });
    },
    onDragEnd(event) {
      event.element.style.opacity = "1";
    },
    createDragImage: (target: HTMLElement) => {
      return target;
    },
  });

  const items = document.querySelectorAll<HTMLElement>("#sortable-simple-droppable > div");
  items.forEach((item: HTMLElement) => {
    droppable({
      element: item,
      onDragOver(event: TDroppableEvent) {
        if (event.draggable.element === event.element) {
          // Don't replace items with themselves
          return;
        }
        // Determine rectangle on screen
        const hoveredRect = event.element.getBoundingClientRect();

        // Get vertical middle
        const hoveredMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;

        // Determine mouse position
        const clientOffset = event.draggable.meta;

        // Get pixels to the top
        const hoveredClientY = clientOffset.clientY - hoveredRect.top;

        // move the item
        if (hoveredClientY < hoveredMiddleY) {
          event.element?.before(event.draggable.element);
        } else {
          event.element?.after(event.draggable.element);
        }
      },
    });
  });

  const code = document.querySelector("#example-sortable-simple-code");
  if (code) {
    code.innerHTML = `
draggable({
  element: document.querySelectorAll("#sortable-simple-droppable > div"),
  onDragStart(event) {
    setTimeout(() => {
      event.element.style.opacity = "0";
    });
  },
  onDragEnd(event) {
    event.element.style.opacity = "1";
  },
  createDragImage: (target: HTMLElement) => {
    return target;
  },
});

const items = document.querySelectorAll<HTMLElement>("#sortable-simple-droppable > div");
items.forEach((item: HTMLElement) => {
  droppable({
    element: item,
    onDragOver(event: TDroppableEvent) {
      if (event.draggable.element === event.element) {
        // Don't replace items with themselves
        return;
      }
      // Determine rectangle on screen
      const hoveredRect = event.element.getBoundingClientRect();

      // Get vertical middle
      const hoveredMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;

      // Determine mouse position
      const clientOffset = event.draggable.meta;

      // Get pixels to the top
      const hoveredClientY = clientOffset.clientY - hoveredRect.top;

      // move the item
      if (hoveredClientY < hoveredMiddleY) {
        event.element?.before(event.draggable.element);
      } else {
        event.element?.after(event.draggable.element);
      }
    },
  });
});
      `;
  }
};
