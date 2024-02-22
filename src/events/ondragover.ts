import { registry } from "../registry.js";

export const ondragover = (event: DragEvent) => {
  // const point: TClientPoint = new ClientPoint(event.clientX, event.clientY);
  // console.log('point: ', point);
  // const draggableElement = registry.getActiveElement();
  // const droppableElements = droppableRegistry.findDroppableByCoord(point);
  // for (const element of droppableElements) {
  //   if (element.canDrop(draggableElement)) {
  //     element.dragOver(draggableElement);
  //   }
  // }

  const droppableElement = registry.getDroppable(event.target as HTMLElement);
  if (!droppableElement) {
    return;
  }
  droppableElement.triggerEvent("dragover");
};
