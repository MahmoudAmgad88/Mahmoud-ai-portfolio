import { Link, useLocation } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Lock,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import {
  detection,
  grounding,
  limitations,
  flagship,
  paper,
  planned,
  production,
  stack,
} from "../content/site";
import { CheckList, FlagshipStages, Tags, TextLink } from "../components";
import { AnomalyChart, Architecture } from "../caseStudyParts";

function Pipeline() {
  return (
    <div className="pipeline">
      <ol className="pipeline-stages">
        {production.stages.map((stage, index) => (
          <li
            key={stage.title}
            className={stage.research ? "pipeline-research" : undefined}
          >
            <h3>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {stage.title}
            </h3>
            <ul>
              {stage.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="pipeline-tech">{stage.tech}</p>
            {stage.research && (
              <a className="pipeline-badge" href="#research">
                <BookOpen size={13} /> Published method
              </a>
            )}
          </li>
        ))}
      </ol>
      <div className="pipeline-human">
        <h3>
          <UserCheck size={18} />
          <span>05</span> Engineer review, feedback and export
        </h3>
        <p>
          The engineer validates each finding, correlates it with alarms, change
          records and field context, records feedback and decides the action.
          The system ranks and explains; it never acts on the network.
        </p>
      </div>
    </div>
  );
}

export default function CaseStudy() {
  const { hash } = useLocation();
  return (
    <div className="case-study-layout">
      <div className="page-intro case-introduction">
        <Link className="back-link" to="/#projects">
          Back to home
        </Link>
        <p className="eyebrow">FLAGSHIP CASE STUDY / TELECOM AI</p>
        <h1>
          {flagship.title}
          <span>.</span>
        </h1>
        <p className="lead">
          {flagship.subtitle}: a peer-reviewed detection method, the tool that
          runs it in production in two countries, and a GenAI copilot that
          explains what it finds.
        </p>
        <Tags items={flagship.tags} />
      </div>

      <aside className="case-glance" aria-labelledby="glance-title">
        <p className="eyebrow">PROJECT SUMMARY</p>
        <h2 id="glance-title">At a glance</h2>
        <dl>
          <div>
            <dt>Project</dt>
            <dd>{flagship.title}</dd>
          </div>
          {flagship.facts.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </aside>

      <nav className="case-anchors" aria-label="Case study sections">
        {flagship.sections.map(([id, label], index) => (
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
          <h2 id="overview-title">From full KPI review to exceptions.</h2>
          <p>
            RAN engineers monitor thousands of cell and KPI combinations before
            and after network changes. Fixed thresholds lose context as traffic
            and seasonality change, and reviewing every history by hand is slow
            and inconsistent across technologies and markets.
          </p>
          <p>
            This work tackles that in three stages: a published detection
            method, a production tool that runs it, and a grounded GenAI layer
            that turns anomaly evidence into an investigation an engineer can
            check.
          </p>
          <FlagshipStages />
        </section>

        <section
          id="research"
          className="section case-section"
          aria-labelledby="research-title"
        >
          <p className="eyebrow">02 / RESEARCH</p>
          <h2 id="research-title">The detection method is peer-reviewed.</h2>
          <p>
            The way the tool decides what counts as an anomaly came from my MSc
            research and was published in an academic journal. Policy-calibrated
            intervals connect the anomaly boundary to engineering relevance.
          </p>
          <ol className="bridge" aria-label="From research to production">
            <li>
              <span>MSc research</span>
              Compare detection methods on expert-labelled data
            </li>
            <li>
              <span>Published method</span>
              Policy-calibrated forecast intervals
            </li>
            <li>
              <span>Production tool</span>
              Stage 03: forecast &amp; detect
            </li>
          </ol>
          <div className="research-bridge">
            <div className="paper-card">
              <p className="eyebrow">PUBLISHED RESEARCH</p>
              <h3>{paper.title}</h3>
              <p>{paper.authors}</p>
              <p className="small">
                {paper.journal}, Cairo University
                <br />
                {paper.accepted}
              </p>
              <a
                className="text-link"
                href={paper.doi}
                target="_blank"
                rel="noreferrer"
              >
                Read the paper (DOI) <ArrowUpRight size={15} />
              </a>
            </div>
            <div>
              <dl className="research-points">
                {production.researchPoints.map(([title, text]) => (
                  <div key={title}>
                    <dt>{title}</dt>
                    <dd>{text}</dd>
                  </div>
                ))}
              </dl>
              <div className="result-callout">
                <p>
                  <strong>{paper.result}</strong>
                  <span>balanced accuracy</span>
                </p>
                <p>
                  <b>{paper.gain} percentage points</b> above the
                  best-performing benchmark model ({paper.baseline}), on seven
                  days of real network data labelled by expert engineers. It
                  also performed consistently on an independent public benchmark
                  without further adjustment.
                </p>
              </div>
            </div>
          </div>
          <Link className="text-link" to="/research#evaluation">
            Research details and evaluation <ArrowRight size={16} />
          </Link>
        </section>

        <section
          id="production"
          className="section case-section"
          aria-labelledby="production-title"
        >
          <p className="eyebrow">03 / PRODUCTION</p>
          <h2 id="production-title">Running in production in two countries.</h2>
          <span className="status implemented">IN PRODUCTION</span>
          <p>
            The tool learns each cell’s normal behaviour, ranks what deviates
            and explains why, so engineers start from evidence instead of
            dashboards. Rollout to a new market is a configuration change, not a
            code change.
          </p>
          <dl className="scope-figures" aria-label="Deployment scope">
            <div>
              <dt>Countries in production</dt>
              <dd>2</dd>
            </div>
            <div>
              <dt>Proof of concept</dt>
              <dd>+1</dd>
            </div>
            <div>
              <dt>KPI rules, 2G–5G</dt>
              <dd>73</dd>
            </div>
            <div>
              <dt>Automated network changes</dt>
              <dd>0</dd>
            </div>
          </dl>
          <h3 className="subheading">How it works, end to end</h3>
          <p>
            Four automated stages turn a raw KPI export into ranked, explained
            evidence. The fifth stage is human, deliberately.
          </p>
          <Pipeline />
          <div id="detection" className="case-subsection">
            <h3 className="subheading">Detection in detail</h3>
            <CheckList items={detection} />
            <TextLink to="/docs#technical-guide">
              Detection methodology
            </TextLink>
            <div className="case-signal">
              <h3>Inspect a synthetic signal</h3>
              <p>
                Compare normal, degraded and spiking signals against an expected
                range. Synthetic data; no live inference.
              </p>
              <AnomalyChart />
            </div>
          </div>
          <div className="control-grid">
            <div>
              <h3>
                <Lock size={16} /> Access &amp; deployment
              </h3>
              <CheckList items={production.controls} />
            </div>
            <div>
              <h3>
                <ShieldCheck size={16} /> Data handling
              </h3>
              <CheckList items={production.dataHandling} />
            </div>
          </div>
        </section>

        <section
          id="grounded-rca"
          className="section case-section"
          aria-labelledby="grounding-title"
        >
          <p className="eyebrow">04 / GENAI TELECOM COPILOT</p>
          <h2 id="grounding-title">Evidence before explanation.</h2>
          <span className="status implemented">
            IMPLEMENTED / RCA PROTOTYPE
          </span>
          <p>
            An anomaly report supplies observed facts. Retrieved reference
            material supplies candidate explanations. The grounding gate checks
            for anomaly evidence before allowing an RCA verdict, and an engineer
            validates the result.
          </p>
          <CheckList items={grounding} />
          <TextLink to="/docs#technical-guide">
            Retrieval pipeline and safety contracts
          </TextLink>
        </section>

        <section
          id="architecture"
          className="section case-section"
          aria-labelledby="architecture-title"
        >
          <p className="eyebrow">05 / ARCHITECTURE</p>
          <h2 id="architecture-title">A traceable path to a decision.</h2>
          <p>
            KPI exports enter the detection path. Anomaly evidence is the bridge
            to the retrieval and explanation layer. Both paths end in
            engineering review.
          </p>
          <Architecture />
          <div className="case-stack">
            <h3>Technology across the layers</h3>
            <Tags items={stack} />
          </div>
          <TextLink to="/docs#architecture">Architecture notes</TextLink>
        </section>

        <section
          id="limitations"
          className="section case-section"
          aria-labelledby="limitations-title"
        >
          <p className="eyebrow">06 / LIMITATIONS</p>
          <h2 id="limitations-title">
            Explicit boundaries. Visible future work.
          </h2>
          <ul className="plain-list">
            {limitations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="case-planned">
            <span className="status planned">PLANNED / NOT IMPLEMENTED</span>
            <ul className="plain-list">
              {planned.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <TextLink to="/docs#limitations">Technical constraints</TextLink>
        </section>

        <div className="case-contribution">
          <p className="eyebrow">MY CONTRIBUTION</p>
          <p>
            Detection methodology and co-authored research; application
            architecture, development, deployment approach and adaptation across
            markets as lead developer and solution architect; and grounded RCA
            prototyping. Application source code and operational data remain
            private.
          </p>
        </div>
      </div>
    </div>
  );
}
