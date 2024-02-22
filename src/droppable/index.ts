import { tryAddGlobalEventListeners, tryRemoveGlobalEventListeners } from "../events.js";
import { registry } from "../registry.js";
import { createDroppable, type TCreateDroppable } from "./createDroppable.js";

type TDroppableOpts = {
  element: HTMLElement | null;
} & Pick<
  TCreateDroppable,
  "canDrop" | "onDragOver" | "onDragEnter" | "onDragLeave" | "onDrop" | "onDragStart" | "onDragEnd"
>;

export const droppable = (opts: TDroppableOpts) => {
  const { element } = opts;

  if (!element) {
    // exit silently if no element provided
    return;
  }

  const droppableObj = createDroppable({
    ...opts,
    element,
  });
  const unregisterDroppable = registry.registerDroppable(droppableObj);
  tryAddGlobalEventListeners();

  return () => {
    droppableObj.dispose();
    unregisterDroppable();
    tryRemoveGlobalEventListeners();
  };
};
