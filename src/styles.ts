const CSS = `
:root {
  --bg: #FAFAFA;
  --text: rgba(17,17,17,0.6);
  --text-bright: #111;
  --text-dim: rgba(17,17,17,0.50);
  --forest: #2D5A27;
  --forest-dim: rgba(45,90,39,0.45);
  --rule: rgba(17,17,17,0.1);
}

* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  background-color: var(--bg);
  background-image: radial-gradient(circle, rgba(45,90,39,0.1) 1px, transparent 1px);
  background-size: 24px 24px;
  color: var(--text);
  font-family: 'Newsreader', Georgia, serif;
  font-size: 19px;
  line-height: 1.9;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

a {
  color: var(--text-bright);
  text-decoration: none;
  border-bottom: 1px solid var(--rule);
  transition: border-color 0.15s, color 0.15s;
}
a:hover { color: var(--text-bright); border-color: var(--text-bright); }
:focus-visible { outline: 2px solid var(--forest); outline-offset: 2px; }

/* ── Navbar ── */
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  padding: 24px 32px;
  border-bottom: 2px solid var(--text-bright);
}
.navbar-brand {
  font-family: 'Inter Tight', Helvetica, sans-serif;
  font-weight: 900;
  font-size: 14px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-bright);
  border-bottom: none;
}
.navbar-links { display: flex; gap: 24px; list-style: none; }
.navbar-links a {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--forest);
  border-bottom: none;
}
.navbar-links a:hover { color: var(--text-bright); }
.navbar-links .active { color: var(--text-bright); }

/* ── Content ── */
.content {
  margin: 0 auto;
  padding: 0 32px;
}

/* ── Hero — homepage ── */
.hero--home {
  padding: 140px 0;
  border-bottom: 1px solid var(--rule);
  text-align: center;
}
.hero--home h1 {
  font-family: 'Inter Tight', Helvetica, sans-serif;
  font-weight: 900;
  font-size: clamp(48px, 9vw, 110px);
  line-height: 0.9;
  white-space: nowrap;
  letter-spacing: -0.05em;
  color: var(--text-bright);
}
.hero--home .lede {
  margin-top: 24px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--forest);
}

/* ── Hero — subpages ── */
.hero {
  padding: 80px 0 56px;
  border-bottom: 1px solid var(--rule);
}
.hero h1 {
  font-family: 'Inter Tight', Helvetica, sans-serif;
  font-weight: 900;
  font-size: clamp(36px, 7vw, 64px);
  line-height: 0.95;
  letter-spacing: -0.04em;
  color: var(--text-bright);
}
.hero .subtitle {
  margin-top: 20px;
  font-size: 17px;
  line-height: 1.7;
  color: var(--text);
}

/* ── Sections ── */
.section {
  padding: 56px 0;
  border-bottom: 1px solid var(--rule);
}
.section:last-child { border-bottom: none; }
.section p { margin-bottom: 24px; }
.section p:last-child { margin-bottom: 0; }

.pull {
  font-family: 'Inter Tight', Helvetica, sans-serif;
  font-weight: 900;
  font-size: clamp(28px, 5.5vw, 52px);
  line-height: 1.08;
  letter-spacing: -0.03em;
  color: var(--text-bright);
  margin-bottom: 32px;
}

/* ── Page header (legal, careers, contact) ── */
.page-header {
  padding: 80px 0 48px;
  border-bottom: 1px solid var(--rule);
}
.page-header h1 {
  font-family: 'Inter Tight', Helvetica, sans-serif;
  font-weight: 900;
  font-size: clamp(36px, 7vw, 56px);
  line-height: 1;
  letter-spacing: -0.04em;
  color: var(--text-bright);
}
.page-header .updated {
  margin-top: 16px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-dim);
}
.page-header .subtitle {
  margin-top: 20px;
  font-size: 17px;
  line-height: 1.7;
  color: var(--text);
}

/* ── Legal sections ── */
.legal-section {
  padding: 40px 0;
  border-bottom: 1px solid var(--rule);
}
.legal-section:last-of-type { border-bottom: none; }
.legal-section h2 {
  font-family: 'Inter Tight', Helvetica, sans-serif;
  font-weight: 900;
  font-size: 22px;
  letter-spacing: -0.02em;
  color: var(--text-bright);
  margin-bottom: 16px;
}
.legal-section p { margin-bottom: 16px; }
.legal-section p:last-child { margin-bottom: 0; }
.legal-section ul { margin: 0 0 16px 24px; }
.legal-section li { margin-bottom: 8px; }

/* ── Careers ── */
.cta-block {
  padding: 48px 0;
  border-bottom: 1px solid var(--rule);
}
.cta-block p { margin-bottom: 20px; }
.cta-block a.email-cta {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--forest);
  border-bottom: 1px solid var(--forest-dim);
}
.cta-block a.email-cta:hover { color: var(--text-bright); border-color: var(--text-bright); }

/* ── Contact ── */
.contact-section {
  padding: 48px 0;
  border-bottom: 1px solid var(--rule);
}
.contact-section:last-of-type { border-bottom: none; }
.contact-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-dim);
  margin-bottom: 12px;
}
.contact-value {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--forest);
  border-bottom: 1px solid var(--forest-dim);
}
.contact-value:hover { color: var(--text-bright); border-color: var(--text-bright); }
.contact-note {
  margin-top: 16px;
  font-size: 16px;
  line-height: 1.7;
}

/* ── Filter tabs (AI Models) ── */
.filters {
  display: flex;
  gap: 8px;
  padding: 24px 0;
  border-bottom: 1px solid var(--rule);
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  flex-wrap: wrap;
}
.filters button {
  background: none;
  border: 1px solid var(--rule);
  font: inherit;
  color: var(--text-dim);
  cursor: pointer;
  padding: 8px 16px;
  transition: color 0.15s, border-color 0.15s, background 0.15s;
}
.filters button:hover { color: var(--text-bright); border-color: var(--text-bright); }
.filters button.active { color: #fff; background: var(--text-bright); border-color: var(--text-bright); }
.model-count {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.04em;
  color: var(--text-dim);
  padding: 16px 0 0;
}
.no-results {
  padding: 80px 0;
  text-align: center;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 13px;
  letter-spacing: 0.04em;
  color: var(--text-dim);
  display: none;
}

/* ── Model cards ── */
.model-list { padding: 0; }
.model-card {
  padding: 40px 0;
  border-bottom: 1px solid var(--rule);
}
.model-header {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 24px;
}
.model-info h2 {
  font-family: 'Inter Tight', Helvetica, sans-serif;
  font-weight: 900;
  font-size: 32px;
  letter-spacing: -0.02em;
  color: var(--text-bright);
  line-height: 1.2;
}
.model-meta {
  display: flex;
  gap: 12px;
  margin-top: 8px;
  align-items: center;
  flex-wrap: wrap;
}
.model-tag {
  display: inline-block;
  padding: 4px 12px;
  border: 1px solid var(--rule);
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-dim);
}
.model-tag.category {
  border-color: var(--forest-dim);
  color: var(--forest);
}
.model-stat {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.02em;
  color: var(--text-dim);
}
.model-desc {
  margin-top: 16px;
  font-size: 18px;
  line-height: 1.75;
  color: var(--text);
}

/* ── Example block ── */
.model-example {
  margin-top: 24px;
  border: 1px solid var(--rule);
  background: rgba(17,17,17,0.02);
  overflow: hidden;
}
.example-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  border-bottom: 1px solid var(--rule);
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-dim);
}
.example-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.example-col { padding: 16px; }
.example-col:first-child { border-right: 1px solid var(--rule); }
.example-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-dim);
  margin-bottom: 8px;
}
.example-code {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 13px;
  line-height: 1.7;
  color: var(--text-bright);
  white-space: pre-wrap;
  word-break: break-all;
}
.example-output {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 13px;
  line-height: 1.7;
  color: var(--forest);
  white-space: pre-wrap;
}

.model-actions {
  display: flex;
  gap: 12px;
  margin-top: 20px;
  flex-wrap: wrap;
}
.btn {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 12px 24px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, border-color 0.2s, transform 0.1s;
  white-space: nowrap;
  border: none;
}
.btn:active { transform: scale(0.97); }
.btn-primary {
  background: var(--forest);
  color: #fff;
}
.btn-primary:hover { background: #1e4a19; }
.btn-secondary {
  background: none;
  color: var(--text-bright);
  border: 1px solid var(--rule);
}
.btn-secondary:hover { border-color: var(--text-bright); background: rgba(17,17,17,0.03); }
.btn:disabled { opacity: 0.5; cursor: default; transform: none; }

/* ── Research preview tag ── */
.research-preview-tag {
  display: inline-block;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #fff;
  background: var(--forest);
  padding: 5px 12px;
  margin-bottom: 16px;
}

/* ── Deploy modal ── */
.deploy-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(17,17,17,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
}
.deploy-overlay.open {
  opacity: 1;
  pointer-events: auto;
}
.deploy-modal {
  background: var(--bg);
  max-width: 480px;
  width: 100%;
  padding: 40px;
  position: relative;
  border: 1px solid var(--rule);
  transform: translateY(12px);
  transition: transform 0.25s cubic-bezier(0.16,1,0.3,1);
}
.deploy-overlay.open .deploy-modal {
  transform: translateY(0);
}
.deploy-modal-header {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 12px;
}
.deploy-modal-header h2 {
  font-family: 'Inter Tight', Helvetica, sans-serif;
  font-weight: 900;
  font-size: 22px;
  letter-spacing: -0.02em;
  color: var(--text-bright);
  line-height: 1.2;
}
.deploy-close {
  background: none;
  border: none;
  font-size: 24px;
  color: var(--text-dim);
  cursor: pointer;
  padding: 0;
  line-height: 1;
  transition: color 0.15s;
}
.deploy-close:hover { color: var(--text-bright); }
.deploy-modal-desc {
  font-size: 15px;
  line-height: 1.6;
  color: var(--text);
  margin-bottom: 28px;
}
.deploy-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.deploy-label {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.deploy-label-text {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-dim);
}
.deploy-input, .deploy-textarea {
  font-family: 'Newsreader', Georgia, serif;
  font-size: 16px;
  line-height: 1.5;
  padding: 10px 14px;
  border: 1px solid var(--rule);
  background: #fff;
  color: var(--text-bright);
  transition: border-color 0.15s;
}
.deploy-input:focus, .deploy-textarea:focus {
  border-color: var(--forest);
  outline: none;
}
.deploy-textarea { resize: vertical; }
.deploy-submit { margin-top: 4px; align-self: flex-start; }
.deploy-success {
  display: none;
  text-align: center;
  padding: 20px 0;
}
.deploy-success-icon {
  width: 48px;
  height: 48px;
  margin: 0 auto 16px;
  background: var(--forest);
  color: #fff;
  font-size: 24px;
  line-height: 48px;
  text-align: center;
}
.deploy-success h3 {
  font-family: 'Inter Tight', Helvetica, sans-serif;
  font-weight: 900;
  font-size: 20px;
  color: var(--text-bright);
  margin-bottom: 8px;
}
.deploy-success p {
  font-size: 15px;
  color: var(--text);
}

/* ── Coming soon ── */
.coming-soon-section {
  padding: 64px 0;
  border-top: 1px solid var(--rule);
}
.coming-soon-heading {
  font-family: 'Inter Tight', Helvetica, sans-serif;
  font-weight: 900;
  font-size: 24px;
  letter-spacing: -0.02em;
  color: var(--text-bright);
  margin-bottom: 20px;
}
.coming-soon-text {
  font-size: 17px;
  line-height: 1.75;
  color: var(--text);
  margin-bottom: 16px;
}
.coming-soon-text:last-of-type { margin-bottom: 24px; }
.coming-soon-cta {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--forest);
  border-bottom: 1px solid var(--forest-dim);
}
.coming-soon-cta:hover { color: var(--text-bright); border-color: var(--text-bright); }

/* ── 404 ── */
.four-oh-four {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 32px;
  text-align: center;
}
.four-oh-four h1 {
  font-family: 'Inter Tight', Helvetica, sans-serif;
  font-weight: 900;
  font-size: clamp(72px, 15vw, 180px);
  line-height: 0.9;
  letter-spacing: -0.05em;
  color: var(--text-bright);
}
.four-oh-four p {
  margin-top: 16px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-dim);
}
.four-oh-four .back {
  margin-top: 40px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: var(--forest);
  border-bottom: 1px solid var(--forest-dim);
}
.four-oh-four .back:hover { color: var(--text-bright); border-color: var(--text-bright); }

/* ── Footer ── */
.site-footer {
  padding: 56px 0 40px;
  border-top: 2px solid var(--text-bright);
}
.footer-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr;
  gap: 32px;
}
.footer-brand {
  font-family: 'Inter Tight', Helvetica, sans-serif;
  font-weight: 900;
  font-size: 14px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-bright);
  margin-bottom: 12px;
}
.footer-tagline {
  font-size: 14px;
  line-height: 1.6;
  color: var(--text);
  margin-bottom: 16px;
}
.footer-email {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--forest);
  border-bottom-color: var(--forest-dim);
}
.footer-email:hover { color: var(--forest); }
.footer-col-title {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-bright);
  margin-bottom: 14px;
}
.footer-col ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.footer-col a {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 13px;
  font-weight: 400;
  color: var(--text);
  border-bottom: none;
}
.footer-col a:hover { color: var(--forest); }
.footer-bottom {
  padding: 24px 0 0;
  margin-top: 40px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.06em;
  color: var(--text-dim);
}

/* ── Reveal animation ── */
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease, transform 1s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal.visible { opacity: 1; transform: translateY(0); }

/* ── Responsive ── */
@media (max-width: 560px) {
  .model-header { flex-direction: column; }
  .example-body { grid-template-columns: 1fr; }
  .example-col:first-child { border-right: none; border-bottom: 1px solid var(--rule); }
}
@media (max-width: 520px) {
  .footer-grid { grid-template-columns: 1fr; gap: 28px; }
}
@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; transition: none; }
}
`;

const FONT_URL =
  "https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400&family=Inter+Tight:wght@800;900&family=IBM+Plex+Mono:wght@400;500;700&display=swap";

export function injectStyles(): void {
  const head = document.head;

  const preconnect1 = document.createElement("link");
  preconnect1.rel = "preconnect";
  preconnect1.href = "https://fonts.googleapis.com";
  head.appendChild(preconnect1);

  const preconnect2 = document.createElement("link");
  preconnect2.rel = "preconnect";
  preconnect2.href = "https://fonts.gstatic.com";
  preconnect2.crossOrigin = "";
  head.appendChild(preconnect2);

  const fontLink = document.createElement("link");
  fontLink.rel = "stylesheet";
  fontLink.href = FONT_URL;
  head.appendChild(fontLink);

  const style = document.createElement("style");
  style.textContent = CSS;
  head.appendChild(style);
}
