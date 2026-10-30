import { useEffect, useState } from "react";
import { ArrowUp, Moon, Sun } from "lucide-react";
import { useLocation } from "react-router-dom";

export function ThemeToggle() {
  const [dark, setDark] = useState(
    () => document.documentElement.dataset.theme === "dark",
  );
  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", next ? "#19221e" : "#f7f5ef");
    try {
      localStorage.setItem("portfolio-theme", next ? "dark" : "light");
    } catch {
      /* Theme remains usable without storage. */
    }
  }
  return (
    <button
      className="theme-toggle"
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      title={dark ? "Light theme" : "Dark theme"}
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}

// Elements that fade up once as they first scroll into view.
const revealTargets =
  ".section-heading, .featured-card, .project-card, .more-projects, .experience-list, .skill-map, .paper-teaser, .contact, .publication, .case-section";

export function PageEnhancements() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setScrolled(window.scrollY > 600));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
    };
  }, [pathname]);
  useEffect(() => {
    const main = document.getElementById("main");
    // A page opened at an anchor shows its content at once: the visitor asked
    // for that section, so it should not fade in after the jump.
    if (
      !main ||
      window.location.hash ||
      !window.IntersectionObserver ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const seen = new WeakSet<Element>();
    const pending = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("reveal-pending");
            pending.delete(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 },
    );
    // Only content that starts below the fold is hidden, so nothing visible
    // on load ever blinks.
    const scan = () =>
      main.querySelectorAll(revealTargets).forEach((element) => {
        if (seen.has(element)) return;
        seen.add(element);
        if (element.getBoundingClientRect().top > window.innerHeight) {
          element.classList.add("reveal-pending");
          pending.add(element);
          observer.observe(element);
        }
      });
    scan();
    // Lazily loaded pages render after this effect; pick them up when they do.
    const mutations = new MutationObserver(scan);
    mutations.observe(main, { childList: true, subtree: true });
    return () => {
      mutations.disconnect();
      observer.disconnect();
      pending.forEach((element) => element.classList.remove("reveal-pending"));
    };
  }, [pathname]);
  return scrolled ? (
    <button
      className="back-top"
      aria-label="Back to top"
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "instant"
            : "smooth",
        });
        document.getElementById("main")?.focus({ preventScroll: true });
      }}
    >
      <ArrowUp size={20} />
    </button>
  ) : null;
}
