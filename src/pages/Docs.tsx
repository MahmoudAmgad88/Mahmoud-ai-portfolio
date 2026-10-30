import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { docs, faqs, technicalLimits } from "../content/docs";
import { Architecture } from "../caseStudyParts";

export default function Docs() {
  const { hash } = useLocation();
  const [active, setActive] = useState("overview");
  useEffect(() => {
    if (hash) setActive(hash.slice(1));
    if (!window.IntersectionObserver) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-100px 0px -55% 0px", threshold: 0 },
    );
    document
      .querySelectorAll(".docs-content > section")
      .forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [hash]);
  return (
    <>
      <div className="page-intro">
        <p className="eyebrow">THE ENGINEERING NOTES</p>
        <h1>
          Documentation<span>.</span>
        </h1>
        <p className="lead">
          The approach, the workflow, and the boundaries.
          <br />A public guide to the RAN Anomaly RCA case study.
        </p>
      </div>
      <div className="docs-layout">
        <aside className="docs-sidebar">
          <span className="eyebrow">ON THIS PAGE</span>
          <nav aria-label="Documentation sections">
            {[
              ...docs.map((d) => [d.id, d.title]),
              ["faq", "FAQ"],
              ["limitations", "Known limitations"],
            ].map(([id, title], i) => (
              <a
                className={active === id ? "current" : ""}
                aria-current={active === id ? "location" : undefined}
                href={`#${id}`}
                key={id}
              >
                <span>0{i + 1}</span>
                {title}
              </a>
            ))}
          </nav>
          <Link className="text-link" to="/projects/ran-anomaly-rca">
            View case study
            <ArrowUpRight size={16} />
          </Link>
        </aside>
        <div className="docs-content">
          {docs.map((d, i) => (
            <section id={d.id} key={d.id}>
              <p className="eyebrow">0{i + 1} / DOCUMENTATION</p>
              <h2>{d.title}</h2>
              {d.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {d.id === "architecture" && <Architecture />}
            </section>
          ))}
          <section id="faq">
            <p className="eyebrow">05 / COMMON QUESTIONS</p>
            <h2>Frequently asked questions</h2>
            <div className="faq-list">
              {faqs.map(([q, a]) => (
                <details key={q}>
                  <summary>
                    {q}
                    <ChevronDown size={17} />
                  </summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </section>
          <section id="limitations">
            <p className="eyebrow">06 / BOUNDARIES</p>
            <h2>Known limitations</h2>
            <ul className="plain-list">
              {technicalLimits.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
            <p>
              Containerisation, CI/CD, drift monitoring and automated retraining
              remain future work.
            </p>
            <Link className="text-link" to="/research#evaluation">
              Academic evaluation &amp; scope <ArrowUpRight size={15} />
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}
