import { registry } from "../registry.js";

export const ondragleave = (event: DragEvent) => {
  const droppable = registry.getDroppable(event.target as HTMLElement);
  if (!droppable || !droppable.canDrop(registry.getActiveDraggable()!)) {
    return;
  }
  droppable.triggerEvent("dragleave");
};
