import { tryAddGlobalEventListeners, tryRemoveGlobalEventListeners } from "../events";
import { registry } from "../registry";
import { createDroppable, type TCreateDroppable } from "./createDroppable";

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
