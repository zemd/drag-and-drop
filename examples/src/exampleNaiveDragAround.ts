import { draggable, droppable } from "../../../src";
import { registry } from "../../../src/registry";

function isHTMLElement(element: any): element is HTMLElement {
  return element instanceof HTMLElement;
}

export const exampleNaiveDragAround = () => {
  const element = document.querySelector("#naive-drag-around-draggable");
  if (isHTMLElement(element)) {
    const hideSourceCheckbox: HTMLInputElement | null = document.querySelector<HTMLInputElement>(
      "#naive-drag-around-hide-checkbox"
    );
    draggable({
      element,
      createDragImage(element: HTMLElement): HTMLElement {
        return element;
      },
      onDragStart({ element }) {
        if (hideSourceCheckbox?.checked) {
          setTimeout(() => {
            element.style.opacity = "0";
          });
        }
      },
      onDragEnd({ element }) {
        if (hideSourceCheckbox?.checked) {
          element.style.opacity = "1";
        }
      },
    });
  }
  droppable({
    element: document.querySelector("#naive-drag-around-droppable"),
    onDrop(event) {
      const dragEl = registry.getDraggable(event.draggable);
      if (dragEl) {
        const left =
          parseFloat(event.draggable.style.left) + dragEl.meta.offsetX - dragEl.meta.initialoffsetX;
        const top =
          parseFloat(event.draggable.style.top) + dragEl.meta.offsetY - dragEl.meta.initialoffsetY;

        event.draggable.style.left = `${left}px`;
        event.draggable.style.top = `${top}px`;
      }
    },
  });

  const code = document.querySelector("#example-naive-drag-around-code");
  if (code) {
    code.innerHTML = `
const element = document.querySelector("#naive-drag-around-draggable");
if (isHTMLElement(element)) {
  const hideSourceCheckbox: HTMLInputElement | null = document.querySelector<HTMLInputElement>(
    "#naive-drag-around-hide-checkbox"
  );
  draggable({
    element,
    createDragImage(element: HTMLElement): HTMLElement {
      return element;
    },
    onDragStart({ element }) {
      if (hideSourceCheckbox?.checked) {
        setTimeout(() => {
          element.style.opacity = "0";
        });
      }
    },
    onDragEnd({ element }) {
      if (hideSourceCheckbox?.checked) {
        element.style.opacity = "1";
      }
    },
  });
}
droppable({
  element: document.querySelector("#naive-drag-around-droppable"),
  onDrop(event) {
    const dragEl = registry.getDraggable(event.draggable);
    if (dragEl) {
      const left =
        parseFloat(event.draggable.style.left) + dragEl.meta.offsetX - dragEl.meta.initialoffsetX;
      const top =
        parseFloat(event.draggable.style.top) + dragEl.meta.offsetY - dragEl.meta.initialoffsetY;

      event.draggable.style.left = \`\${left}px\`;
      event.draggable.style.top = \`\${top}px\`;
    }
  },
});
    `;
  }
};
