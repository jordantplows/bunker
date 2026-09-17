import { mount } from "./layout";

mount({
  title: "Bunker - AI Models",
  description:
    "Browse and deploy AI models built by Bunker for drug discovery, protein folding, genomics, and beyond.",
  activePath: "/ai-models",
  maxWidth: 740,
  content: `
  <header class="hero">
    <h1 class="reveal">AI Models</h1>
    <p class="subtitle reveal">Models built by Bunker for the life sciences. Each model ships with an API, documentation, and examples you can run today.</p>
  </header>

  <div class="filters reveal">
    <button class="active" data-filter="all">All</button>
    <button data-filter="protein">Protein</button>
    <button data-filter="genomics">Genomics</button>
    <button data-filter="drug-discovery">Drug Discovery</button>
    <button data-filter="imaging">Imaging</button>
  </div>

  <div class="model-list" id="model-list">

    <!-- BunkerFold-3 -->
    <div class="model-card reveal" data-category="protein">
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
        <button class="btn btn-primary">Deploy Model</button>
        <button class="btn btn-secondary">View Docs</button>
      </div>
    </div>

    <!-- GenoScan-LLM -->
    <div class="model-card reveal" data-category="genomics">
      <div class="model-header">
        <div class="model-info">
          <h2>GenoScan-LLM</h2>
          <div class="model-meta">
            <span class="model-tag category">Genomics</span>
            <span class="model-stat">800M params</span>
            <span class="model-stat">v2.0</span>
          </div>
        </div>
      </div>
      <p class="model-desc">Foundation model for whole-genome variant calling. Trained on 200K+ genomes to flag pathogenic variants with clinical-grade sensitivity.</p>
      <div class="model-example">
        <div class="example-header">
          <span>Example</span>
          <span>biohub.ai/genoscan</span>
        </div>
        <div class="example-body">
          <div class="example-col">
            <div class="example-label">Input — VCF region</div>
            <div class="example-code">chr17:41244000-41277500
gene: BRCA1
reads: 42x coverage
format: CRAM</div>
          </div>
          <div class="example-col">
            <div class="example-label">Output — variants</div>
            <div class="example-output">3 variants detected
rs80357906 — pathogenic
  c.5266dupC (class 5)
  confidence: 0.994
rs1799966 — benign
rs16942 — benign</div>
          </div>
        </div>
      </div>
      <div class="model-actions">
        <button class="btn btn-primary">Deploy Model</button>
        <button class="btn btn-secondary">View Docs</button>
      </div>
    </div>

    <!-- MolGen-7 -->
    <div class="model-card reveal" data-category="drug-discovery">
      <div class="model-header">
        <div class="model-info">
          <h2>MolGen-7</h2>
          <div class="model-meta">
            <span class="model-tag category">Drug Discovery</span>
            <span class="model-stat">3.4B params</span>
            <span class="model-stat">v7.0</span>
          </div>
        </div>
      </div>
      <p class="model-desc">Generative molecular design. Produces novel small molecules optimized for binding affinity, ADMET properties, and synthetic accessibility.</p>
      <div class="model-example">
        <div class="example-header">
          <span>Example</span>
          <span>biohub.ai/molgen-7</span>
        </div>
        <div class="example-body">
          <div class="example-col">
            <div class="example-label">Input — target</div>
            <div class="example-code">target: EGFR T790M
objective: binding_affinity
constraints:
  logP: &lt;5
  mol_weight: &lt;500
  synthetic_steps: &lt;6</div>
          </div>
          <div class="example-col">
            <div class="example-label">Output — candidates</div>
            <div class="example-output">4 candidates generated
#1 BNK-4821
  SMILES: CC1=CC(=C...)
  affinity: 2.1nM
  SA_score: 3.2
  logP: 3.8
  tox_clear: true</div>
          </div>
        </div>
      </div>
      <div class="model-actions">
        <button class="btn btn-primary">Deploy Model</button>
        <button class="btn btn-secondary">View Docs</button>
      </div>
    </div>

    <!-- CryoNet -->
    <div class="model-card reveal" data-category="imaging">
      <div class="model-header">
        <div class="model-info">
          <h2>CryoNet</h2>
          <div class="model-meta">
            <span class="model-tag category">Imaging</span>
            <span class="model-stat">540M params</span>
            <span class="model-stat">v1.4</span>
          </div>
        </div>
      </div>
      <p class="model-desc">Cryo-EM reconstruction model. Resolves 3D density maps from single-particle micrographs at near-atomic resolution with 10x fewer particles.</p>
      <div class="model-example">
        <div class="example-header">
          <span>Example</span>
          <span>biohub.ai/cryonet</span>
        </div>
        <div class="example-body">
          <div class="example-col">
            <div class="example-label">Input — micrograph set</div>
            <div class="example-code">particles: 12,400
pixel_size: 1.06Å
voltage: 300kV
defocus_range: 1.2–3.0µm</div>
          </div>
          <div class="example-col">
            <div class="example-label">Output — reconstruction</div>
            <div class="example-output">resolution: 2.8Å (FSC 0.143)
symmetry: C1 (detected)
map_size: 256³
processing: 14min
particles_used: 11,820</div>
          </div>
        </div>
      </div>
      <div class="model-actions">
        <button class="btn btn-primary">Deploy Model</button>
        <button class="btn btn-secondary">View Docs</button>
      </div>
    </div>

    <!-- ToxPredict-v2 -->
    <div class="model-card reveal" data-category="drug-discovery">
      <div class="model-header">
        <div class="model-info">
          <h2>ToxPredict-v2</h2>
          <div class="model-meta">
            <span class="model-tag category">Drug Discovery</span>
            <span class="model-stat">280M params</span>
            <span class="model-stat">v2.3</span>
          </div>
        </div>
      </div>
      <p class="model-desc">Multi-endpoint toxicity prediction. Screens compound libraries for hepatotoxicity, cardiotoxicity, and mutagenicity before synthesis.</p>
      <div class="model-example">
        <div class="example-header">
          <span>Example</span>
          <span>biohub.ai/toxpredict</span>
        </div>
        <div class="example-body">
          <div class="example-col">
            <div class="example-label">Input — compound</div>
            <div class="example-code">SMILES: CC(=O)NC1=CC=C
  (O)C=C1
name: Acetaminophen
endpoints: [hERG, DILI,
  AMES, LD50]</div>
          </div>
          <div class="example-col">
            <div class="example-label">Output — tox profile</div>
            <div class="example-output">hERG_block: low (0.03)
DILI_risk: moderate (0.61)
AMES_mutagen: negative
LD50_oral: 2400 mg/kg
overall: CAUTION
flags: hepatotoxicity</div>
          </div>
        </div>
      </div>
      <div class="model-actions">
        <button class="btn btn-primary">Deploy Model</button>
        <button class="btn btn-secondary">View Docs</button>
      </div>
    </div>

    <!-- EpiMark -->
    <div class="model-card reveal" data-category="genomics">
      <div class="model-header">
        <div class="model-info">
          <h2>EpiMark</h2>
          <div class="model-meta">
            <span class="model-tag category">Genomics</span>
            <span class="model-stat">420M params</span>
            <span class="model-stat">v1.1</span>
          </div>
        </div>
      </div>
      <p class="model-desc">Epigenomic annotation engine. Predicts histone modifications, methylation state, and chromatin accessibility from sequence context alone.</p>
      <div class="model-example">
        <div class="example-header">
          <span>Example</span>
          <span>biohub.ai/epimark</span>
        </div>
        <div class="example-body">
          <div class="example-col">
            <div class="example-label">Input — locus</div>
            <div class="example-code">region: chr11:5225000-5250000
cell_type: K562
marks: [H3K27ac, H3K4me3,
  ATAC, CpG_methyl]</div>
          </div>
          <div class="example-col">
            <div class="example-label">Output — annotations</div>
            <div class="example-output">H3K27ac: active_enhancer
  peaks: 3 (p &lt; 1e-8)
H3K4me3: active_promoter
ATAC: open_chromatin
CpG: hypomethylated (0.12)
state: active_regulatory</div>
          </div>
        </div>
      </div>
      <div class="model-actions">
        <button class="btn btn-primary">Deploy Model</button>
        <button class="btn btn-secondary">View Docs</button>
      </div>
    </div>

  </div>`,
});

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
