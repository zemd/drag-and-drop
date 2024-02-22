import type { TDraggable } from "../draggable/createDraggable.js";
import { registry } from "../registry.js";
import {
  calculatePositionOffset,
  getDragElementByEvent,
  notifyDroppables,
  updateMetaFromEvent,
} from "../utils.js";

const handleDragImage = (element: TDraggable, event: DragEvent) => {
  const [offsetX, offsetY] = calculatePositionOffset(element, event);
  const dragImage = element.createDragImage();

  if (offsetX < 0) {
    dragImage.style.paddingLeft = `${Math.abs(offsetX)}px`;
  }
  if (offsetY < 0) {
    dragImage.style.paddingTop = `${Math.abs(offsetY)}px`;
  }

  event.dataTransfer?.setDragImage(dragImage, offsetX, offsetY);
};

// NOTE: When a drag first starts it will also trigger a "dragenter" on the draggable element
export const ondragstart = (event: DragEvent) => {
  const element: TDraggable | null = getDragElementByEvent(event);
  if (!element) {
    return;
  }

  if (!element.canDrag()) {
    event.preventDefault();
    console.log("canDrag() callback restricted the dragging for this element");
    return;
  }

  handleDragImage(element, event);
  element.triggerEvent("dragstart", event);
  // storing the initial position of the element and the mouse
  // this will help to calculate the position of the drag image and
  // eventual position of the element after the drag ends
  updateMetaFromEvent(element, event, "initial");

  event.dataTransfer!.effectAllowed = element.effectAllowed;

  registry.registerActiveElement(element);

  notifyDroppables(element, "dragstart");
};
