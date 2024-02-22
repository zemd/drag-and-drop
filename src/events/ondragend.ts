import { registry } from "../registry.js";
import { notifyDroppables } from "../utils.js";

export const ondragend = (event: DragEvent) => {
  const element = registry.getActiveDraggable();
  if (element) {
    notifyDroppables(element, "dragend");
    element.triggerEvent("dragend", event);
  }
  registry.registerActiveElement(null);
};
