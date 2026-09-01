export function initReveal(reduced: boolean): void {
  const reveals = document.querySelectorAll<HTMLElement>("[data-reveal]");

  reveals.forEach((el) => {
    if (reduced) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(14px)";
    el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const el = e.target as HTMLElement;
          el.style.opacity = "1";
          el.style.transform = "none";
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.15 }
  );

  reveals.forEach((el) => observer.observe(el));
}
