import { registry } from "../registry.js";

export const ondrop = (event: DragEvent) => {
  // event.preventDefault();
  const droppableElement = registry.getDroppable(event.target as HTMLElement);
  if (!droppableElement) {
    return;
  }
  // droppableElement.triggerEvent("drop", event);
};
