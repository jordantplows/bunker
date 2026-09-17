import { mount } from "./layout";

mount({
  title: "API Docs — Bunker AI Models",
  description:
    "API reference and integration guides for Bunker AI models. Authentication, endpoints, request format, and code examples.",
  activePath: "/ai-models",
  maxWidth: 740,
  content: `
  <header class="hero">
    <h1 class="reveal">API Documentation</h1>
    <p class="subtitle reveal">Everything you need to integrate Bunker models into your pipeline. Authenticate, call endpoints, and parse responses.</p>
    <div class="docs-nav-links reveal">
      <a href="/ai-models">Back to Models</a>
    </div>
  </header>

  <section class="docs-section reveal" id="authentication">
    <h2>Authentication</h2>
    <p>All API requests require a Bearer token. Generate one from your Bunker dashboard.</p>
    <div class="docs-code">
      <div class="docs-code-header">Request header</div>
      <pre class="docs-pre">Authorization: Bearer bnk_live_your_api_key
Content-Type: application/json</pre>
    </div>
    <p>Tokens are scoped per-model. A token issued for BunkerFold-3 cannot call GenoScan-LLM. Rate limits default to 100 requests/minute per token.</p>
  </section>

  <section class="docs-section reveal" id="base-url">
    <h2>Base URL</h2>
    <div class="docs-code">
      <div class="docs-code-header">All environments</div>
      <pre class="docs-pre">https://api.bunkerbio.com/v1</pre>
    </div>
    <p>All endpoints use HTTPS. HTTP requests are rejected, not redirected.</p>
  </section>

  <section class="docs-section reveal" id="bunkerfold-3">
    <h2>BunkerFold-3</h2>
    <p>Protein structure prediction from amino acid sequence.</p>
    <div class="docs-code">
      <div class="docs-code-header">POST /v1/models/bunkerfold-3/predict</div>
      <pre class="docs-pre">{
  "sequence": "MVLSPADKTNVKAAWGKVGAHAGEYGAEALERMFLSFPTTKTYFPHFDLSH",
  "options": {
    "relaxation": true,
    "output_format": "pdb"
  }
}</pre>
    </div>
    <div class="docs-code">
      <div class="docs-code-header">Response — 200</div>
      <pre class="docs-pre docs-output">{
  "model": "bunkerfold-3",
  "version": "3.1",
  "confidence": 0.97,
  "rmsd": 0.42,
  "residues_resolved": 51,
  "fold_class": "globin",
  "pdb_url": "https://api.bunkerbio.com/v1/results/bf3_a8x...",
  "processing_time_ms": 1820
}</pre>
    </div>
    <h3>Parameters</h3>
    <div class="docs-table">
      <div class="docs-row docs-row-header">
        <span>Field</span><span>Type</span><span>Required</span><span>Description</span>
      </div>
      <div class="docs-row">
        <span>sequence</span><span>string</span><span>yes</span><span>Amino acid sequence (1-letter codes, max 2048 residues)</span>
      </div>
      <div class="docs-row">
        <span>options.relaxation</span><span>boolean</span><span>no</span><span>Run energy minimization on output structure. Default: true</span>
      </div>
      <div class="docs-row">
        <span>options.output_format</span><span>string</span><span>no</span><span>pdb | mmcif. Default: pdb</span>
      </div>
    </div>
  </section>

  <section class="docs-section reveal" id="genoscan-llm">
    <h2>GenoScan-LLM</h2>
    <p>Whole-genome variant calling and pathogenicity classification.</p>
    <div class="docs-code">
      <div class="docs-code-header">POST /v1/models/genoscan/call</div>
      <pre class="docs-pre">{
  "region": "chr17:41244000-41277500",
  "gene": "BRCA1",
  "format": "CRAM",
  "reference": "GRCh38"
}</pre>
    </div>
    <div class="docs-code">
      <div class="docs-code-header">Response — 200</div>
      <pre class="docs-pre docs-output">{
  "model": "genoscan-llm",
  "variants": [
    {
      "rsid": "rs80357906",
      "classification": "pathogenic",
      "hgvs": "c.5266dupC",
      "class": 5,
      "confidence": 0.994
    }
  ],
  "total_variants": 3
}</pre>
    </div>
  </section>

  <section class="docs-section reveal" id="molgen-7">
    <h2>MolGen-7</h2>
    <p>Generative molecular design with ADMET-aware optimization.</p>
    <div class="docs-code">
      <div class="docs-code-header">POST /v1/models/molgen-7/generate</div>
      <pre class="docs-pre">{
  "target": "EGFR T790M",
  "objective": "binding_affinity",
  "constraints": {
    "logP": { "max": 5 },
    "mol_weight": { "max": 500 },
    "synthetic_steps": { "max": 6 }
  },
  "num_candidates": 4
}</pre>
    </div>
    <div class="docs-code">
      <div class="docs-code-header">Response — 200</div>
      <pre class="docs-pre docs-output">{
  "model": "molgen-7",
  "candidates": [
    {
      "id": "BNK-4821",
      "smiles": "CC1=CC(=C(C=C1)NC(=O)...",
      "affinity_nM": 2.1,
      "sa_score": 3.2,
      "logP": 3.8,
      "tox_clear": true
    }
  ]
}</pre>
    </div>
  </section>

  <section class="docs-section reveal" id="cryonet">
    <h2>CryoNet</h2>
    <p>Cryo-EM 3D reconstruction from single-particle micrographs.</p>
    <div class="docs-code">
      <div class="docs-code-header">POST /v1/models/cryonet/reconstruct</div>
      <pre class="docs-pre">{
  "particles_url": "s3://your-bucket/particles.star",
  "pixel_size": 1.06,
  "voltage_kV": 300,
  "defocus_range": [1.2, 3.0]
}</pre>
    </div>
    <div class="docs-code">
      <div class="docs-code-header">Response — 200</div>
      <pre class="docs-pre docs-output">{
  "model": "cryonet",
  "resolution_angstrom": 2.8,
  "fsc_threshold": 0.143,
  "symmetry": "C1",
  "map_url": "https://api.bunkerbio.com/v1/results/cn_b2f...",
  "particles_used": 11820,
  "processing_time_s": 840
}</pre>
    </div>
  </section>

  <section class="docs-section reveal" id="toxpredict-v2">
    <h2>ToxPredict-v2</h2>
    <p>Multi-endpoint toxicity screening for compound libraries.</p>
    <div class="docs-code">
      <div class="docs-code-header">POST /v1/models/toxpredict/screen</div>
      <pre class="docs-pre">{
  "smiles": "CC(=O)NC1=CC=C(O)C=C1",
  "endpoints": ["hERG", "DILI", "AMES", "LD50"]
}</pre>
    </div>
    <div class="docs-code">
      <div class="docs-code-header">Response — 200</div>
      <pre class="docs-pre docs-output">{
  "model": "toxpredict-v2",
  "compound": "Acetaminophen",
  "endpoints": {
    "hERG_block": { "risk": "low", "score": 0.03 },
    "DILI_risk": { "risk": "moderate", "score": 0.61 },
    "AMES_mutagen": { "result": "negative" },
    "LD50_oral_mg_kg": 2400
  },
  "overall": "CAUTION",
  "flags": ["hepatotoxicity"]
}</pre>
    </div>
  </section>

  <section class="docs-section reveal" id="epimark">
    <h2>EpiMark</h2>
    <p>Epigenomic annotation from sequence context.</p>
    <div class="docs-code">
      <div class="docs-code-header">POST /v1/models/epimark/annotate</div>
      <pre class="docs-pre">{
  "region": "chr11:5225000-5250000",
  "cell_type": "K562",
  "marks": ["H3K27ac", "H3K4me3", "ATAC", "CpG_methyl"]
}</pre>
    </div>
    <div class="docs-code">
      <div class="docs-code-header">Response — 200</div>
      <pre class="docs-pre docs-output">{
  "model": "epimark",
  "annotations": {
    "H3K27ac": { "state": "active_enhancer", "peaks": 3 },
    "H3K4me3": { "state": "active_promoter" },
    "ATAC": { "state": "open_chromatin" },
    "CpG_methyl": { "level": 0.12, "state": "hypomethylated" }
  },
  "chromatin_state": "active_regulatory"
}</pre>
    </div>
  </section>

  <section class="docs-section reveal" id="errors">
    <h2>Error Handling</h2>
    <p>All errors return a consistent JSON body with an error code and human-readable message.</p>
    <div class="docs-code">
      <div class="docs-code-header">Error response</div>
      <pre class="docs-pre docs-output">{
  "error": {
    "code": "invalid_sequence",
    "message": "Sequence contains invalid characters at position 23.",
    "status": 400
  }
}</pre>
    </div>
    <div class="docs-table">
      <div class="docs-row docs-row-header">
        <span>Status</span><span>Code</span><span>Meaning</span><span></span>
      </div>
      <div class="docs-row">
        <span>400</span><span>invalid_input</span><span>Malformed request body or invalid parameters</span><span></span>
      </div>
      <div class="docs-row">
        <span>401</span><span>unauthorized</span><span>Missing or invalid API token</span><span></span>
      </div>
      <div class="docs-row">
        <span>403</span><span>scope_mismatch</span><span>Token not authorized for this model</span><span></span>
      </div>
      <div class="docs-row">
        <span>429</span><span>rate_limited</span><span>Too many requests — retry after the Retry-After header</span><span></span>
      </div>
      <div class="docs-row">
        <span>500</span><span>internal_error</span><span>Server error — contact support</span><span></span>
      </div>
    </div>
  </section>

  <section class="docs-section reveal" id="sdks">
    <h2>SDKs &amp; Libraries</h2>
    <div class="docs-code">
      <div class="docs-code-header">Python</div>
      <pre class="docs-pre">pip install bunker-ai</pre>
    </div>
    <div class="docs-code">
      <div class="docs-code-header">Usage</div>
      <pre class="docs-pre">from bunker import BunkerClient

client = BunkerClient(api_key="bnk_live_...")
result = client.bunkerfold3.predict(
    sequence="MVLSPADKTNVKAAWGKVGA..."
)
print(result.confidence)  # 0.97</pre>
    </div>
    <p>TypeScript, Go, and R SDKs are in development. <a href="mailto:hello@bunkerbio.com">Contact us</a> for early access.</p>
  </section>`,
});
