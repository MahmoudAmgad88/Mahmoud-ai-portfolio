import React, { Suspense, lazy, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";
import "@fontsource/jetbrains-mono/latin-400.css";
import "./styles.css";
import "./refinements.css";
import "./portfolio.css";
import { PageEnhancements, ThemeToggle } from "./enhancements";
import { flagship, meta, navigation, profile } from "./content/site";
import { absoluteUrl } from "./content/seo";
import { CVButton, SocialLinks } from "./components";
import Home from "./pages/Home";

// Home ships in the main bundle; deeper pages load on first visit.
const CaseStudy = lazy(() => import("./pages/CaseStudy"));
const CivilCodeRag = lazy(() => import("./pages/CivilCodeRag"));
const Docs = lazy(() => import("./pages/Docs"));
const Research = lazy(() => import("./pages/Research"));

function RouteEffects() {
  const { pathname, hash, key } = useLocation();
  const previousPath = useRef(pathname);
  useEffect(() => {
    const routeChanged = previousPath.current !== pathname;
    previousPath.current = pathname;
    const route = pathname.replace(/\/+$/, "") || "/";
    const page = meta[route] ?? {
      title: `Page not found | ${profile.name}`,
      description: "Find your way back to the portfolio.",
    };
    document.title = page.title;
    const set = (selector: string, attribute: string, value: string) =>
      document.querySelector(selector)?.setAttribute(attribute, value);
    set('meta[name="description"]', "content", page.description);
    set('meta[property="og:title"]', "content", page.title);
    set('meta[property="og:description"]', "content", page.description);
    set('meta[name="twitter:title"]', "content", page.title);
    set('meta[name="twitter:description"]', "content", page.description);
    if (meta[route]) {
      const url = absoluteUrl(meta[route].canonical ?? route);
      set('link[rel="canonical"]', "href", url);
      set('meta[property="og:url"]', "content", url);
    }
    let observer: MutationObserver | undefined;
    const timer = window.setTimeout(() => {
      if (hash) {
        let id = hash.slice(1);
        try {
          id = decodeURIComponent(id);
        } catch {
          /* Invalid URL escapes are treated as literal anchors. */
        }
        const target = document.getElementById(id);
        if (target) target.scrollIntoView();
        else {
          // A lazy page may not have rendered yet; scroll once the anchor exists.
          observer = new MutationObserver(() => {
            const late = document.getElementById(id);
            if (!late) return;
            observer?.disconnect();
            late.scrollIntoView();
          });
          observer.observe(document.getElementById("main")!, {
            childList: true,
            subtree: true,
          });
          window.setTimeout(() => observer?.disconnect(), 5000);
        }
      } else {
        window.scrollTo(0, 0);
        if (routeChanged)
          document.getElementById("main")?.focus({ preventScroll: true });
      }
    }, 0);
    return () => {
      window.clearTimeout(timer);
      observer?.disconnect();
    };
  }, [pathname, hash, key]);
  return null;
}
function Header() {
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(
    () => window.matchMedia("(max-width: 800px)").matches,
  );
  const toggle = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  const location = useLocation();
  useEffect(() => setOpen(false), [location]);
  useEffect(() => {
    const breakpoint = window.matchMedia("(max-width: 800px)");
    const update = () => {
      setMobile(breakpoint.matches);
      setOpen(false);
    };
    breakpoint.addEventListener("change", update);
    return () => breakpoint.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open]);
  const items = mobile
    ? [...navigation].sort((a, b) => a.mobileOrder - b.mobileOrder)
    : navigation;
  return (
    <header
      className="header portfolio-header"
      ref={header}
      onBlur={(event) => {
        if (
          event.relatedTarget &&
          !event.currentTarget.contains(event.relatedTarget as Node)
        )
          setOpen(false);
      }}
    >
      <div className="header-inner">
        <Link to="/" className="brand" aria-label={`${profile.name} home`}>
          <span className="monogram" aria-hidden="true">
            {profile.initials}
          </span>
          <span>{profile.name}</span>
        </Link>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="main-navigation"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav
          id="main-navigation"
          className={open ? "nav open" : "nav"}
          aria-label="Main navigation"
        >
          {items.map((item) => {
            const [path, hash] = item.to.split("#");
            const active =
              (location.pathname.replace(/\/+$/, "") || "/") === path &&
              (hash ? location.hash === `#${hash}` : true);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`${item.featured ? "nav-flagship" : ""}${active ? " current" : ""}`}
                aria-current={active ? (hash ? "location" : "page") : undefined}
              >
                {item.label}
              </Link>
            );
          })}
          <CVButton compact />
          {mobile && (
            <Link className="nav-contact-mobile" to="/#contact">
              Contact <ArrowUpRight size={13} />
            </Link>
          )}
        </nav>
        <div className="header-controls">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

function NotFound() {
  return (
    <div className="page-intro not-found">
      <p className="eyebrow">404 / PAGE NOT FOUND</p>
      <h1>
        A little off course<span>.</span>
      </h1>
      <p>This page doesn’t exist. The portfolio is a good place to start.</p>
      <Link className="button primary" to="/">
        Back to home
        <ArrowRight size={17} />
      </Link>
    </div>
  );
}
function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <RouteEffects />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <PageEnhancements />
      <main id="main" className="container" tabIndex={-1}>
        <Suspense fallback={<div className="route-loading" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects/ran-anomaly-rca" element={<CaseStudy />} />
            <Route path="/projects/civil-code-rag" element={<CivilCodeRag />} />
            {/* Merged into the flagship; old shared links land on its production section. */}
            <Route
              path="/projects/ran-kpi-anomaly-detection"
              element={<Navigate to={`${flagship.route}#production`} replace />}
            />
            <Route path="/docs" element={<Docs />} />
            <Route path="/research" element={<Research />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <footer>
        <div className="container footer-inner">
          <div>
            <Link to="/" className="footer-name">
              {profile.name}
            </Link>
            <p>Applied machine learning. Grounded in engineering.</p>
          </div>
          <div className="footer-right">
            <SocialLinks />
            <Link to="/#contact">
              Contact
              <ArrowUpRight size={14} />
            </Link>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>
    </BrowserRouter>
  );
}
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
