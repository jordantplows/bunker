import { mount } from "./layout";

mount({
  title: "Bunker - AI Models",
  description:
    "Browse and deploy AI models built by Bunker for drug discovery, protein folding, genomics, and beyond.",
  activePath: "/ai-models",
  maxWidth: 740,
  content: `
  <header class="hero">
    <h1 class="reveal">Bunker Models</h1>
    <p class="subtitle reveal">Models built by Bunker for the life sciences. Each model ships with an API, documentation, and examples you can run today.</p>
  </header>

  <div class="model-list">

    <div class="model-card reveal">
      <div class="model-header">
        <div class="model-info">
          <h2>BunkerFold-3</h2>
          <div class="model-meta">
            <span class="model-tag category">Protein</span>
            <span class="model-stat">1.2B params</span>
            <span class="model-stat">v3.1</span>
          </div>
        </div>
      </div>
      <p class="model-desc">Predicts 3D protein structure from amino acid sequence. Sub-angstrom accuracy on CASP15 targets with full side-chain resolution.</p>
      <div class="model-example">
        <div class="example-header">
          <span>Example</span>
          <span>biohub.ai/bunkerfold-3</span>
        </div>
        <div class="example-body">
          <div class="example-col">
            <div class="example-label">Input — sequence</div>
            <div class="example-code">MVLSPADKTNVKAAWGKVGA
HAGEYGAEALERMFLSFPTT
KTYFPHFDLSH</div>
          </div>
          <div class="example-col">
            <div class="example-label">Output — prediction</div>
            <div class="example-output">confidence: 0.97
rmsd: 0.42Å
residues_resolved: 51/51
fold_class: globin
time: 1.8s</div>
          </div>
        </div>
      </div>
      <div class="model-actions">
        <button type="button" class="btn btn-primary" data-action="deploy">Deploy Model</button>
        <a href="/ai-models/docs" class="btn btn-secondary">View Docs</a>
      </div>
    </div>

  </div>

  <div class="coming-soon-section reveal">
    <h2 class="coming-soon-heading">More models in development</h2>
    <p class="coming-soon-text">We're actively training the next generation of Bunker models across genomics, drug discovery, and medical imaging. Upcoming releases include whole-genome variant calling, generative molecular design, cryo-EM reconstruction, and multi-endpoint toxicity prediction.</p>
    <p class="coming-soon-text">If you're working on a problem that needs a model we haven't built yet, we want to hear about it.</p>
    <a class="coming-soon-cta" href="mailto:hello@bunkerbio.com">Get in touch</a>
  </div>`,
});

document.querySelectorAll<HTMLButtonElement>("[data-action]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const orig = btn.textContent;
    btn.textContent = "Coming soon";
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = orig;
      btn.disabled = false;
    }, 2000);
  });
});
