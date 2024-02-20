import { draggable, droppable } from "../../../src";
import {
  TDragStartEvent,
  TDraggable,
  TDraggableEvent,
} from "../../../src/draggable/createDraggable";
import { TDroppableEvent } from "../../../src/droppable/createDroppable";

export const exampleMultipleTargets = () => {
  document.querySelectorAll(".multiple-targets-draggable").forEach((element) => {
    draggable({
      type: element.textContent?.trim(),
      element: element as HTMLElement,
      onDragStart(event: TDragStartEvent) {
        event.element.style.opacity = "0.5";
      },
      onDragEnd(event: TDraggableEvent) {
        event.element.style.opacity = "1";
      },
    });
  });

  droppable({
    element: document.querySelector("#multiple-targets-droppable-1"),
    canDrop: (draggable: TDraggable) => {
      return draggable.type === "Glass";
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
    onDrop(event: TDroppableEvent) {
      const { draggable } = event;
      alert(`You dropped ${draggable.textContent?.trim()} into Dustbin!`);
    },
  });
  droppable({
    element: document.querySelector("#multiple-targets-droppable-2"),
    canDrop: (draggable: TDraggable) => {
      return draggable.type === "Banana";
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
    onDrop(event: TDroppableEvent) {
      const { draggable } = event;
      alert(`You dropped ${draggable.textContent?.trim()} into Dustbin!`);
    },
  });
  droppable({
    element: document.querySelector("#multiple-targets-droppable-3"),
    canDrop: (draggable: TDraggable) => {
      return draggable.type === "Glass" || draggable.type === "Paper";
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
    onDrop(event: TDroppableEvent) {
      const { draggable } = event;
      alert(`You dropped ${draggable.textContent?.trim()} into Dustbin!`);
    },
  });
  droppable({
    element: document.querySelector("#multiple-targets-droppable-4"),
    canDrop: (draggable: TDraggable) => {
      return draggable.type === "Paper";
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
    onDrop(event: TDroppableEvent) {
      const { draggable } = event;
      alert(`You dropped ${draggable.textContent?.trim()} into Dustbin!`);
    },
  });

  const code = document.querySelector("#example-multiple-targets-code");
  if (code) {
    code.innerHTML = `
document.querySelectorAll(".multiple-targets-draggable").forEach((element) => {
  draggable({
    type: element.textContent?.trim(),
    element: element as HTMLElement,
    onDragStart(event: TDragStartEvent) {
      event.element.style.opacity = "0.5";
    },
    onDragEnd(event: TDraggableEvent) {
      event.element.style.opacity = "1";
    },
  });
});

droppable({
  element: document.querySelector("#multiple-targets-droppable-1"),
  canDrop: (draggable: TDraggable) => {
    return draggable.type === "Glass";
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
  onDrop(event: TDroppableEvent) {
    const { draggable } = event;
    alert(\`You dropped \${draggable.textContent?.trim()} into Dustbin!\`);
  },
});
droppable({
  element: document.querySelector("#multiple-targets-droppable-2"),
  canDrop: (draggable: TDraggable) => {
    return draggable.type === "Banana";
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
  onDrop(event: TDroppableEvent) {
    const { draggable } = event;
    alert(\`You dropped \${draggable.textContent?.trim()} into Dustbin!\`);
  },
});
droppable({
  element: document.querySelector("#multiple-targets-droppable-3"),
  canDrop: (draggable: TDraggable) => {
    return draggable.type === "Glass" || draggable.type === "Paper";
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
  onDrop(event: TDroppableEvent) {
    const { draggable } = event;
    alert(\`You dropped \${draggable.textContent?.trim()} into Dustbin!\`);
  },
});
droppable({
  element: document.querySelector("#multiple-targets-droppable-4"),
  canDrop: (draggable: TDraggable) => {
    return draggable.type === "Paper";
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
  onDrop(event: TDroppableEvent) {
    const { draggable } = event;
    alert(\`You dropped \${draggable.textContent?.trim()} into Dustbin!\`);
  },
});`;
  }
};
