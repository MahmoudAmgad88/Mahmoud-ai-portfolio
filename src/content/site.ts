// Public assets and contact details confirmed from the supplied CV.
// Keep GitHub unset until a confirmed public profile is supplied.
export const profile = {
  name: "Mahmoud Salakawy",
  role: "AI & ML Engineer",
  initials: "MS",
  headline: "Trustworthy AI for telecom networks.",
  intro:
    "I build ML and GenAI systems that detect network anomalies, ground evidence, and support engineering decisions.",
  capabilities: ["Time-Series ML", "GenAI / RAG", "Telecom AI"],
  availability: "Open to AI / ML / GenAI engineering roles",
  email: "eng.salakawy@gmail.com" as string | null,
  linkedin: "https://www.linkedin.com/in/mahmoud-salakawy-msc-7b412b92/?isSelfProfile=true" as
    string | null,
  github: null as string | null,
  cv: `${import.meta.env.BASE_URL}mahmoud-salakawy-cv.pdf` as string | null,
  photo: `${import.meta.env.BASE_URL}mahmoud-salakawy.jpg` as string | null,
  photoPosition: "center 30%",
};
export const flagship = {
  title: "RAN Anomaly RCA",
  route: "/projects/ran-anomaly-rca",
  facts: [
    ["Domain", "Telecom RAN"],
    ["Core approach", "Time-series ML + grounded GenAI"],
    ["Trust principle", "Evidence before explanation"],
    ["Decision model", "Engineer remains in control"],
    ["Research", "Peer-reviewed anomaly-detection methodology"],
  ],
  sections: [
    ["overview", "Overview"],
    ["architecture", "Architecture"],
    ["detection", "Detection"],
    ["grounded-rca", "Grounded RCA"],
    ["evidence", "Evidence"],
    ["limitations", "Limitations"],
  ],
  tags: ["Time-series ML", "RAG", "Explainability", "Python"],
  workflow: [
    "Network KPIs",
    "Detect",
    "Rank",
    "Ground",
    "Explain",
    "Engineer decides",
  ],
};
export const navigation = [
  { label: "Work", to: "/#selected-work", mobileOrder: 1, featured: false },
  { label: flagship.title, to: flagship.route, mobileOrder: 0, featured: true },
  { label: "Research", to: "/research", mobileOrder: 2, featured: false },
  { label: "Docs", to: "/docs", mobileOrder: 3, featured: false },
];
export const paper = {
  title:
    "Policy-Calibrated Forecast Intervals for Anomaly Detection in Radio Access Mobile Network",
  authors: "M. A. ElSalakawy, A. H. N. Ahmed, M. R. Abonazel",
  journal: "Journal of Intelligent Computing and Data Science",
  citation: "JICDS · Vol. 2 (1), pp. 48–73 · 2026",
  doi: "https://doi.org/10.21608/jicds.2026.457039.1026",
  source:
    "https://www.researchgate.net/publication/403965677_Policy-Calibrated_Forecast_Intervals_for_Anomaly_Detection_in_Radio_Access_Mobile_Network",
  result: "91.27%",
  metricLabel: "Balanced accuracy",
  contribution:
    "Policy-calibrated forecast intervals connect anomaly alerts to engineering relevance.",
  resultNote:
    "Balanced accuracy on the paper’s expert-labelled evaluation set (Table 11). A research result, not a guarantee for other datasets or the RCA prototype.",
};
export const projects = [
  {
    number: "01",
    title: "IT Ticket Classification",
    type: "ML ENGINEERING",
    description:
      "From unstructured support text to consistent, actionable categories.",
    build: "A text-classification pipeline with a typed prediction API.",
    learning: "Shared preprocessing keeps training and inference consistent.",
    tags: ["scikit-learn", "FastAPI", "Pydantic"],
    detail:
      "A text classification pipeline using TF-IDF and calibrated LinearSVC, with shared preprocessing across training and inference. Typed API validation and a health endpoint make the serving interface explicit. Dataset provenance is not publicly documented here; dataset counts and performance claims are omitted.",
  },
  {
    number: "02",
    title: "5G QoS Classification",
    type: "APPLIED MACHINE LEARNING",
    description:
      "Predicting application type through telecom feature engineering.",
    build: "A comparison of tree-based models with telecom-informed features.",
    learning: "SHAP makes model outputs interpretable in telecom terms.",
    tags: ["XGBoost", "LightGBM", "SHAP"],
    detail:
      "Compares tree-based classifiers, including XGBoost, LightGBM and CatBoost, with telecom-informed feature engineering. SHAP supports interpretation of model outputs. Dataset-specific metrics and samples are intentionally omitted pending public-source confirmation.",
  },
  {
    number: "03",
    title: "Resume Screening Automation",
    type: "LLM WORKFLOWS",
    description:
      "Structured information extraction and fit scoring in a reviewable workflow.",
    build: "An extraction and assessment workflow with structured outputs.",
    learning: "Human review remains the boundary for hiring decisions.",
    tags: ["n8n", "LLMs", "Structured outputs"],
    detail:
      "A workflow that receives resumes, extracts text, produces structured fit assessments and logs results for human review. This portfolio describes the workflow only; it does not receive resumes or call any external AI service. Automated scores should support, never replace, human hiring judgment.",
  },
];
export const detection = [
  "Per-cell baselines with Prophet and SARIMAX; complementary Isolation Forest detection.",
  "Severity ranking and persistence checks distinguish sustained degradation from isolated events.",
  "SHAP explanations and three report views: executive summary, site overview and cell detail.",
  "Excel / CSV inputs; offline analysis without live network access.",
];
export const grounding = [
  "Five-step retrieval flow: understand query, look up anomaly, form search, retrieve and re-rank, respond.",
  "FAISS retrieval with KPI- and technology-aware re-ranking.",
  "Grounding gate: no anomaly evidence means no RCA verdict. Facts and hypotheses stay separate.",
  "Deterministic mock mode and optional provider-agnostic LLM mode; safety-contract tests for the prototype.",
];
export const planned = [
  "Multivariate detection: VAR, LSTM autoencoders and TranAD",
  "Enterprise LLM integration",
  "Managed vector storage at scale",
  "Drift monitoring and retraining triggers",
  "Containerised delivery and CI/CD",
];
export const limitations = [
  "Detection described here is univariate per KPI; multivariate models are future work.",
  "Export quality and available history affect forecast and anomaly quality.",
  "Retrieved context can be incomplete or outdated; a plausible hypothesis is not a verified cause.",
  "LLM mode is optional in the prototype. This website has no live inference or upload.",
  "Application code and operational data are not public. Diagrams are conceptual and all chart data is synthetic.",
];
export const stack = [
  "Python",
  "Pandas",
  "Prophet",
  "SARIMAX",
  "Isolation Forest",
  "SHAP",
  "scikit-learn",
  "Flask",
  "SQLite",
  "Streamlit",
  "FAISS",
  "MiniLM",
  "OpenAI-compatible SDK",
  "PyMuPDF",
  "pytest",
];
export const experience = [
  {
    period: "2024 — PRESENT",
    title: "AI & automation",
    text: "Part-time volunteer contribution alongside a core RAN role: ML pipelines, grounded retrieval, text classification and mentoring.",
  },
  {
    period: "2018 — PRESENT",
    title: "Radio expert · RAN integration",
    text: "Telecom domain experience informing anomaly analysis, explainability and repeatable data workflows.",
  },
  {
    period: "2017 — 2018",
    title: "RAN integration engineering",
    text: "A foundation in radio network integration, troubleshooting and engineering review.",
  },
];
export const meta: Record<string, { title: string; description: string }> = {
  "/": {
    title: `${profile.name} | ${profile.role}`,
    description:
      "Telecom domain expertise, time-series machine learning and grounded GenAI. Explore the work and research of Mahmoud Salakawy.",
  },
  "/projects/ran-anomaly-rca": {
    title: `${flagship.title} | ${profile.name}`,
    description:
      "An integrated portfolio case study connecting time-series anomaly detection research with a grounded RCA prototype.",
  },
  "/docs": {
    title: `Documentation | ${profile.name}`,
    description:
      "Architecture, conceptual user guide, technical notes and limitations for the RAN Anomaly RCA case study.",
  },
  "/research": {
    title: `Research | ${profile.name}`,
    description:
      "Published research on policy-calibrated forecast intervals for radio access network anomaly detection.",
  },
};
