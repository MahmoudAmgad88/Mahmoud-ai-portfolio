# Mahmoud Salakawy — AI / ML Engineer

AI/ML engineer with 10 years of telecom RAN experience, building time-series anomaly detection and grounded GenAI (RAG) for network operations.

**Targeting:** AI Engineer · Machine Learning Engineer · GenAI / LLM Engineer

[Live site](https://MahmoudAmgad88.github.io/Mahmoud-ai-portfolio/) · [CV (PDF)](public/) · [LinkedIn](www.linkedin.com/in/mahmoud-salakawy-msc-7b412b92) · [Email](eng.salakawy@gmail.com ) · [Published paper (DOI)](https://doi.org/10.21608/jicds.2026.457039.1026)

---

## At a glance

- **Domain:** Telecom RAN, 2G–5G, Ericsson and Huawei networks
- **Research:** 1 paper published in the *Journal of Intelligent Computing and Data Science* (2026), 1 under review
- **Education:** MSc Data Science, Cairo University · BSc Electrical Engineering, Cairo University
- **Certifications:** SAFe® 6.0 Practitioner · AWS Certified Machine Learning Engineer, Associate (in progress)

## Featured case study: RAN Anomaly RCA

Network engineers scan KPI dashboards cell by cell, and degradations often surface after customers are affected. This project combines two parts:

1. **Detection:** learns each cell's normal behaviour, flags deviations, ranks them by severity, and separates sustained degradation from isolated noise. The method is published.
2. **Grounded root-cause analysis:** a RAG pipeline that produces an RCA only when anomaly evidence exists. Facts (anomaly reports) and hypotheses (knowledge base) are kept separate.

**Implemented:** per-cell forecasting with calibrated intervals · severity ranking · SHAP explanations · 5-step RAG pipeline with KPI-aware re-ranking · grounding gate · deterministic mock mode with optional LLM escalation

**Planned / future:** multivariate detection models · enterprise LLM integration · drift detection and retraining triggers

[Read the full case study →](PLACEHOLDER — link to /projects/ran-anomaly-rca)

## Key results

- **91.27% balanced accuracy** on a week of expert-labelled network data, held on a public benchmark without retuning (published method)
- **0.8643 Macro-F1** across 8 categories on 47,837 IT support tickets
- **11 passing pytest tests** covering the RCA safety contracts

## Selected projects

| Project | What it does | Key tools |
|---|---|---|
| IT Ticket Classification Pipeline | Classifies 47,837 tickets into 8 categories; served via FastAPI with validated requests | scikit-learn, TF-IDF, Calibrated LinearSVC, FastAPI, Pydantic |
| 5G QoS Application Classification | Predicts application type from network KPIs using 4 engineered telecom features; benchmarks 8 models | XGBoost, LightGBM, CatBoost, SHAP |
| Resume Screening Automation | 20+ node workflow that extracts resume text and scores fit with an LLM | n8n, OpenAI, Google Sheets API |

## Skills and where to see them

| Skill | Shown in |
|---|---|
| Time-series anomaly detection | RAN Anomaly RCA, published paper |
| RAG and LLM pipelines | RAN Anomaly RCA (GenAI copilot) |
| ML pipeline design and serving | IT Ticket Classification |
| Model selection and explainability | 5G QoS Classification |
| Python, FastAPI, testing | All projects, pytest suite |
| Telecom RAN domain | Experience at Vodafone Intelligent Solutions |

## How to review this work

- **Quick review (2 min):** read the [live site](https://MahmoudAmgad88.github.io/Mahmoud-ai-portfolio/) and the RAN Anomaly RCA case study.
- **Code review:** the `src/content/` folder holds the public profile, project, and research data. Browser checks live in `tests/`.
- **Source code of production systems is not public** because it belongs to my employer. The case study describes the design and results at a level that is safe to share.

## Developer setup

Requires Node.js 22.19 or later.

```bash
npm install
npm run dev        # local development
npm run build      # production build
npm run test:smoke # browser checks (requires Google Chrome)
```

## Privacy

Examples and visualizations use public or synthetic information. Employer-confidential material, operational datasets, internal application source, and credentials are excluded.