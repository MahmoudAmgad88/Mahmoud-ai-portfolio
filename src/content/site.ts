// Public assets and contact details confirmed from the supplied CV.
// GitHub is the account that owns this portfolio's repository.
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
  linkedin:
    "https://www.linkedin.com/in/mahmoud-salakawy-msc-7b412b92/?isSelfProfile=true" as
      string | null,
  github: "https://github.com/MahmoudAmgad88" as string | null,
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
export type ProjectCategory = "ml" | "genai" | "mlops";
export type Project = {
  number: string;
  title: string;
  type: string;
  categories: ProjectCategory[];
  availability: string;
  description: string;
  highlight?: { value: string; label: string };
  build: string;
  learning: string;
  tags: string[];
  detail: string;
  caseStudy?: string;
  repo?: string;
};
export const projectFilters: {
  label: string;
  value: ProjectCategory | "all";
}[] = [
  { label: "All projects", value: "all" },
  { label: "Machine learning", value: "ml" },
  { label: "GenAI & LLMs", value: "genai" },
  { label: "MLOps", value: "mlops" },
];
export const projects: Project[] = [
  {
    number: "01",
    title: "Civil Code RAG",
    type: "GENAI + MLOPS",
    categories: ["genai", "mlops"],
    availability: "PUBLIC REPO",
    description:
      "Bilingual Arabic/English legal Q&A, taken from notebook to a tested, containerised API.",
    highlight: { value: "160", label: "articles / Arabic + English" },
    build:
      "A FastAPI RAG service with routing, citation validation and a versioned index.",
    learning:
      "Treat a data or embedding change as a release: rebuild, validate, evaluate, version.",
    tags: ["FastAPI", "DVC", "Docker"],
    detail:
      "Routes questions to exact article lookup, explanation, semantic retrieval or an out-of-scope guardrail. Generated answers must cite retrieved articles or the API refuses them. DVC, MLflow, uv, Ruff, pytest and GitHub Actions cover the delivery path. Educational use only; not legal advice.",
    caseStudy: "/projects/civil-code-rag",
    repo: "https://github.com/MahmoudAmgad88/civil-code-rag-mlops",
  },
  {
    number: "02",
    title: "IT Ticket Classification",
    type: "ML ENGINEERING",
    categories: ["ml"],
    availability: "PRIVATE CODE",
    description:
      "From unstructured support text to consistent, actionable categories.",
    build: "A text-classification pipeline with a typed prediction API.",
    learning: "Shared preprocessing keeps training and inference consistent.",
    tags: ["scikit-learn", "FastAPI", "Pydantic"],
    detail:
      "A text classification pipeline using TF-IDF and calibrated LinearSVC, with shared preprocessing across training and inference. Typed API validation and a health endpoint make the serving interface explicit. Dataset provenance is not publicly documented here; dataset counts and performance claims are omitted.",
  },
  {
    number: "03",
    title: "5G QoS Classification",
    type: "APPLIED MACHINE LEARNING",
    categories: ["ml"],
    availability: "PRIVATE CODE",
    description:
      "Predicting application type through telecom feature engineering.",
    build: "A comparison of tree-based models with telecom-informed features.",
    learning: "SHAP makes model outputs interpretable in telecom terms.",
    tags: ["XGBoost", "LightGBM", "SHAP"],
    detail:
      "Compares tree-based classifiers, including XGBoost, LightGBM and CatBoost, with telecom-informed feature engineering. SHAP supports interpretation of model outputs. Dataset-specific metrics and samples are intentionally omitted pending public-source confirmation.",
  },
  {
    number: "04",
    title: "Voice Call QoE Prediction",
    type: "TELECOM ANALYTICS",
    categories: ["ml"],
    availability: "CAPSTONE",
    description:
      "Classifying mobile voice-call quality (MOS) from drive-test radio measurements.",
    highlight: { value: "70.2%", label: "hold-out accuracy / 3 MOS classes" },
    build:
      "Cleaning, log transforms and a four-model baseline, then a tuned decision tree.",
    learning:
      "Domain limits, like a 35 km cell range, clean data better than generic rules.",
    tags: ["pandas", "scikit-learn", "GridSearchCV"],
    detail:
      "Uses a public dataset of about 106,000 UMTS and LTE call tests with signal, speed, distance and setup time. Thirty-five MOS values are grouped into poor, average and good. SVM, KNN, random forest and naive Bayes set the baseline; grid search lifted a decision tree from 63.3% to 70.2% accuracy on a 30% hold-out split. Applied Data Science capstone.",
  },
  {
    number: "05",
    title: "Resume Screening Automation",
    type: "LLM WORKFLOWS",
    categories: ["genai"],
    availability: "PRIVATE CODE",
    description:
      "Structured information extraction and fit scoring in a reviewable workflow.",
    build: "An extraction and assessment workflow with structured outputs.",
    learning: "Human review remains the boundary for hiring decisions.",
    tags: ["n8n", "LLMs", "Structured outputs"],
    detail:
      "A workflow that receives resumes, extracts text, produces structured fit assessments and logs results for human review. This portfolio describes the workflow only; it does not receive resumes or call any external AI service. Automated scores should support, never replace, human hiring judgment.",
  },
  {
    number: "06",
    title: "CI Model-Quality Gate",
    type: "MLOPS LAB",
    categories: ["mlops"],
    availability: "PUBLIC REPO",
    description:
      "A pipeline that refuses to ship a model below its accuracy baseline.",
    build:
      "GitHub Actions runs tests, validates the model and builds a Docker image.",
    learning:
      "A failing quality check should stop delivery automatically, not in review.",
    tags: ["GitHub Actions", "pytest", "Docker"],
    detail:
      "A compact lab: a validation script compares model accuracy with a 0.85 baseline and exits non-zero below it, failing the CI run. It is a deliberately small exercise in CI and GitOps practice, not a production system.",
    repo: "https://github.com/MahmoudAmgad88/ci_gitops_mini_lab",
  },
];
export const skills = [
  {
    skill: "Time-series anomaly detection",
    evidence: ["RAN Anomaly RCA", "Published research"],
  },
  {
    skill: "RAG and grounded LLM answers",
    evidence: ["Civil Code RAG", "RAN Anomaly RCA"],
  },
  {
    skill: "MLOps: versioning, CI, containers",
    evidence: ["Civil Code RAG", "CI Model-Quality Gate"],
  },
  {
    skill: "Model serving and typed APIs",
    evidence: ["Civil Code RAG", "IT Ticket Classification"],
  },
  {
    skill: "Feature engineering and explainability",
    evidence: ["5G QoS Classification", "RAN Anomaly RCA"],
  },
  {
    skill: "Telecom radio and QoE analytics",
    evidence: ["Voice Call QoE Prediction", "5G QoS Classification"],
  },
  {
    skill: "LLM workflow automation",
    evidence: ["Resume Screening Automation"],
  },
  {
    skill: "Telecom RAN domain, 2G to 5G",
    evidence: ["Experience"],
  },
];
export const credentials = [
  "MSc Data Science / Cairo University",
  "BSc Electrical Engineering / Cairo University, 2011",
  "SAFe 6.0 Practitioner",
  "AWS Certified Machine Learning Engineer, Associate / in progress",
];
export const civilCode = {
  title: "Civil Code RAG",
  route: "/projects/civil-code-rag",
  repo: "https://github.com/MahmoudAmgad88/civil-code-rag-mlops",
  facts: [
    ["Domain", "Legal text, Arabic + English"],
    ["Core approach", "Routed RAG + citation checks"],
    ["Trust principle", "No valid citation, no answer"],
    ["Delivery", "Docker, DVC, CI"],
    ["Status", "Public educational project"],
  ],
  sections: [
    ["overview", "Overview"],
    ["architecture", "Architecture"],
    ["guardrails", "Guardrails"],
    ["mlops", "MLOps"],
    ["evidence", "Evidence"],
    ["limitations", "Limitations"],
  ],
  tags: ["RAG", "FastAPI", "MLOps", "Python"],
  routes: [
    [
      "Exact lookup",
      "Returns the article text from the frozen corpus. No model or key needed.",
    ],
    [
      "Explain",
      "Grounds an explanation in the named article, then validates its citations.",
    ],
    [
      "Semantic",
      "Language-isolated retrieval over a 384-dimension multilingual index.",
    ],
    ["Out of scope", "Rejects the request before retrieval or generation."],
  ],
  scope: [
    ["160", "Civil Code articles"],
    ["268", "Retrieval records"],
    ["2", "Languages"],
    ["384", "Embedding dimensions"],
  ],
  guardrails: [
    "Generated answers must cite retrieved articles; invalid citations return HTTP 502 instead of text.",
    "Repealed articles return a source note, never invented text.",
    "Serving rejects an embedding model other than the one the index was built with.",
    "API keys are compared in constant time; with no keys configured the API fails closed.",
    "Each request gets an ID and a JSON audit line; questions are logged as hashes, not text.",
  ],
  journey: [
    "Reproducible environment with uv and a lock file",
    "Unit, API, integration and integrity tests with pytest; Ruff linting",
    "Index versioning with DVC and a SHA-256 provenance manifest",
    "Experiment tracking and Model Registry practice with MLflow",
    "FastAPI serving with Pydantic contracts and Prometheus-format metrics",
    "Docker Compose packaging with health checks",
    "GitHub Actions continuous integration",
  ],
  stack: [
    "Python 3.12",
    "FastAPI",
    "Pydantic",
    "Sentence Transformers",
    "multilingual-e5-small",
    "NumPy",
    "OpenAI Responses API",
    "uv",
    "pytest",
    "Ruff",
    "DVC",
    "MLflow",
    "Docker",
    "GitHub Actions",
  ],
  limitations: [
    "Educational use only, not legal advice. The corpus covers pages 1–18 of a 170-page source.",
    "Transcription, completeness and current legal status of the articles are unverified.",
    "Retrieval quality was not the goal of this stage; the delivery path was.",
    "Generated answers need an OpenAI key; exact lookup and health checks work offline.",
    "Metrics are per process, keys live in environment configuration, and the audit log is not tamper-evident.",
  ],
};
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
  "/projects/civil-code-rag": {
    title: `${civilCode.title} | ${profile.name}`,
    description:
      "A bilingual Arabic/English RAG service with citation validation, taken from notebook to a tested, versioned and containerised API.",
  },
  "/research": {
    title: `Research | ${profile.name}`,
    description:
      "Published research on policy-calibrated forecast intervals for radio access network anomaly detection.",
  },
};
