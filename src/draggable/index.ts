import { createDraggable, type TCreateDraggable, type TEffectAllowed } from "./createDraggable.js";
import { registry } from "../registry.js";
import { tryAddGlobalEventListeners, tryRemoveGlobalEventListeners } from "../events.js";

export type TDraggableOpts = {
  /**
   * The element which supposed to be draggable. In case
   * if multiple elements provided, then all of them the same
   * configuration.
   *
   * NOTE: querySelectorAll() returns NodeList type, and the
   * option handles it as it is.
   */
  element: HTMLElement | NodeListOf<HTMLElement> | null;
  effectAllowed?: TEffectAllowed;
} & Pick<
  TCreateDraggable,
  | "type"
  | "canDrag"
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
  | "setHandleElement"
  | "createDragImage"
>;

type TDisposableArray = Array<() => void>;

/**
 * A factory method that initializes draggable elements for the provided HTMLElements
 *
 * Example,
 *
 * useEffect(() => {
 *   const dispose = draggable({
 *     element: document.querySelectorAll(".myelement"),
 *     canDrag(element: HTMLElement) {
 *        if (element.hasAttribute("can-drag")) {
 *          return true
 *        }
 *        return false;
 *     }
 *   });
 *
 *   return () => {
 *     dispose();
 *   };
 * }, []);
 *
 */
export const draggable = (opts: TDraggableOpts) => {
  const { element, ...options } = opts;

  if (!element || (element instanceof NodeList && element.length === 0)) {
    // exit silently if no element provided
    return;
  }
  const elements = element instanceof HTMLElement ? [element] : Array.from(element);
  const disposable: TDisposableArray = [];

  for (const [curInd, curElem] of elements.entries()) {
    const draggableObj = createDraggable({
      ...options,
      element: curElem,
      order: curInd,
      effectAllowed: opts.effectAllowed ?? "move",
    });
    const unregisterDraggable = registry.registerDraggable(draggableObj);
    disposable.push(() => {
      draggableObj.dispose();
      unregisterDraggable();
    });
  }

  tryAddGlobalEventListeners();

  return () => {
    disposable.forEach((d) => {
      d();
    });
    tryRemoveGlobalEventListeners();
  };
};
