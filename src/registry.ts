import type { TDraggable } from "./draggable/createDraggable";
import type { TDroppable } from "./droppable/createDroppable";

const draggableStore = new Set<TDraggable>();
const droppableStore = new Set<TDroppable>();
let activeDraggable: TDraggable | null = null;

export const registry = {
  registerDraggable(element: TDraggable) {
    draggableStore.add(element);
    return () => {
      draggableStore.delete(element);
    };
  },
  registerActiveElement(element: TDraggable | null) {
    activeDraggable = element;
  },
  getDraggable(element: HTMLElement): TDraggable | undefined {
    return Array.from(draggableStore).find((entry) => {
      return entry.element === element;
    });
  },
  getActiveDraggable(): TDraggable | null {
    return activeDraggable;
  },
  get draggableSize() {
    return draggableStore.size;
  },
  registerDroppable(element: TDroppable) {
    droppableStore.add(element);
    return () => {
      droppableStore.delete(element);
    };
  },
  getDroppable(element: HTMLElement): TDroppable | undefined {
    return Array.from(droppableStore).find((entry) => {
      return entry.element === element;
    });
  },
  getDroppables(): Array<TDroppable> {
    return Array.from(droppableStore);
  },
};
