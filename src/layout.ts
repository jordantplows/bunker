import { injectStyles } from "./styles.js";
export { injectStyles };

export function navbar(activePath?: string, maxWidth = 640): string {
  const aiActive = activePath === "/ai-models" ? ' class="active"' : "";
  return `<nav class="navbar" style="max-width:${maxWidth}px">
  <a class="navbar-brand" href="/">Bunker</a>
  <ul class="navbar-links">
    <li><a href="/ai-models"${aiActive}>AI Models</a></li>
  </ul>
</nav>`;
}

export function footer(): string {
  return `<footer class="site-footer">
  <div class="footer-grid">
    <div class="footer-col">
      <div class="footer-brand">Bunker</div>
      <p class="footer-tagline">Extending all of humanity to a healthy 100 years of age.</p>
      <a class="footer-email" href="mailto:hello@bunkerbio.com">hello@bunkerbio.com</a>
    </div>
    <div class="footer-col">
      <div class="footer-col-title">Company</div>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/ai-models">AI Models</a></li>
        <li><a href="/careers">Careers</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <div class="footer-col-title">Legal</div>
      <ul>
        <li><a href="/privacy">Privacy</a></li>
        <li><a href="/terms">Terms</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <span>&copy; 2026 Bunker Longevity, Inc. All rights reserved.</span>
  </div>
</footer>`;
}

export function reveal(): void {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const els = document.querySelectorAll<HTMLElement>(".reveal");
  if (reducedMotion) {
    els.forEach((el) => el.classList.add("visible"));
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
    els.forEach((el) => obs.observe(el));
  }
}

export interface MountOptions {
  title: string;
  description: string;
  content: string;
  activePath?: string;
  maxWidth?: number;
}

export function mount(opts: MountOptions): void {
  const mw = opts.maxWidth ?? 640;

  injectStyles();

  document.title = opts.title;

  let meta = document.querySelector<HTMLMetaElement>(
    'meta[name="description"]'
  );
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "description";
    document.head.appendChild(meta);
  }
  meta.content = opts.description;

  document.body.innerHTML =
    navbar(opts.activePath, mw) +
    `<div class="content" style="max-width:${mw}px">` +
    opts.content +
    footer() +
    `</div>`;

  reveal();
}
