const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

const reveals = document.querySelectorAll<HTMLElement>(".reveal");
if (reducedMotion) {
  reveals.forEach((el) => el.classList.add("visible"));
} else {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  reveals.forEach((el) => obs.observe(el));
}

const buttons = document.querySelectorAll<HTMLButtonElement>(".filters button");
const cards = document.querySelectorAll<HTMLElement>(".model-card");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    buttons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    cards.forEach((card) => {
      card.style.display =
        filter === "all" || card.dataset.category === filter ? "" : "none";
    });
  });
});
