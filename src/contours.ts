const NS = "http://www.w3.org/2000/svg";

export function drawContours(svg: SVGSVGElement, reduced: boolean): void {
  const g = document.createElementNS(NS, "g");

  for (let l = 0; l < 14; l++) {
    const base = 40 + l * 70;
    let d = `M -100 ${base}`;

    for (let x = -100; x <= 1900; x += 40) {
      const y =
        base +
        Math.sin(x * 0.004 + l * 1.7) * 26 +
        Math.sin(x * 0.011 + l * 0.6) * 14;
      d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
    }

    const path = document.createElementNS(NS, "path");
    path.setAttribute("d", d);
    path.setAttribute("fill", "none");
    path.setAttribute(
      "stroke",
      `rgba(242,239,233,${0.05 + 0.035 * (l % 4 === 0 ? 2 : 1)})`
    );
    path.setAttribute("stroke-width", "1");
    g.appendChild(path);
  }

  if (!reduced) {
    g.style.animation = "drift 60s linear infinite alternate";
  }

  svg.appendChild(g);
}
