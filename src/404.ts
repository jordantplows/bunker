import { injectStyles, navbar, reveal } from "./layout";

injectStyles();
document.title = "404 — Bunker";

const meta = document.createElement("meta");
meta.name = "description";
meta.content = "Page not found.";
document.head.appendChild(meta);

document.body.style.minHeight = "100vh";
document.body.style.display = "flex";
document.body.style.flexDirection = "column";

document.body.innerHTML = `
${navbar()}

<main class="four-oh-four">
  <h1>404</h1>
  <p>This page doesn't exist yet.</p>
  <a class="back" href="/">Back to Bunker</a>
</main>

<footer class="site-footer" style="max-width:640px;width:100%;margin:0 auto;padding:56px 32px 40px;">
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
</footer>
<div class="footer-bottom" style="max-width:640px;width:100%;margin:0 auto;padding:24px 32px 48px;">
  <span>&copy; 2026 Bunker Longevity, Inc. All rights reserved.</span>
</div>`;

reveal();
