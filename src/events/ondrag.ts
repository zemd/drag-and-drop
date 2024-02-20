import { getDragElementByEvent, updateMetaFromEvent } from "../utils";

export const ondrag = (event: DragEvent) => {
  const element = getDragElementByEvent(event);
  if (!element) {
    return;
  }
  updateMetaFromEvent(element, event);
  element.triggerEvent("drag");
};
