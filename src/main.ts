const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

const h1 = document.querySelector("h1") as HTMLElement | null;
if (h1 && !reducedMotion) {
  const dark = [0x1c, 0x1b, 0x18] as const;
  const bg = [0xf5, 0xf4, 0xf0] as const;

  function update(): void {
    const t = Math.min(window.scrollY / (window.innerHeight * 0.6), 1);
    const r = Math.round(dark[0] + (bg[0] - dark[0]) * t);
    const g = Math.round(dark[1] + (bg[1] - dark[1]) * t);
    const b = Math.round(dark[2] + (bg[2] - dark[2]) * t);
    h1!.style.color = `rgb(${r},${g},${b})`;
  }

  window.addEventListener("scroll", update, { passive: true });
}

const reveals = document.querySelectorAll<HTMLElement>(".reveal");
if (reducedMotion) {
  reveals.forEach((el) => el.classList.add("visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  reveals.forEach((el) => revealObserver.observe(el));
}
