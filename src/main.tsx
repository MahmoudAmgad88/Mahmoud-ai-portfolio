import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Link,
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
import { meta, navigation, profile } from "./content/site";
import { CVButton, SocialLinks } from "./components";
import Home from "./pages/Home";
import CaseStudy from "./pages/CaseStudy";
import CivilCodeRag from "./pages/CivilCodeRag";
import Docs from "./pages/Docs";
import Research from "./pages/Research";

function RouteEffects() {
  const { pathname, hash, key } = useLocation();
  const previousPath = useRef(pathname);
  useEffect(() => {
    const routeChanged = previousPath.current !== pathname;
    previousPath.current = pathname;
    const page = meta[pathname.replace(/\/+$/, "") || "/"] ?? {
      title: `Page not found | ${profile.name}`,
      description: "Find your way back to the portfolio.",
    };
    document.title = page.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", page.description);
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", page.title);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", page.description);
    const timer = window.setTimeout(() => {
      if (hash) {
        let id = hash.slice(1);
        try {
          id = decodeURIComponent(id);
        } catch {
          /* Invalid URL escapes are treated as literal anchors. */
        }
        document.getElementById(id)?.scrollIntoView();
      } else {
        window.scrollTo(0, 0);
        if (routeChanged)
          document.getElementById("main")?.focus({ preventScroll: true });
      }
    }, 0);
    return () => window.clearTimeout(timer);
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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/ran-anomaly-rca" element={<CaseStudy />} />
          <Route path="/projects/civil-code-rag" element={<CivilCodeRag />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/research" element={<Research />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
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
