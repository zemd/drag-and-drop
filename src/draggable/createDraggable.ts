import { createDragImage } from "../utils.js";

export type TEffectAllowed =
  | "none"
  | "copy"
  | "copyLink"
  | "copyMove"
  | "link"
  | "linkMove"
  | "move"
  | "all"
  | "uninitialized";

type TDraggableEventType = "dragstart" | "drag" | "dragend";
export type TDraggableEvent = {
  /**
   * The main element that being dragged. It can be different from the handle element.
   * Apart from moving around the element is being used for creating the drag image.
   */
  element: HTMLElement;
  /**
   * The element that is used as a handle. It can be located inside and outside of the
   * main element. But keep in mind that browser has specific rules of the drawing the
   * drag image and positioning it. So it's better to use the handle element inside the
   * main element, or at least to have the handle element located near the main element.
   */
  handleElement: HTMLElement;
};
export type TDragStartEvent = TDraggableEvent & {
  setData(data: string, key?: string): void;
};
export type TDragEvent = TDraggableEvent;
export type TDragEndEvent = TDraggableEvent;

export type TDraggable = {
  get handleElement(): HTMLElement;
  get element(): HTMLElement;
  get order(): number;
  get type(): string;
  get meta(): Record<string, any>;
  get effectAllowed(): TEffectAllowed;
  set(key: string, value: any): void;
  dispose(): void;
  canDrag(): boolean;
  triggerEvent(eventType: TDraggableEventType, args?: unknown): void;
  createDragImage(): HTMLElement;
};

export type TCreateDraggable = {
  element: HTMLElement;
  order: number;
  effectAllowed: TEffectAllowed;
  type?: string;
  setHandleElement?: (element: HTMLElement) => HTMLElement;
  canDrag?: (target: HTMLElement) => boolean;
  createDragImage?: (target: HTMLElement) => HTMLElement;
  onDrag?: (event: TDragEvent) => void;
  onDragStart?: (event: TDragStartEvent) => void;
  onDragEnd?: (event: TDragEndEvent) => void;
};

export const DATATRANSFER_MIME_TYPE = "x-application-dnd";

const resolveDraggable = (input: TCreateDraggable): HTMLElement => {
  if (typeof input.setHandleElement === "function") {
    return input.setHandleElement(input.element);
  }
  return input.element;
};

const initDraggableAttribute = (handleTarget: HTMLElement) => {
  const mouseDown = () => {
    handleTarget.setAttribute("draggable", "true");
  };
  handleTarget.addEventListener("mousedown", mouseDown);

  const mouseup = () => {
    handleTarget.setAttribute("draggable", "false");
  };
  handleTarget.addEventListener("mouseup", mouseup);

  return () => {
    handleTarget.removeEventListener("mousedown", mouseDown);
    handleTarget.removeEventListener("mouseup", mouseup);
    handleTarget.removeAttribute("draggable");
  };
};

export const createDraggable = (input: TCreateDraggable): TDraggable => {
  const handleElement = resolveDraggable(input);
  const disposeDraggableAttribute = initDraggableAttribute(handleElement);
  const metaStore = new Map<string, any>();

  metaStore.set("type", input.type ?? "default");
  metaStore.set("order", input.order);

  return {
    get handleElement(): HTMLElement {
      return handleElement;
    },
    get element(): HTMLElement {
      return input.element;
    },
    get order(): number {
      return metaStore.get("order") | 0;
    },
    get type(): string {
      return metaStore.get("type");
    },
    get effectAllowed(): TEffectAllowed {
      return input.effectAllowed;
    },
    get meta(): Record<string, any> {
      const data: Record<string, any> = Array.from(metaStore).reduce<Record<string, any>>(
        (acc, [key, item]) => {
          return Object.assign(acc, { [key]: item });
        },
        {},
      );
      return Object.freeze(data);
    },
    set(key: string, value: any) {
      metaStore.set(key, value);
    },
    dispose(): void {
      disposeDraggableAttribute();
    },
    canDrag(): boolean {
      return typeof input.canDrag === "function" ? input.canDrag(input.element) : true;
    },
    triggerEvent(eventType: TDraggableEventType, args?: unknown): void {
      switch (eventType) {
        case "drag": {
          if (typeof input.onDrag === "function") {
            input.onDrag({
              element: input.element,
              handleElement,
            });
          }
          break;
        }
        case "dragend": {
          input.element.setAttribute("draggable", "false");
          if (typeof input.onDragEnd === "function") {
            input.onDragEnd({
              element: input.element,
              handleElement,
            });
          }
          break;
        }
        case "dragstart": {
          if (typeof input.onDragStart === "function") {
            const event = args as DragEvent;
            input.onDragStart({
              element: input.element,
              handleElement,
              setData: (data: string, key?: string) => {
                event.dataTransfer?.setData(key ?? DATATRANSFER_MIME_TYPE, data);
              },
            });
          }
          break;
        }
      }
    },
    createDragImage(): HTMLElement {
      if (typeof input.createDragImage === "function") {
        return input.createDragImage(input.element);
      }
      return createDragImage(input.element);
    },
  } satisfies TDraggable;
};
