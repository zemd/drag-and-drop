import {
  TDragStartEvent,
  TDraggableEvent,
} from "./../../src/draggable/createDraggable";
import { TDroppableEvent } from "./../../src/droppable/createDroppable";
import { TDraggable } from "../../src/draggable/createDraggable";
import { draggable, droppable } from "../../src";

export function exampleSingleTarget() {
  draggable({
    type: "single-target-draggable",
    element: document.querySelectorAll(".single-target-draggable"),
    onDragStart(event: TDragStartEvent) {
      event.element.style.opacity = "0.5";
    },
    onDragEnd(event: TDraggableEvent) {
      event.element.style.opacity = "1";
    },
  });
  droppable({
    element: document.querySelector("#single-target-droppable"),
    canDrop(draggable: TDraggable) {
      return draggable.type === "single-target-draggable";
    },
    onDrop(event: TDroppableEvent) {
      const { draggable } = event;
      alert(
        `You dropped ${draggable.element.textContent?.trim()} into Dustbin!`,
      );
    },
    onDragStart(event: TDroppableEvent) {
      event.element.style.backgroundColor = "darkkhaki";
      event.element.textContent = "Drag box here";
    },
    onDragEnd(event: TDroppableEvent) {
      event.element.style.backgroundColor = "";
      event.element.textContent = "Drag box here";
    },
    onDragEnter(event: TDroppableEvent) {
      event.element.style.backgroundColor = "darkgreen";
      event.element.textContent = "Release to drop";
    },
    onDragLeave(event: TDroppableEvent) {
      event.element.style.backgroundColor = "darkkhaki";
      event.element.textContent = "Drag box here";
    },
  });
  const code = document.querySelector("#example-single-target-code");
  if (code) {
    code.innerHTML = `
draggable({
  type: "single-target-draggable",
  element: document.querySelectorAll(".single-target-draggable"),
  onDragStart(event: TDragStartEvent) {
    event.element.style.opacity = "0.5";
  },
  onDragEnd(event: TDraggableEvent) {
    event.element.style.opacity = "1";
  },
});
droppable({
  element: document.querySelector("#single-target-droppable"),
  canDrop(draggable: TDraggable) {
    return draggable.type === "single-target-draggable";
  },
  onDrop(event: TDroppableEvent) {
    const { draggable } = event;
    alert(\`You dropped \${draggable.textContent?.trim()} into Dustbin!\`);
  },
  onDragStart(event: TDroppableEvent) {
    event.element.style.backgroundColor = "darkkhaki";
    event.element.textContent = "Drag box here";
  },
  onDragEnd(event: TDroppableEvent) {
    event.element.style.backgroundColor = "";
    event.element.textContent = "Drag box here";
  },
  onDragEnter(event: TDroppableEvent) {
    event.element.style.backgroundColor = "darkgreen";
    event.element.textContent = "Release to drop";
  },
  onDragLeave(event: TDroppableEvent) {
    event.element.style.backgroundColor = "darkkhaki";
    event.element.textContent = "Drag box here";
  }
});`;
  }
}
