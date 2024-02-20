import type { TDraggable } from "./draggable/createDraggable";
import { registry } from "./registry";

export const checkEvent = (event: DragEvent): boolean => {
  // using .target instead of .currentTarget here since we bound the listener to window object
  // rather than actual element
  const target = event.target;

  if (!(target instanceof HTMLElement)) {
    console.warn("Trying to drag element which is not an instance of HTMLElement");
    return false;
  }

  return true;
};

export const getDragElementByEvent = (event: DragEvent): TDraggable | null => {
  if (!checkEvent(event)) {
    return null;
  }

  const element = registry.getDraggable(event.target as HTMLElement);
  if (!element) {
    console.warn("Trying to drag element which was not registered with draggable()");
    return null;
  }

  return element;
};

type TOffsetCompatible = {
  offsetX: number;
  offsetY: number;
};

/**
 * This function can be useful when creating drag image. This implies the situation
 * when you need to understand the position of the element and the position of the mouse
 * relative to the element.
 */
export const calculatePositionOffset = (element: TDraggable, event: TOffsetCompatible) => {
  if (element.draggable === element.element) {
    return [event.offsetX, event.offsetY];
  }
  // else there is a dragHandle
  // INFO: getBoundingClientRect() method returns information about the size of an element and its position relative to the **viewport**.
  const rectEl = element.element.getBoundingClientRect();
  const rectDrag = element.draggable.getBoundingClientRect();

  const offsetX = rectDrag.x - rectEl.x + event.offsetX;
  const offsetY = rectDrag.y - rectEl.y + event.offsetY;
  return [offsetX, offsetY];
};

export const updateMetaFromEvent = (element: TDraggable, event: DragEvent, prefix: string = "") => {
  element.set(`${prefix}clientX`, event.clientX);
  element.set(`${prefix}clientY`, event.clientY);
  element.set(`${prefix}offsetX`, event.offsetX);
  element.set(`${prefix}offsetY`, event.offsetY);

  // make sure you invoked checkEvent() before calling this function
  const target = event.target as HTMLElement;

  element.set("rect", target.getBoundingClientRect());
};

export const notifyDroppables = (element: TDraggable, eventType: "dragstart" | "dragend") => {
  const droppables = registry.getDroppables().filter((droppable) => {
    return droppable.canDrop(element);
  });
  droppables.forEach((droppable) => {
    droppable.triggerEvent(eventType);
  });
};

export const createDragImage = (element: HTMLElement): HTMLElement => {
  const dragImageElement = document.createElement("div");
  const innerElement = document.createElement("div");
  const cloned: HTMLElement = element.cloneNode(true) as HTMLElement;
  cloned.style.position = "static";

  innerElement.append(cloned);
  dragImageElement.append(innerElement);

  dragImageElement.style.position = "fixed";
  dragImageElement.style.left = "-10000px"; //`${element.getBoundingClientRect().left}px`;
  dragImageElement.style.top = `${element.getBoundingClientRect().top}px`;
  dragImageElement.style.pointerEvents = "none";

  // we need to add the dragImageElement to the body to render it
  document.body.append(dragImageElement);
  setTimeout(() => {
    // if we remove the dragImageElement immediately, it will not be rendered
    // when we set the dragImage, it will be rendered and then we can remove it
    document.body.removeChild(dragImageElement);
  });

  // offsetWidth is a measurement in pixels of the element's CSS width, including any borders,
  // padding, and vertical scrollbars (if rendered). It does not include the width of
  // pseudo-elements such as ::before or ::after.
  innerElement.style.width = `${element.offsetWidth}px`;
  innerElement.style.height = `${element.getBoundingClientRect().height}px`;
  innerElement.style.display = "flex";
  innerElement.style.alignItems = "stretch";
  innerElement.style.flexDirection = "column";
  innerElement.style.boxShadow = "2px 2px 0px black";
  //innerElement.style.transform = 'rotateZ(-6deg)';

  return dragImageElement;
};
