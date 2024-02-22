import { DATATRANSFER_MIME_TYPE, type TDraggable } from "../draggable/createDraggable.js";
import { registry } from "../registry.js";

type TDroppableEventType =
  | "dragover"
  | "dragenter"
  | "dragleave"
  | "drop"
  | "dragstart" // event that will be triggered by supported draggable
  | "dragend"; // event that will be triggered by supported draggable

export type TDroppable = {
  get element(): HTMLElement;
  canDrop(draggable: TDraggable): boolean;
  triggerEvent(eventType: TDroppableEventType, event?: DragEvent): void;
  dispose(): void;
};

export type TDroppableEvent = {
  element: HTMLElement;
  draggable: TDraggable;
};

type TDroppableDropEvent = TDroppableEvent & {
  getData?(key?: string): string;
  origEvent: DragEvent;
};

export type TCreateDroppable = {
  element: HTMLElement;
  canDrop?(draggable: TDraggable): boolean;
  onDragOver?(event: TDroppableEvent): void;
  onDragEnter?(event: TDroppableEvent): void;
  onDragLeave?(event: TDroppableEvent): void;
  onDrop?(event: TDroppableDropEvent): void;

  // special callbacks that will be called when the **draggable's** event is triggered
  onDragStart?(event: TDroppableEvent): void;
  onDragEnd?(event: TDroppableEvent): void;
};

const addEventListener = (
  eventType: TDroppableEventType,
  element: HTMLElement,
  callback: (event: DragEvent) => void,
  preventDefault: boolean = true,
) => {
  const cb = (event: DragEvent) => {
    if (preventDefault) {
      event.preventDefault();
    }
    callback(event);
  };
  element.addEventListener(eventType, cb);
  return () => {
    element.removeEventListener(eventType, cb);
  };
};

export const createDroppable = (input: TCreateDroppable): TDroppable => {
  const removeDropEventListener = addEventListener("drop", input.element, (event) => {
    event.preventDefault();
    if (typeof input.onDrop === "function") {
      const draggable = registry.getActiveDraggable();
      const canDrop = input.canDrop ?? (() => true);
      if (draggable && !canDrop(draggable)) {
        return;
      }
      if (draggable) {
        input.onDrop({
          element: input.element,
          draggable,
          getData(key?: string): string {
            return event.dataTransfer?.getData(key ?? DATATRANSFER_MIME_TYPE) ?? "";
          },
          origEvent: event,
        });
      } else {
        console.warn("No active draggable found.");
      }
    }
  });
  const removeDragOverEventListener = addEventListener("dragover", input.element, (event) => {
    event.preventDefault();
    if (typeof input.onDragOver === "function") {
      const draggable = registry.getActiveDraggable();
      if (draggable) {
        input.onDragOver({
          element: input.element,
          draggable,
        });
      } else {
        console.warn("No active draggable found.");
      }
    }
  });

  return {
    get element(): HTMLElement {
      return input.element;
    },
    canDrop(draggable: TDraggable): boolean {
      return typeof input.canDrop === "function" ? input.canDrop(draggable) : true;
    },
    triggerEvent(eventType: TDroppableEventType, event?: DragEvent) {
      switch (eventType) {
        case "dragenter": {
          if (typeof input.onDragEnter === "function") {
            const draggable = registry.getActiveDraggable();
            if (draggable) {
              input.onDragEnter({
                element: input.element,
                draggable,
              });
            } else {
              console.warn("No active draggable found.");
            }
          }
          break;
        }
        case "dragleave": {
          if (typeof input.onDragLeave === "function") {
            const draggable = registry.getActiveDraggable();
            if (draggable) {
              input.onDragLeave({
                element: input.element,
                draggable,
              });
            } else {
              console.warn("No active draggable found.");
            }
          }
          break;
        }
        case "dragover": {
          if (typeof input.onDragOver === "function") {
            const draggable = registry.getActiveDraggable();
            if (draggable) {
              input.onDragOver({
                element: input.element,
                draggable,
              });
            } else {
              console.warn("No active draggable found.");
            }
          }
          break;
        }
        case "drop": {
          if (typeof input.onDrop === "function") {
            const draggable = registry.getActiveDraggable();
            if (!event) {
              console.error("DragEvent is required for drop event but was not provided.");
              return;
            }
            if (draggable) {
              input.onDrop({
                element: input.element,
                draggable,
                getData(key?: string): string {
                  return event.dataTransfer?.getData(key ?? DATATRANSFER_MIME_TYPE) ?? "";
                },
                origEvent: event,
              });
            } else {
              console.warn("No active draggable found.");
            }
          }
          break;
        }
        case "dragstart": {
          if (typeof input.onDragStart === "function") {
            const draggable = registry.getActiveDraggable();
            if (draggable) {
              input.onDragStart({
                element: input.element,
                draggable,
              });
            } else {
              console.warn("No active draggable found.");
            }
          }
          break;
        }
        case "dragend": {
          if (typeof input.onDragEnd === "function") {
            const draggable = registry.getActiveDraggable();
            if (draggable) {
              input.onDragEnd({
                element: input.element,
                draggable,
              });
            } else {
              console.warn("No active draggable found.");
            }
          }
          break;
        }
      }
    },
    dispose() {
      removeDropEventListener();
      removeDragOverEventListener();
    },
  } satisfies TDroppable;
};
