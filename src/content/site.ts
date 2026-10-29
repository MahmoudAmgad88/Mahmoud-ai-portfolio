// Public assets and contact details confirmed from the supplied CV.
// GitHub is the account that owns this portfolio's repository.
export const profile = {
  name: "Mahmoud Salakawy",
  role: "AI & ML Engineer",
  initials: "MS",
  headline: "I ship ML and GenAI that works on real data.",
  intro:
    "From raw data to tested, documented services: forecasting, anomaly detection and RAG applications that teams can verify and maintain. Proven in production across two countries and in peer-reviewed research.",
  capabilities: ["Time-Series ML", "GenAI / RAG", "Telecom AI"],
  hireFor: [
    "Forecasting & anomaly detection",
    "RAG / LLM apps with guardrails",
    "ML APIs & MLOps",
  ],
  availability: "Open to AI Engineer, ML Engineer and GenAI Engineer roles",
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
export type ProjectCategory = "production" | "ml" | "genai" | "mlops";
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
  { label: "In production", value: "production" },
  { label: "Machine learning", value: "ml" },
  { label: "GenAI & LLMs", value: "genai" },
  { label: "MLOps", value: "mlops" },
];
export const projects: Project[] = [
  {
    number: "01",
    title: "RAN KPI Anomaly Detection",
    type: "PRODUCTION ML",
    categories: ["production", "ml"],
    availability: "IN PRODUCTION",
    description:
      "A desktop tool that learns each cell’s normal KPI behaviour and flags what needs investigation.",
    highlight: { value: "2 countries", label: "in production / plus 1 POC" },
    build:
      "Per-cell, per-KPI Prophet forecasting with KPI-specific rules and consecutive-anomaly logic.",
    learning:
      "Separating detection logic from market configuration made new rollouts a config change, not a code change.",
    tags: ["Prophet", "Flask", "SQLite"],
    detail:
      "As lead developer and solution architect, I designed the detection method, the application architecture and its adaptation across markets. It runs as a standalone desktop app with local processing, so network data never leaves the engineer’s machine, and produces interactive Plotly and Excel reports. It serves three market and vendor setups (Ericsson and Huawei) across two countries, with 73 KPI detection rules from 2G to 5G in one market’s configuration. The detection engine is the method from my published research; its research accuracy is not a production measurement. Code and data are private.",
  },
  {
    number: "02",
    title: "Flight Meal Demand Forecasting",
    type: "PRODUCTION FORECASTING",
    categories: ["production", "ml"],
    availability: "FREELANCE",
    description:
      "Rebuilt a production forecasting pipeline for an airline caterer (CATRION).",
    highlight: { value: "41.5M", label: "meals a year forecast" },
    build:
      "A rebuilt ETL and model layer with cyclical and lag features, plus redesigned Power BI reports.",
    learning:
      "Removing data leakage comes before any model tuning; otherwise the scores flatter the model.",
    tags: ["Forecasting", "Feature engineering", "Power BI"],
    detail:
      "Sole data scientist on a freelance engagement (Nov 2024 to Mar 2025). Removed data leakage from the existing pipeline, engineered cyclical and lag features, and redesigned the Power BI reports. Presented findings to catering and supply-chain teams as waste-reduction actions. Forecast-error figures are not published here.",
  },
  {
    number: "03",
    title: "Civil Code RAG",
    type: "GENAI + MLOPS",
    categories: ["genai", "mlops"],
    availability: "PUBLIC REPO",
    description:
      "Bilingual Arabic/English legal Q&A, taken from notebook to a tested, containerised API.",
    highlight: { value: "−90%", label: "Docker image / 18.5 → 1.8 GB" },
    build:
      "A FastAPI RAG service with routing, citation validation and a versioned index.",
    learning:
      "Treat a data or embedding change as a release: rebuild, validate, evaluate, version.",
    tags: ["FastAPI", "DVC", "Docker"],
    detail:
      "Routes questions to exact article lookup, explanation, semantic retrieval or an out-of-scope guardrail. Generated answers must cite retrieved articles or the API refuses them. DVC, MLflow, uv, Ruff, pytest (73 tests in a recorded run) and GitHub Actions cover the delivery path. Educational use only; not legal advice.",
    caseStudy: "/projects/civil-code-rag",
    repo: "https://github.com/MahmoudAmgad88/civil-code-rag-mlops",
  },
  {
    number: "04",
    title: "IT Ticket Classification",
    type: "NLP / MODEL SERVING",
    categories: ["ml"],
    availability: "ASSESSMENT",
    description:
      "From unstructured support text to consistent, actionable categories.",
    highlight: {
      value: "86.4%",
      label: "macro-F1 / 47,837 tickets, 8 classes",
    },
    build: "A text-classification pipeline with a typed prediction API.",
    learning: "Shared preprocessing keeps training and inference consistent.",
    tags: ["scikit-learn", "FastAPI", "TF-IDF"],
    detail:
      "Compared logistic regression, calibrated linear SVC and naive Bayes on imbalanced data (largest class 7.7× the smallest) and selected on macro-F1: 86.43% on the test set, 0.8605 ± 0.0037 in five-fold CV. One serialised pipeline covers cleaning, TF-IDF and the classifier, served by FastAPI with health, single and batch endpoints. A take-home technical assessment; the company is not named.",
  },
  {
    number: "05",
    title: "5G QoS Classification",
    type: "TELECOM ML",
    categories: ["ml"],
    availability: "ASSESSMENT",
    description:
      "Predicting application type from network-side 5G QoS KPIs, without inspecting payloads.",
    highlight: { value: "98.8%", label: "macro-F1 / small public dataset" },
    build:
      "Eight models, from logistic regression to TabNet, with telecom-informed features.",
    learning: "SHAP makes model outputs interpretable in telecom terms.",
    tags: ["XGBoost", "CatBoost", "SHAP"],
    detail:
      "Engineered bandwidth-allocation ratios, latency–bandwidth interactions and signal-quality buckets. Random forest and CatBoost reached 98.82% macro-F1 on an 80-record stratified test set (398 records, 9 classes), so the result is offline and small-sample. Also compared inference time and drafted PSI-based drift monitoring. A take-home technical assessment.",
  },
  {
    number: "06",
    title: "Weather-Aware RAG Assistant",
    type: "GENAI / TOOL USE",
    categories: ["genai"],
    availability: "ASSESSMENT",
    description:
      "Turns “what should I wear today?” into advice grounded in live weather and a guide.",
    build:
      "LLM function calling, a weather API and FAISS retrieval in a five-stage Streamlit flow.",
    learning:
      "A mode that runs without an API key keeps a GenAI demo reviewable by anyone.",
    tags: ["Function calling", "FAISS", "Streamlit"],
    detail:
      "Function calling extracts location, intent, time and units; OpenWeatherMap supplies conditions; FAISS with all-MiniLM-L6-v2 retrieves guidance from PDF guides, re-ranked by intent, weather and temperature. Supports three intents, with an LLM mode and a template mode, per-step fallbacks and visible intermediate outputs. A take-home technical assessment.",
  },
  {
    number: "07",
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
    number: "08",
    title: "Resume Screening Automation",
    type: "LLM WORKFLOWS",
    categories: ["genai"],
    availability: "PROTOTYPE",
    description:
      "Structured information extraction and fit scoring in a reviewable workflow.",
    build: "An extraction and assessment workflow with structured outputs.",
    learning: "Human review remains the boundary for hiring decisions.",
    tags: ["n8n", "LLMs", "Structured outputs"],
    detail:
      "A workflow that receives resumes, extracts text, produces structured fit assessments and logs results for human review. This portfolio describes the workflow only; it does not receive resumes or call any external AI service. Automated scores should support, never replace, human hiring judgment.",
  },
  {
    number: "09",
    title: "Small-LLM Fine-Tuning",
    type: "LLM FINE-TUNING",
    categories: ["genai", "mlops"],
    availability: "COURSE PROJECT",
    description:
      "Adapting Qwen2.5-1.5B for structured classification and Arabic-to-English translation.",
    build:
      "Distilled training data, LoRA fine-tuning, vLLM serving and Locust load tests.",
    learning:
      "A small, adapted model is a cost and privacy decision, so measure both.",
    tags: ["LoRA", "LLaMA-Factory", "vLLM"],
    detail:
      "Defined Pydantic output schemas, evaluated the base model, generated training examples with a stronger model, then fine-tuned with LLaMA-Factory (PEFT/LoRA). Covered cost estimation, vLLM serving and Locust load testing. Course-based notebook completed myself; quality and cost figures are not recorded.",
  },
  {
    number: "10",
    title: "Multi-Agent Procurement Crew",
    type: "AGENTS",
    categories: ["genai"],
    availability: "COURSE PROJECT",
    description:
      "Role-based agents research suppliers and draft a report for a human to review.",
    build:
      "A CrewAI crew with search and crawling tools, Pydantic outputs and AgentOps monitoring.",
    learning:
      "Agents need cost and tool-call monitoring from the first run, not after.",
    tags: ["CrewAI", "AgentOps", "Pydantic"],
    detail:
      "Agents plan the search, collect supplier information with Tavily and a custom Scrapegraph-ai crawler, extract structured JSON and produce an HTML report with a refining step. AgentOps tracks sessions, tokens, tool calls and estimated cost. Course-based notebook completed myself; no purchasing decisions are automated.",
  },
  {
    number: "11",
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
    evidence: ["RAN KPI Anomaly Detection", "Published research"],
  },
  {
    skill: "Demand forecasting",
    evidence: ["Flight Meal Demand Forecasting"],
  },
  {
    skill: "RAG and grounded LLM answers",
    evidence: [
      "Civil Code RAG",
      "RAN Anomaly RCA",
      "Weather-Aware RAG Assistant",
    ],
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
    skill: "LLM fine-tuning and agents",
    evidence: ["Small-LLM Fine-Tuning", "Multi-Agent Procurement Crew"],
  },
  {
    skill: "Feature engineering and explainability",
    evidence: ["5G QoS Classification", "Voice Call QoE Prediction"],
  },
  {
    skill: "Telecom RAN domain, 2G to 5G",
    evidence: ["Experience"],
  },
];
export const credentials = [
  {
    label: "Education",
    items: [
      "MSc Data Sciences / Cairo University, 2026 / GPA 3.87",
      "BSc Communications & Electronics Engineering / Cairo University, 2011",
    ],
  },
  {
    label: "Certifications",
    items: [
      "Google Cloud Certified Associate Cloud Engineer, 2026",
      "MLOps Practitioner, 2026",
      "Certified SAFe 6 Practitioner",
    ],
  },
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
    period: "2025 — PRESENT",
    title: "AI solution architect & lead developer",
    text: "About 20% of my time alongside the core RAN role: a production anomaly-detection tool, grounded RCA prototyping, and leading an internal learning programme for about 70 engineers.",
  },
  {
    period: "2024 — 2025",
    title: "Data scientist · freelance",
    text: "Rebuilt a production meal-demand forecasting pipeline for an airline caterer: leakage removal, feature engineering and decision reports.",
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
      "AI & ML Engineer shipping forecasting, anomaly detection and RAG applications on real data, with production deployments and peer-reviewed research.",
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
