import { registry } from "../registry";
import { notifyDroppables } from "../utils";

export const ondragend = (event: DragEvent) => {
  const element = registry.getActiveDraggable();
  if (element) {
    notifyDroppables(element, "dragend");
    element.triggerEvent("dragend", event);
  }
  registry.registerActiveElement(null);
};
