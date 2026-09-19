import{n as e}from"./layout-DsrfhhIF.js";e({title:`Bunker - AI Models`,description:`Browse and deploy AI models built by Bunker for drug discovery, protein folding, genomics, and beyond.`,activePath:`/ai-models`,maxWidth:740,content:`
  <header class="hero">
    <h1 class="reveal">Bunker Models</h1>
    <p class="subtitle reveal">Models built by Bunker for the life sciences. Each model ships with an API, documentation, and examples you can run today.</p>
  </header>

  <div class="model-list">

    <div class="model-card reveal">
      <div class="research-preview-tag">Research Preview</div>
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
        <button type="button" class="btn btn-primary" id="deploy-btn">Deploy Model</button>
        <a href="/ai-models/docs" class="btn btn-secondary">View Docs</a>
      </div>
    </div>

  </div>

  <div class="coming-soon-section reveal">
    <h2 class="coming-soon-heading">More models in development</h2>
    <p class="coming-soon-text">We're actively training the next generation of Bunker models across genomics, drug discovery, and medical imaging. Upcoming releases include whole-genome variant calling, generative molecular design, cryo-EM reconstruction, and multi-endpoint toxicity prediction.</p>
    <p class="coming-soon-text">If you're working on a problem that needs a model we haven't built yet, we want to hear about it.</p>
    <a class="coming-soon-cta" href="mailto:hello@bunkerbio.com">Get in touch</a>
  </div>

  <div class="deploy-overlay" id="deploy-overlay">
    <div class="deploy-modal">
      <div class="deploy-modal-header">
        <h2>Request access to BunkerFold-3</h2>
        <button type="button" class="deploy-close" id="deploy-close" aria-label="Close">&times;</button>
      </div>
      <p class="deploy-modal-desc">BunkerFold-3 is currently in research preview. Fill out the form below and our team will reach out with deployment details.</p>
      <form class="deploy-form" id="deploy-form">
        <label class="deploy-label">
          <span class="deploy-label-text">Name</span>
          <input type="text" name="name" class="deploy-input" required placeholder="Your name">
        </label>
        <label class="deploy-label">
          <span class="deploy-label-text">Email</span>
          <input type="email" name="email" class="deploy-input" required placeholder="you@company.com">
        </label>
        <label class="deploy-label">
          <span class="deploy-label-text">Organization</span>
          <input type="text" name="org" class="deploy-input" placeholder="Company or institution">
        </label>
        <label class="deploy-label">
          <span class="deploy-label-text">Use case</span>
          <textarea name="use_case" class="deploy-textarea" rows="3" placeholder="Briefly describe what you're building or researching"></textarea>
        </label>
        <button type="submit" class="btn btn-primary deploy-submit">Request Access</button>
      </form>
      <div class="deploy-success" id="deploy-success">
        <div class="deploy-success-icon">&#10003;</div>
        <h3>Request sent</h3>
        <p>We'll be in touch within 48 hours.</p>
      </div>
    </div>
  </div>`});var t=document.getElementById(`deploy-overlay`),n=document.getElementById(`deploy-form`),r=document.getElementById(`deploy-success`);document.getElementById(`deploy-btn`).addEventListener(`click`,()=>{t.classList.add(`open`)}),document.getElementById(`deploy-close`).addEventListener(`click`,()=>{t.classList.remove(`open`)}),t.addEventListener(`click`,e=>{e.target===t&&t.classList.remove(`open`)}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&t.classList.remove(`open`)}),n.addEventListener(`submit`,e=>{e.preventDefault(),n.style.display=`none`,r.style.display=`block`});