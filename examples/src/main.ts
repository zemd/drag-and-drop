import "./style.css";
import Prism from "prismjs";
import { exampleMultipleTargets } from "./exampleMultipleTarget";
import { exampleSingleTarget } from "./exampleSingleTarget";
import { exampleNaiveDragAround } from "./exampleNaiveDragAround";
import { exampleSortableSimple } from "./exampleSortableSimple";
// import { registry } from "../../../src/registry";

document.addEventListener("DOMContentLoaded", () => {
  exampleSingleTarget();
  exampleMultipleTargets();
  exampleNaiveDragAround();
  exampleSortableSimple();
  Prism.highlightAll();

  // setInterval(() => {
  //   const debugg = document.querySelector('.simple1-debug');
  //   if (debugg) {
  //     debugg.innerHTML = `
  //     activeElement: ${
  //       registry.getActiveDraggable()?.element?.innerText
  //     }<br/>
  //     draggable meta: <pre>${JSON.stringify(
  //       registry.getActiveDraggable()?.meta,
  //       null,
  //       2
  //     )}</pre>
  //   `;
  //   }
  // }, 15);
});
