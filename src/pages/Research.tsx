import { ArrowUpRight, ExternalLink } from "lucide-react";
import { paper } from "../content/site";
import { TextLink } from "../components";

export default function Research() {
  return (
    <>
      <div className="page-intro">
        <p className="eyebrow">RESEARCH / APPLIED TIME SERIES</p>
        <h1>
          Better questions.
          <br />
          <span>Testable answers.</span>
        </h1>
        <p className="lead">
          Research that connects statistical detection
          <br />
          with the reality of network engineering.
        </p>
      </div>
      <section className="publication panel">
        <div className="publication-header">
          <span className="status published">PUBLISHED · 2026</span>
          <span className="mono muted">01 / JOURNAL ARTICLE</span>
        </div>
        <h2>{paper.title}</h2>
        <p>{paper.authors}</p>
        <p className="small muted">
          {paper.journal}
          <br />
          {paper.citation} · Cairo University
        </p>
        <div className="publication-actions">
          <a
            className="button primary"
            href={paper.doi}
            target="_blank"
            rel="noreferrer"
          >
            Read publication &amp; Table 11
            <ArrowUpRight size={17} />
          </a>
          <a
            className="text-link"
            href={paper.source}
            target="_blank"
            rel="noreferrer"
          >
            Author-uploaded full text
            <ExternalLink size={15} />
          </a>
        </div>
        <p className="small muted">Published as M. A. ElSalakawy.</p>
      </section>
      <section className="section research-grid" id="evaluation">
        <div>
          <p className="eyebrow">THE QUESTION</p>
          <h2>
            When is a deviation
            <br />
            worth investigating?
          </h2>
          <p>
            Fixed thresholds and uncalibrated intervals can flag changes that do
            not align with an engineer’s assessment of meaningful degradation.
          </p>
          <h3 className="subheading">The method</h3>
          <p>
            Per-cell time-series forecasts, with prediction intervals calibrated
            to an operational alerting policy. The study compares the proposed
            method with forecasting and statistical threshold baselines.
          </p>
          <p>
            Evaluation covers expert-labelled data and a separate public
            benchmark. Results depend on the dataset and scoring protocol; no
            one model leads every benchmark metric.
          </p>
        </div>
        <div className="research-result">
          <p className="eyebrow">PUBLISHED EVALUATION</p>
          <strong>{paper.result}</strong>
          <h3>{paper.metricLabel}</h3>
          <p>{paper.resultNote}</p>
        </div>
      </section>
      <section className="section next-research">
        <div>
          <span className="status planned">UNDER REVIEW</span>
          <h2>Continuing the research.</h2>
          <p>
            A second paper extends the same research stream.
            <br />
            Further details will be shared when available for publication.
          </p>
        </div>
        <TextLink to="/projects/ran-anomaly-rca">
          See the engineering case study
        </TextLink>
      </section>
    </>
  );
}
