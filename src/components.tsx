import { useEffect, useRef, useState } from "react";
import {
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  Check,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import { Link } from "react-router-dom";
import { flagship, profile } from "./content/site";
import type { ReactNode } from "react";

export function Tags({ items }: { items: string[] }) {
  return (
    <div className="tags">
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
}
export function TextLink({
  to,
  children,
}: {
  to: string;
  children: ReactNode;
}) {
  return (
    <Link className="text-link" to={to}>
      {children}
      <ArrowUpRight size={17} />
    </Link>
  );
}
export function CVButton({ compact = false }: { compact?: boolean }) {
  return profile.cv ? (
    <a
      className={`button secondary${compact ? " nav-cv" : ""}`}
      href={profile.cv}
      download
    >
      <ArrowDownToLine size={16} />
      Download CV
    </a>
  ) : null;
}

// Rendered width: a 65px avatar on phones, up to 340px in the desktop hero.
const portraitSizes = "(max-width: 800px) 65px, 340px";

export function Portrait() {
  const [failed, setFailed] = useState(false);
  return (
    <div className="portrait-frame">
      {profile.photo && !failed ? (
        <picture>
          {["avif", "webp"].map((format) => (
            <source
              key={format}
              type={`image/${format}`}
              srcSet={[320, 640]
                .map(
                  (w) =>
                    `${profile.photo!.replace(/\.jpg$/, `-${w}.${format}`)} ${w}w`,
                )
                .join(", ")}
              sizes={portraitSizes}
            />
          ))}
          <img
            src={profile.photo}
            alt={`${profile.name}, ${profile.role}`}
            width="640"
            height="640"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            style={{ objectPosition: profile.photoPosition }}
            onError={() => setFailed(true)}
          />
        </picture>
      ) : (
        <div className="portrait-monogram" aria-label={profile.name}>
          <span aria-hidden="true">{profile.initials}</span>
          <p>Curiosity. Context. Craft.</p>
        </div>
      )}
    </div>
  );
}
export function SocialLinks() {
  return (
    <div className="socials">
      {profile.linkedin && (
        <a
          href={profile.linkedin}
          aria-label="LinkedIn"
          target="_blank"
          rel="noreferrer"
        >
          <Linkedin size={19} />
        </a>
      )}
      {profile.github && (
        <a
          href={profile.github}
          aria-label="GitHub"
          target="_blank"
          rel="noreferrer"
        >
          <Github size={19} />
        </a>
      )}
    </div>
  );
}
export function Contact() {
  return (
    <section id="contact" className="contact section">
      <div>
        <p className="eyebrow">LET’S CONNECT</p>
        <h2>Discuss an AI / ML opportunity.</h2>
        <p>Use your email app or open a message in Gmail.</p>
        {profile.email && (
          <p className="small">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            {" · "}
            <a
              className="text-link"
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}`}
              target="_blank"
              rel="noreferrer"
            >
              Open Gmail <ArrowUpRight size={14} />
            </a>
          </p>
        )}
      </div>
      <div className="contact-actions">
        <CVButton />
        {profile.email ? (
          <a className="button primary" href={`mailto:${profile.email}`}>
            <Mail size={17} />
            Email me
          </a>
        ) : (
          <Link className="button primary" to="/research">
            Explore my research <ArrowUpRight size={17} />
          </Link>
        )}
        <SocialLinks />
      </div>
    </section>
  );
}
export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="check-list">
      {items.map((item) => (
        <li key={item}>
          <Check size={16} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
export function FlagshipStages() {
  return (
    <ol className="flagship-stages" aria-label="From research to production">
      {flagship.stages.map((stage) => (
        <li key={stage.step}>
          <p className="eyebrow">
            {stage.step} / {stage.label.toUpperCase()}
          </p>
          <h3>{stage.title}</h3>
          <p className="stage-value">
            <strong>{stage.value}</strong>
            <span>{stage.valueLabel}</span>
          </p>
          <p>{stage.text}</p>
          <Link className="text-link" to={stage.to}>
            {stage.label} details <ArrowRight size={15} />
          </Link>
        </li>
      ))}
    </ol>
  );
}

// Proof figures count up once, the first time they are seen in a page load.
// The real value stays in the DOM (invisible while animating) so screen
// readers, copy and tests always see the final figure.
const countedUp = new Set<string>();
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [frame, setFrame] = useState<string | null>(null);
  useEffect(() => {
    const match = value.match(/\d+(?:\.\d+)?/);
    const element = ref.current;
    if (
      !match ||
      !element ||
      countedUp.has(value) ||
      !window.IntersectionObserver ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const target = Number(match[0]);
    const decimals = match[0].split(".")[1]?.length ?? 0;
    const [before, after] = [
      value.slice(0, match.index),
      value.slice(match.index! + match[0].length),
    ];
    let raf = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      countedUp.add(value);
      // The first frame sets the clock, so progress never starts below zero.
      let start: number | undefined;
      const tick = (now: number) => {
        start ??= now;
        const t = Math.min((now - start) / 600, 1);
        const eased = 1 - (1 - t) ** 3;
        if (t < 1) {
          setFrame(before + (target * eased).toFixed(decimals) + after);
          raf = requestAnimationFrame(tick);
        } else setFrame(null);
      };
      raf = requestAnimationFrame(tick);
    });
    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);
  return (
    <span className="count-up" ref={ref}>
      <span className={frame === null ? undefined : "count-up-final"}>
        {value}
      </span>
      {frame !== null && (
        <span className="count-up-frame" aria-hidden="true">
          {frame}
        </span>
      )}
    </span>
  );
}
