const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

// H1 scroll fade
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

// Source toggles
document.querySelectorAll<HTMLElement>(".source").forEach((source) => {
  const toggle = source.querySelector<HTMLButtonElement>(".source-toggle");
  const body = source.querySelector<HTMLElement>(".source-body");
  if (!toggle || !body) return;

  toggle.addEventListener("click", () => {
    const isOpen = source.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    if (isOpen) {
      body.style.maxHeight = body.scrollHeight + "px";
    } else {
      body.style.maxHeight = "0";
    }
  });
});

// Scroll reveal
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

// Terminal typing animation
const labDemo = document.querySelector(".lab-demo");
if (labDemo) {
  const cmdEl = labDemo.querySelector(".cmd") as HTMLElement;
  const cursorEl = labDemo.querySelector(".cursor") as HTMLElement;
  const outputLines = labDemo.querySelectorAll<HTMLElement>(
    ".terminal-output .terminal-line"
  );
  const cmdText = cmdEl?.dataset.text || "";

  if (reducedMotion) {
    if (cmdEl) cmdEl.textContent = cmdText;
    if (cursorEl) cursorEl.style.display = "none";
    outputLines.forEach((l) => l.classList.add("visible"));
  } else {
    if (cursorEl) cursorEl.style.opacity = "0";

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          observer.disconnect();
          playTerminal();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(labDemo);

    function playTerminal() {
      if (!cmdEl || !cursorEl) return;
      cursorEl.style.opacity = "";
      let i = 0;

      function typeNext() {
        if (i < cmdText.length) {
          cmdEl.textContent = cmdText.slice(0, i + 1);
          i++;
          setTimeout(typeNext, 30 + Math.random() * 25);
        } else {
          const delays = [400, 1400, 2600, 4000, 4200, 4600, 5000];
          outputLines.forEach((line, idx) => {
            setTimeout(
              () => line.classList.add("visible"),
              delays[idx] ?? 4000 + idx * 400
            );
          });
          setTimeout(() => {
            cursorEl.style.opacity = "0";
          }, 5500);
        }
      }

      setTimeout(typeNext, 500);
    }
  }
}
