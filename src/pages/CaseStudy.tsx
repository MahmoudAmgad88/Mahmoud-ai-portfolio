import { Link, useLocation } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import {
  detection,
  grounding,
  limitations,
  flagship,
  planned,
  stack,
} from "../content/site";
import {
  AnomalyChart,
  Architecture,
  CheckList,
  Tags,
  TextLink,
} from "../components";

export default function CaseStudy() {
  const { hash } = useLocation();
  return (
    <div className="case-study-layout">
      <div className="page-intro case-introduction">
        <Link className="back-link" to="/#projects">
          Back to featured work
        </Link>
        <p className="eyebrow">ENGINEERING CASE STUDY / TELECOM AI</p>
        <h1>
          {flagship.title}
          <span>.</span>
        </h1>
        <p className="lead">
          From observed network deviations to evidence-supported investigations.
        </p>
        <Tags items={flagship.tags} />
        <div className="scope-note">
          <ShieldCheck size={20} />
          <p>
            <strong>Two layers. One case study.</strong> Detection research and
            a separate grounded RCA prototype are presented together here. This
            does not describe one system with every capability deployed
            together.
          </p>
        </div>
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
          <h2 id="overview-title">More alerts aren't more understanding.</h2>
          <p>
            Manual KPI review is slow. Fixed thresholds lose context as traffic
            and seasonality change. Unranked alerts compete for attention;
            unsupported AI explanations add another source of uncertainty.
          </p>
          <p>
            The detection layer learns a per-cell baseline and prioritises
            deviations. The RCA prototype uses anomaly evidence and retrieved
            references to frame hypotheses, keeping what was observed separate
            from what might explain it.
          </p>
          <p className="accent-note">
            The outcome is a prioritised investigation for an engineer to
            review. Network changes remain outside the automation boundary.
          </p>
        </section>

        <section
          id="architecture"
          className="section case-section"
          aria-labelledby="architecture-title"
        >
          <p className="eyebrow">02 / ARCHITECTURE</p>
          <h2 id="architecture-title">A traceable path to a decision.</h2>
          <p>
            KPI exports enter the detection path. Anomaly evidence provides the
            bridge to the separate retrieval and explanation prototype. Both
            paths end in engineering review.
          </p>
          <Architecture />
          <div className="case-stack">
            <h3>Technology across the two layers</h3>
            <Tags items={stack} />
          </div>
          <TextLink to="/docs#architecture">Architecture notes</TextLink>
        </section>

        <section
          id="detection"
          className="section case-section"
          aria-labelledby="detection-title"
        >
          <p className="eyebrow">03 / DETECTION</p>
          <h2 id="detection-title">
            Learn normal behaviour. Prioritise deviations.
          </h2>
          <span className="status implemented">
            IMPLEMENTED / DETECTION WORK
          </span>
          <p>
            Per-cell forecasts estimate expected behaviour. Policy-calibrated
            intervals connect the anomaly boundary to engineering relevance;
            severity and persistence add investigation context.
          </p>
          <CheckList items={detection} />
          <TextLink to="/docs#technical-guide">Detection methodology</TextLink>
          <div className="case-signal">
            <h3>Inspect a synthetic signal</h3>
            <p>
              Compare normal, degraded and spiking signals against an expected
              range. This browser illustration uses synthetic data; it does not
              run the research model or measure RCA performance.
            </p>
            <AnomalyChart />
          </div>
        </section>

        <section
          id="grounded-rca"
          className="section case-section"
          aria-labelledby="grounding-title"
        >
          <p className="eyebrow">04 / GROUNDED RCA</p>
          <h2 id="grounding-title">Evidence before explanation.</h2>
          <span className="status implemented">
            IMPLEMENTED / RCA PROTOTYPE
          </span>
          <p>
            An anomaly report supplies observed facts. Retrieved reference
            material supplies candidate explanations. The grounding gate checks
            for anomaly evidence before allowing an RCA verdict.
          </p>
          <CheckList items={grounding} />
          <TextLink to="/docs#technical-guide">
            Retrieval pipeline and safety contracts
          </TextLink>
        </section>

        <section
          id="evidence"
          className="section case-section"
          aria-labelledby="evidence-title"
        >
          <p className="eyebrow">05 / EVIDENCE</p>
          <h2 id="evidence-title">Evaluate each layer on its own terms.</h2>
          <p>
            The detection method has a published evaluation on labelled data.
            The RCA prototype is checked separately with safety-contract tests
            for evidence handling.
          </p>
          <TextLink to="/research#evaluation">
            Published results and evaluation
          </TextLink>
          <p className="small">
            Academic review applies to the detection method. It does not
            establish performance for the RCA prototype or the combined case
            study.
          </p>
          <h3 className="subheading">Human validation</h3>
          <p>
            Engineers inspect the supporting context, validate findings and
            record feedback before sharing a report. There are no automated
            network changes.
          </p>
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
            My work spans the co-authored detection research and grounded RCA
            prototyping. This public case study explains methods and engineering
            decisions; application source code and operational data remain
            private.
          </p>
        </div>
      </div>
    </div>
  );
}
