const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

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
