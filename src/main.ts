import { drawContours } from "./contours";
import { initReveal } from "./reveal";
import { initProgramSteps } from "./program-steps";

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const contourSvg = document.getElementById("contours") as SVGSVGElement | null;
if (contourSvg) {
  drawContours(contourSvg, reduced);
}

initReveal(reduced);
initProgramSteps();
