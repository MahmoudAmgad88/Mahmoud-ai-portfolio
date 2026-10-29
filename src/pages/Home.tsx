import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Activity,
  BookOpen,
  ChevronDown,
  Github,
} from "lucide-react";
import {
  credentials,
  experience,
  flagship,
  paper,
  profile,
  projectFilters,
  projects,
  skills,
} from "../content/site";
import {
  Contact,
  CVButton,
  Portrait,
  Tags,
  TextLink,
  Workflow,
} from "../components";

export default function Home() {
  const [category, setCategory] = useState<string>("all");
  const visibleProjects = projects.filter(
    (project) =>
      category === "all" ||
      project.categories.some((item) => item === category),
  );
  const projectLink = (title: string) =>
    title === flagship.title
      ? flagship.route
      : title === "Published research"
        ? "/research"
        : title === "Experience"
          ? "/#experience"
          : `/#project-${projects.find((p) => p.title === title)?.number}`;
  const career = [...experience].reverse();
  return (
    <>
      <section
        className="hero recruiter-hero"
        id="about"
        aria-labelledby="hero-title"
      >
        <div className="hero-copy">
          <p className="hero-name">{profile.name}</p>
          <h1 id="hero-title">
            {profile.role}.
            <br />
            <span>{profile.headline}</span>
          </h1>
          <p className="hero-description">{profile.intro}</p>
          <div className="hero-actions">
            <Link className="button primary" to="/projects/ran-anomaly-rca">
              Explore RAN Anomaly RCA <ArrowUpRight size={18} />
            </Link>
            <CVButton />
          </div>
          <div className="hero-links" aria-label="Professional links">
            {profile.github && (
              <a href={profile.github} target="_blank" rel="noreferrer">
                GitHub <ArrowUpRight size={13} />
              </a>
            )}
            {profile.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn <ArrowUpRight size={13} />
              </a>
            )}
            <Link to="/research">
              Research <ArrowUpRight size={13} />
            </Link>
          </div>
          <p className="hero-intersection">
            {profile.capabilities.join(" / ")}
          </p>
          <p className="hero-availability">
            <span />
            {profile.availability}
          </p>
        </div>
        <div className="hero-person">
          <Portrait />
        </div>
      </section>

      <section
        className="proof-strip recruiter-proof"
        aria-label="Experience and published research evidence"
      >
        <div>
          <strong>10 years</strong>
          <span>Telecom RAN</span>
        </div>
        <div>
          <strong>4+ years</strong>
          <span>Building ML systems</span>
        </div>
        <a href={paper.doi} target="_blank" rel="noreferrer">
          <strong>
            {paper.result}
            <ArrowUpRight size={15} />
          </strong>
          <span>{paper.metricLabel} / Published research</span>
        </a>
        <Link to="/research">
          <strong>Peer-reviewed</strong>
          <span>Research publication</span>
        </Link>
      </section>

      <section
        className="section flagship-story"
        id="projects"
        aria-labelledby="flagship-title"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 / FLAGSHIP CASE STUDY</p>
            <h2 id="flagship-title">{flagship.title}</h2>
          </div>
          <span className="small muted">Time-series ML + grounded GenAI</span>
        </div>
        <article className="featured-card">
          <div className="flagship-intro">
            <div className="project-symbol">
              <Activity size={25} />
            </div>
            <div>
              <h3>
                Time-series detection research paired with a separate grounded
                RCA prototype.
              </h3>
            </div>
          </div>
          <div className="flagship-workflow">
            <p className="eyebrow">THE CONCEPTUAL WORKFLOW</p>
            <Workflow />
          </div>
          <div className="transformation-grid home-project-summary">
            <div>
              <p className="eyebrow">THE PROBLEM</p>
              <p>
                Manual KPI review is slow, and fixed thresholds miss changing
                traffic patterns.
              </p>
            </div>
            <div>
              <p className="eyebrow">THE APPROACH</p>
              <p>
                Per-cell time-series ML adds severity and persistence context to
                anomaly review.
              </p>
            </div>
            <div>
              <p className="eyebrow">TRUST PRINCIPLE</p>
              <p>
                Evidence before explanation. An engineer validates the findings.
              </p>
            </div>
          </div>
          <div className="flagship-actions">
            <Link className="button primary" to="/projects/ran-anomaly-rca">
              Explore full case study <ArrowUpRight size={17} />
            </Link>
            <TextLink to="/docs#architecture">Architecture &amp; Docs</TextLink>
          </div>
        </article>
      </section>

      <section
        className="section selected"
        id="selected-work"
        aria-labelledby="selected-title"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">02 / ALL PROJECTS</p>
            <h2 id="selected-title">Beyond the flagship.</h2>
          </div>
          <span className="small muted">
            ML, GenAI and MLOps, from notebook to API
          </span>
        </div>
        <div className="project-toolbar">
          <div
            className="project-filters"
            role="group"
            aria-label="Filter projects"
          >
            {projectFilters.map((item) => (
              <button
                key={item.value}
                aria-pressed={category === item.value}
                onClick={() => setCategory(item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <span className="mono muted" aria-live="polite">
            {visibleProjects.length} projects
          </span>
        </div>
        <div className="project-grid">
          {visibleProjects.map((project) => (
            <article
              className="project-card"
              id={`project-${project.number}`}
              key={project.number}
            >
              <div className="card-top">
                <span
                  className={`project-access${project.repo ? " public" : ""}`}
                >
                  {project.availability}
                </span>
                <span>{project.number}</span>
              </div>
              <p className="eyebrow">{project.type}</p>
              <h3>{project.title}</h3>
              <p className="project-purpose">{project.description}</p>
              {project.highlight && (
                <p className="project-highlight">
                  <strong>{project.highlight.value}</strong>
                  <span>{project.highlight.label}</span>
                </p>
              )}
              <Tags items={project.tags} />
              {(project.caseStudy || project.repo) && (
                <div className="project-links">
                  {project.caseStudy && (
                    <Link to={project.caseStudy}>
                      Case study <ArrowUpRight size={14} />
                    </Link>
                  )}
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.title} source on GitHub`}
                    >
                      <Github size={14} /> Source
                    </a>
                  )}
                </div>
              )}
              <details>
                <summary>
                  Project details <ChevronDown size={16} />
                </summary>
                <dl className="project-summary">
                  <div>
                    <dt>Built</dt>
                    <dd>{project.build}</dd>
                  </div>
                  <div>
                    <dt>Engineering takeaway</dt>
                    <dd>{project.learning}</dd>
                  </div>
                </dl>
                <p>{project.detail}</p>
              </details>
            </article>
          ))}
        </div>
      </section>

      <section
        className="section skills-evidence"
        id="skills"
        aria-labelledby="skills-title"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">03 / SKILLS WITH EVIDENCE</p>
            <h2 id="skills-title">Every claim points to work.</h2>
          </div>
          <span className="small muted">Skill and where to see it</span>
        </div>
        <dl className="skill-map">
          {skills.map((item) => (
            <div key={item.skill}>
              <dt>{item.skill}</dt>
              <dd>
                {item.evidence.map((title) => (
                  <Link
                    key={title}
                    to={projectLink(title)}
                    onClick={() => setCategory("all")}
                  >
                    {title}
                  </Link>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section
        className="section research-teaser"
        aria-labelledby="research-title"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">04 / RESEARCH EVIDENCE</p>
            <h2 id="research-title">Engineering backed by research.</h2>
          </div>
        </div>
        <div className="paper-teaser recruiter-research">
          <div className="research-proof">
            <BookOpen size={23} />
            <strong>Published method</strong>
            <span>Time-series anomaly detection</span>
          </div>
          <div>
            <span className="status published">PEER-REVIEWED</span>
            <h3>From forecast intervals to useful alerts.</h3>
            <p>{paper.contribution}</p>
            <TextLink to="/research">Read the research</TextLink>
          </div>
        </div>
      </section>

      <section
        className="section experience"
        id="experience"
        aria-labelledby="experience-title"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">05 / EXPERIENCE</p>
            <h2 id="experience-title">Telecom foundations. Applied AI.</h2>
          </div>
        </div>
        <p className="career-context">
          Telecom integration and RAN expertise inform my ML work. Since 2024,
          AI and automation contributions have run alongside the core RAN role.
        </p>
        <div className="career-journey" aria-label="Career progression">
          {career.map((entry, index) => (
            <article key={entry.period}>
              <span className="career-step">0{index + 1}</span>
              <p className="mono career-period">{entry.period}</p>
              <h3>{entry.title}</h3>
              <p>{entry.text}</p>
              {index < career.length - 1 && (
                <ArrowRight
                  className="career-arrow"
                  size={18}
                  aria-hidden="true"
                />
              )}
            </article>
          ))}
        </div>
        <ul
          className="education credentials"
          aria-label="Education and certification"
        >
          {credentials.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <Contact />
    </>
  );
}
