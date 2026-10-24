export const docs = [
  {
    id: "overview",
    title: "Overview",
    paragraphs: [
      "Use these notes to review input requirements, data flow, retrieval behaviour and validation boundaries. The workflow consumes exported KPI time series and reference documents; this website does not accept data or expose model endpoints.",
      "The architecture diagram distinguishes detection from the separate RCA prototype. The user guide follows an analysis session; the technical guide explains calibration, retrieval and safety-contract testing. Proprietary application source and operational data are excluded.",
    ],
  },
  {
    id: "architecture",
    title: "Architecture",
    paragraphs: [
      "The detection path begins with an Excel or CSV export. Cleaning and feature preparation establish a consistent time series before a per-cell forecasting model estimates expected behaviour. Calibrated forecast intervals define the detection boundary. Scoring adds severity and persistence context, and report views make findings available for review.",
      "The RCA path consumes anomaly evidence alongside a reference knowledge base. Query understanding and anomaly lookup precede search generation. FAISS retrieval and contextual re-ranking select relevant material. A grounding gate checks for anomaly evidence before allowing a verdict. The output separates observed facts from candidate explanations.",
    ],
  },
  {
    id: "user-guide",
    title: "User guide",
    paragraphs: [
      "This is a generic walkthrough of the described analysis workflow, not an interactive feature of this website. First, prepare a KPI export with timestamps and enough historical context to establish a baseline. Check missing values, sampling consistency and whether the historical period represents the behaviour being evaluated. Use only data you are authorised to process.",
      "Next, load the export into the analysis application and run detection. Begin with the executive summary to understand the overall pattern, then use the site overview to prioritise investigation and the cell detail view to compare behaviour over time. Review persistence and supporting evidence before accepting any finding. Where the RCA prototype is used, read facts and hypotheses separately and check the retrieved context. Record engineering feedback, then export the reviewed report. Any actual network intervention follows a separate human-controlled process.",
    ],
  },
  {
    id: "technical-guide",
    title: "Technical guide",
    paragraphs: [
      "The published method adds a policy-calibration layer to forecast intervals so that anomaly decisions better reflect engineering relevance. Prophet and SARIMAX provide time-series baselines; Isolation Forest is a complementary technique in the broader detection work. Severity captures the significance of a deviation, while persistence distinguishes an isolated event from a sustained pattern. Implementation-specific thresholds and proprietary source code are not reproduced here.",
      "The RCA prototype follows five stages: query understanding, anomaly lookup, search-query generation, FAISS retrieval with contextual re-ranking, and grounded response construction. No anomaly evidence means no RCA verdict. Deterministic mock mode supports reproducible checks; optional LLM mode generates a response within the same evidence boundary. Safety-contract testing covers missing evidence and the separation of facts from hypotheses. The portfolio does not expose a model endpoint. Containerisation, CI/CD, drift monitoring and automated retraining remain future work.",
    ],
  },
];
export const faqs = [
  [
    "Does it change the network?",
    "No. Findings support engineering review. There is no automated network action, and this static website has no network connection.",
  ],
  [
    "Does analysis need live network access?",
    "No. The detection workflow uses standard Excel or CSV KPI exports. This website does not accept uploads.",
  ],
  [
    "Why go beyond fixed thresholds?",
    "Traffic patterns and seasonal behaviour move the baseline. Forecasting provides temporal context; policy calibration connects a deviation to engineering relevance.",
  ],
  [
    "What happens without anomaly evidence?",
    "The RCA grounding gate withholds a verdict. Retrieved reference text alone is insufficient evidence of a specific fault.",
  ],
  [
    "Is the application code public?",
    "No. Employer-owned application code and operational datasets are not distributed. The paper is the public reference for the research method.",
  ],
  [
    "Which technologies does the case study cover?",
    "The broader engineering context spans 2G–5G RAN. The published evaluation covers 2G, 3G and 4G; it should not be read as a validation of every vendor or technology.",
  ],
];

export const technicalLimits = [
  "Per-KPI modelling does not capture cross-KPI dependencies; multivariate methods remain future work.",
  "Sampling consistency, missing observations and historical coverage must be checked before interpreting model outputs.",
  "Evidence presence and source relevance are separate checks. Retrieved reference text cannot establish a cause on its own.",
  "Deterministic mock mode supports repeatable contract checks; it does not measure live LLM answer quality.",
];
