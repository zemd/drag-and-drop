import { getDragElementByEvent, updateMetaFromEvent } from "../utils.js";

export const ondrag = (event: DragEvent) => {
  const element = getDragElementByEvent(event);
  if (!element) {
    return;
  }
  updateMetaFromEvent(element, event);
  element.triggerEvent("drag");
};
