import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowUpRight,
  BookOpen,
  ChevronDown,
  Github,
  Mail,
  MapPin,
} from "lucide-react";
import {
  credentials,
  mscCourses,
  experience,
  flagship,
  paper,
  profile,
  projects,
  skills,
} from "../content/site";
import type { Project } from "../content/site";
import {
  Contact,
  CountUp,
  CVButton,
  FlagshipStages,
  Portrait,
  Tags,
  TextLink,
} from "../components";

// The production detection project is told inside the flagship, not the grid.
const inFlagship = (project: Project) =>
  project.caseStudy?.startsWith(flagship.route) ?? false;
const featuredProjects = projects.filter((p) => p.featured);
const moreProjects = projects.filter((p) => !p.featured && !inFlagship(p));

function ProjectLinks({ project }: { project: Project }) {
  if (!project.caseStudy && !project.repo) return null;
  return (
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
  );
}

function ProjectDetails({ project }: { project: Project }) {
  return (
    <details>
      <summary>
        Project details <ChevronDown size={16} />
      </summary>
      <dl className="project-summary">
        <div>
          <dt>Engineering takeaway</dt>
          <dd>{project.learning}</dd>
        </div>
      </dl>
      <p>{project.detail}</p>
    </details>
  );
}

// The hero entrance plays on the first visit to Home in a page load only.
let heroPlayed = false;

export default function Home() {
  const [heroEnters] = useState(() => {
    const play =
      !heroPlayed &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    heroPlayed = true;
    return play;
  });
  const { hash } = useLocation();
  const [moreOpen, setMoreOpen] = useState(false);
  // Open "More projects" when a link targets a project inside it, then scroll
  // once the row is visible.
  const targetsMore = moreProjects.some((p) => hash === `#project-${p.number}`);
  useEffect(() => {
    if (targetsMore) setMoreOpen(true);
  }, [hash, targetsMore]);
  useEffect(() => {
    if (targetsMore && moreOpen)
      document.getElementById(hash.slice(1))?.scrollIntoView();
  }, [hash, targetsMore, moreOpen]);
  const projectLink = (title: string) => {
    if (title === "Published research") return "/research";
    if (title === "Experience") return "/#experience";
    if (title === flagship.title) return flagship.route;
    const project = projects.find((p) => p.title === title);
    return project && inFlagship(project)
      ? project.caseStudy!
      : `/#project-${project?.number}`;
  };
  return (
    <>
      <section
        className={`hero recruiter-hero${heroEnters ? " hero-enter" : ""}`}
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
          <div className="hero-fit">
            <p id="hire-for">Hire me for</p>
            <ul aria-labelledby="hire-for">
              {profile.hireFor.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="hero-actions">
            <Link className="button primary" to={flagship.route}>
              Read the flagship case study <ArrowUpRight size={18} />
            </Link>
            <CVButton />
            {profile.email && (
              <a className="button secondary" href={`mailto:${profile.email}`}>
                <Mail size={16} />
                Email me
              </a>
            )}
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
          <div className="hero-availability">
            <p>
              <span />
              {profile.availability}
            </p>
            <p className="hero-location">
              <MapPin size={14} aria-hidden="true" />
              {profile.location}
            </p>
          </div>
        </div>
        <div className="hero-person">
          <Portrait />
        </div>
      </section>

      <section
        className="proof-strip recruiter-proof"
        aria-label="Key evidence"
      >
        <Link to="/#experience">
          <strong>
            <CountUp value="10 yrs" />
          </strong>
          <span>Data-heavy engineering</span>
        </Link>
        <Link to={`${flagship.route}#production`}>
          <strong>
            <CountUp value="2 countries" />
          </strong>
          <span>ML in production</span>
        </Link>
        <Link to="/research">
          <strong>
            <CountUp value={paper.result} />
          </strong>
          <span>Peer-reviewed balanced accuracy</span>
        </Link>
        <Link to="/#education">
          <strong>
            <CountUp value="MSc" />
          </strong>
          <span>Data Science, GPA 3.87</span>
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
          <span className="small muted">{flagship.subtitle}</span>
        </div>
        <article className="featured-card">
          <div className="flagship-intro">
            <h3>
              A published anomaly-detection method, the production tool that
              runs it, and a GenAI copilot that explains what it finds.
            </h3>
          </div>
          <FlagshipStages />
          <div className="flagship-actions">
            <Link className="button primary" to={flagship.route}>
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
            <p className="eyebrow">02 / SELECTED WORK</p>
            <h2 id="selected-title">Beyond the flagship.</h2>
          </div>
          <span className="small muted">
            ML, GenAI and MLOps, from notebook to API
          </span>
        </div>
        <div className="project-grid featured-projects">
          {featuredProjects.map((project) => (
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
              <dl className="project-facts">
                <div>
                  <dt>Problem</dt>
                  <dd>{project.description}</dd>
                </div>
                <div>
                  <dt>Built</dt>
                  <dd>{project.build}</dd>
                </div>
                <div>
                  <dt>Stack</dt>
                  <dd>
                    <Tags items={project.tags} />
                  </dd>
                </div>
                {project.highlight && (
                  <div className="project-result">
                    <dt>Result</dt>
                    <dd>
                      <strong>{project.highlight.value}</strong>{" "}
                      <span>{project.highlight.label}</span>
                    </dd>
                  </div>
                )}
              </dl>
              <ProjectLinks project={project} />
              <ProjectDetails project={project} />
            </article>
          ))}
        </div>
        <details
          className="more-projects"
          open={moreOpen}
          onToggle={(event) => setMoreOpen(event.currentTarget.open)}
        >
          <summary>
            <span>More projects ({moreProjects.length})</span>
            <ChevronDown size={18} />
          </summary>
          <ul>
            {moreProjects.map((project) => (
              <li id={`project-${project.number}`} key={project.number}>
                <div className="more-heading">
                  <h3>{project.title}</h3>
                  <span
                    className={`project-access${project.repo ? " public" : ""}`}
                  >
                    {project.availability}
                  </span>
                </div>
                <p>{project.description}</p>
                <Tags items={project.tags} />
                <ProjectLinks project={project} />
                <ProjectDetails project={project} />
              </li>
            ))}
          </ul>
        </details>
      </section>

      <section
        className="section experience"
        id="experience"
        aria-labelledby="experience-title"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">03 / EXPERIENCE</p>
            <h2 id="experience-title">Telecom foundations. Applied AI.</h2>
          </div>
          <span className="small muted">
            {profile.yearsInTelecom} in telecom RAN
          </span>
        </div>
        <ol className="experience-list">
          {experience.map((entry) => (
            <li key={entry.period + entry.title}>
              <p className="experience-period">{entry.period}</p>
              <div>
                <h3>{entry.title}</h3>
                {entry.company && (
                  <p className="experience-company">{entry.company}</p>
                )}
                <p>{entry.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="education credential-groups" id="education">
          {credentials.map((group) => (
            <div key={group.label}>
              <p id={`credentials-${group.label.toLowerCase()}`}>
                {group.label}
              </p>
              <ul
                className="credentials"
                aria-labelledby={`credentials-${group.label.toLowerCase()}`}
              >
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <details className="courses">
          <summary>
            <span>MSc coursework: 14 courses, 13 graded Excellent</span>
            <ChevronDown size={16} />
          </summary>
          <div className="course-themes">
            {mscCourses.map((group) => (
              <div key={group.theme}>
                <h3>{group.theme}</h3>
                <ul>
                  {group.courses.map(([code, name, grade]) => (
                    <li key={code}>
                      <span className="course-code">{code}</span>
                      <span>{name}</span>
                      <span className="course-grade">
                        {grade ?? "Excellent"}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </details>
      </section>

      <section
        className="section research-teaser"
        aria-labelledby="research-title"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">04 / RESEARCH</p>
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
            <span className="status published">PEER-REVIEWED · 2026</span>
            <h3>{paper.title}</h3>
            <p>
              {paper.contribution} The method now runs in production in two
              countries.
            </p>
            <div className="research-links">
              <a
                className="text-link"
                href={paper.doi}
                target="_blank"
                rel="noreferrer"
              >
                Read the paper (DOI) <ArrowUpRight size={15} />
              </a>
              <TextLink to="/research">Research details</TextLink>
            </div>
          </div>
        </div>
      </section>

      <section
        className="section skills-evidence"
        id="skills"
        aria-labelledby="skills-title"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">05 / SKILLS WITH EVIDENCE</p>
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
                  <Link key={title} to={projectLink(title)}>
                    {title}
                  </Link>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </section>
      <Contact />
    </>
  );
}
