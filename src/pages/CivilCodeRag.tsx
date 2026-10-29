import { Link, useLocation } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Github, ShieldCheck } from "lucide-react";
import { civilCode } from "../content/site";
import { CheckList, Tags } from "../components";

function RequestFlow() {
  return (
    <div className="architecture rag-flow">
      <div className="architecture-row">
        <div className="diagram-label">
          <span>01</span> REQUEST PATH
        </div>
        <ol>
          {[
            "Question (AR / EN)",
            "Validate",
            "Route",
            "Retrieve or look up",
            "Cite & validate",
          ].map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      </div>
      <div className="evidence-bridge">
        <span />
        Versioned index restored and checked at build time
        <span />
      </div>
      <div className="architecture-row">
        <div className="diagram-label">
          <span>02</span> OFFLINE RELEASE PATH
        </div>
        <ol>
          {[
            "Parse & pair articles",
            "Search records",
            "Embed",
            "Index + SHA-256",
            "Docker build",
          ].map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      </div>
      <div className="diagram-note">
        <ShieldCheck size={17} />
        No valid citation → no generated answer. Exact text always comes from
        the corpus.
      </div>
    </div>
  );
}

export default function CivilCodeRag() {
  const { hash } = useLocation();
  return (
    <div className="case-study-layout">
      <div className="page-intro case-introduction">
        <Link className="back-link" to="/#selected-work">
          Back to all projects
        </Link>
        <p className="eyebrow">ENGINEERING CASE STUDY / GENAI + MLOPS</p>
        <h1>
          {civilCode.title}
          <span>.</span>
        </h1>
        <p className="lead">
          A bilingual legal Q&amp;A prototype, taken from notebook to a tested,
          versioned and containerised API.
        </p>
        <Tags items={civilCode.tags} />
        <div className="scope-note">
          <ShieldCheck size={20} />
          <p>
            <strong>Educational project. Not legal advice.</strong> The goal was
            a reliable delivery path for a RAG application over a small, frozen
            subset of the Egyptian Civil Code, not maximum retrieval quality.
          </p>
        </div>
        <div className="case-actions">
          <a
            className="button primary"
            href={civilCode.repo}
            target="_blank"
            rel="noreferrer"
          >
            <Github size={17} /> View source on GitHub
          </a>
        </div>
      </div>

      <aside className="case-glance" aria-labelledby="glance-title">
        <p className="eyebrow">PROJECT SUMMARY</p>
        <h2 id="glance-title">At a glance</h2>
        <dl>
          <div>
            <dt>Project</dt>
            <dd>{civilCode.title}</dd>
          </div>
          {civilCode.facts.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </aside>

      <nav className="case-anchors" aria-label="Case study sections">
        {civilCode.sections.map(([id, label], index) => (
          <a
            key={id}
            href={`#${id}`}
            aria-current={
              hash === `#${id}` || (!hash && index === 0)
                ? "location"
                : undefined
            }
          >
            {label}
          </a>
        ))}
      </nav>

      <div className="case-narrative">
        <section
          id="overview"
          className="section case-section"
          aria-labelledby="overview-title"
        >
          <p className="eyebrow">01 / OVERVIEW</p>
          <h2 id="overview-title">A notebook answer isn’t a service.</h2>
          <p>
            A RAG notebook can answer a question once. A service has to answer
            in two languages, refuse what it cannot support, show where every
            claim came from and rebuild the same way on a clean machine.
          </p>
          <p>
            This project uses a frozen corpus of Civil Code articles to practise
            that full journey: routing, retrieval, grounded generation and the
            engineering around them.
          </p>
          <dl className="scope-figures" aria-label="Frozen scope">
            {civilCode.scope.map(([value, label]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section
          id="architecture"
          className="section case-section"
          aria-labelledby="architecture-title"
        >
          <p className="eyebrow">02 / ARCHITECTURE</p>
          <h2 id="architecture-title">Route first. Generate last.</h2>
          <p>
            A question router decides the cheapest correct path. Only explain
            and semantic questions reach the language model; exact lookups,
            repealed articles and out-of-scope requests never need it.
          </p>
          <RequestFlow />
          <dl className="route-list">
            {civilCode.routes.map(([route, text]) => (
              <div key={route}>
                <dt>{route}</dt>
                <dd>{text}</dd>
              </div>
            ))}
          </dl>
          <div className="case-stack">
            <h3>Technology</h3>
            <Tags items={civilCode.stack} />
          </div>
        </section>

        <section
          id="guardrails"
          className="section case-section"
          aria-labelledby="guardrails-title"
        >
          <p className="eyebrow">03 / GUARDRAILS</p>
          <h2 id="guardrails-title">Refuse rather than invent.</h2>
          <span className="status implemented">IMPLEMENTED / API</span>
          <p>
            Each guardrail turns a quiet failure into a visible one: an error
            code, a source note or a rejected request.
          </p>
          <CheckList items={civilCode.guardrails} />
        </section>

        <section
          id="mlops"
          className="section case-section"
          aria-labelledby="mlops-title"
        >
          <p className="eyebrow">04 / MLOPS</p>
          <h2 id="mlops-title">From code to repeatable delivery.</h2>
          <span className="status implemented">IMPLEMENTED / DELIVERY</span>
          <ol className="journey">
            {civilCode.journey.map((step, index) => (
              <li key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {step}
              </li>
            ))}
          </ol>
          <p className="accent-note">
            A data or embedding change is treated as a release: rebuild,
            validate, evaluate, version.
          </p>
        </section>

        <section
          id="evidence"
          className="section case-section"
          aria-labelledby="evidence-title"
        >
          <p className="eyebrow">05 / EVIDENCE</p>
          <h2 id="evidence-title">Checks you can run yourself.</h2>
          <p>
            Three commands start the service on a clean machine with Docker.
            Health, exact lookup and out-of-scope rejection work without an API
            key, so a reviewer can verify the deterministic paths for free.
          </p>
          <pre className="code-sample" tabIndex={0}>
            <code>
              {`cp .env.example .env
docker compose up --build -d --wait
curl http://127.0.0.1:8000/health`}
            </code>
          </pre>
          <p className="small">
            Unit and integration tests mock the language model and make no paid
            calls. A live end-to-end run is a separate, deliberate step.
          </p>
          <a
            className="text-link"
            href={civilCode.repo}
            target="_blank"
            rel="noreferrer"
          >
            Setup guide and test strategy <ArrowUpRight size={17} />
          </a>
        </section>

        <section
          id="limitations"
          className="section case-section"
          aria-labelledby="limitations-title"
        >
          <p className="eyebrow">06 / LIMITATIONS</p>
          <h2 id="limitations-title">Stated scope. Known gaps.</h2>
          <ul className="plain-list">
            {civilCode.limitations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <div className="case-contribution">
          <p className="eyebrow">MY CONTRIBUTION</p>
          <p>
            Designed and built end to end as an MLOps practice project: corpus
            pipeline, retrieval, API, guardrails, tests and delivery. The full
            source is public.
          </p>
          <Link className="text-link" to="/projects/ran-anomaly-rca">
            Next: RAN Anomaly RCA <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </div>
  );
}
