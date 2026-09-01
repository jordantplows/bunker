const LABELS = ["MAP", "MODEL", "INTERVENE", "ERADICATE"] as const;
const DIM = "rgba(20,23,26,0.25)";
const ACTIVE = "#3F8F5B";

export function initProgramSteps(): void {
  const stageLabel = document.getElementById("stage-label");
  const rects = Array.from({ length: 4 }, (_, i) =>
    document.getElementById(`rect-${i}`)
  );

  function setStep(step: number): void {
    if (stageLabel) stageLabel.textContent = `Stage: ${LABELS[step]}`;

    for (let i = 0; i < 4; i++) {
      const rect = rects[i];
      if (!rect) continue;
      rect.setAttribute("stroke", i === step ? ACTIVE : DIM);
      rect.setAttribute("stroke-width", i === step ? "2" : "1");
    }
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setStep(parseInt((e.target as HTMLElement).dataset.step!, 10));
        }
      });
    },
    { rootMargin: "-40% 0px -50% 0px" }
  );

  document.querySelectorAll("[data-step]").forEach((el) => observer.observe(el));
}
