import { registry } from "./registry.js";
import { ondragstart } from "./events/ondragstart.js";
import { ondragend } from "./events/ondragend.js";
import { ondrag } from "./events/ondrag.js";
import { ondragover } from "./events/ondragover.js";
import { ondragenter } from "./events/ondragenter.js";
import { ondragleave } from "./events/ondragleave.js";
import { ondrop } from "./events/ondrop.js";

let isEventListenersAdded = false;

export const tryAddGlobalEventListeners = () => {
  if (isEventListenersAdded) {
    return;
  }
  // dragstart and dragend are important for draggable
  window.addEventListener("dragstart", ondragstart, { capture: true });
  window.addEventListener("dragend", ondragend, { capture: true });
  window.addEventListener("drag", ondrag, { capture: true });
  // all other events are making sense for droppable
  window.addEventListener("dragover", ondragover);
  window.addEventListener("dragenter", ondragenter, { capture: true });
  window.addEventListener("dragleave", ondragleave, { capture: true });
  window.addEventListener("drop", ondrop, { capture: true });

  isEventListenersAdded = true;
};

export const tryRemoveGlobalEventListeners = () => {
  if (registry.draggableSize > 0) {
    return;
  }
  window.removeEventListener("dragstart", ondragstart);
  window.removeEventListener("dragend", ondragend);
  window.removeEventListener("drag", ondrag);
  window.removeEventListener("dragover", ondragover);
  window.removeEventListener("dragenter", ondragenter);
  window.removeEventListener("dragleave", ondragleave);
  isEventListenersAdded = false;
};
