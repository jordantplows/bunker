import { injectStyles, navbar, footer, reveal } from "./layout";

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

<div style="max-width:640px;width:100%;margin:0 auto;padding:0 32px;">
${footer()}
</div>`;

reveal();
