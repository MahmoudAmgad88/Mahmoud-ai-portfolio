// Page metadata shared by the app (client-side titles) and scripts/prepare-pages.mjs
// (static head tags for link previews). Plain data only: Node loads this file
// directly, so it must not import Vite-only modules or use import.meta.env.

export const siteUrl = "https://mahmoudamgad88.github.io/Mahmoud-ai-portfolio";
export const siteName = "Mahmoud Salakawy";
export const ogImage = {
  path: "og-image.jpg",
  width: 1200,
  height: 630,
  alt: "Mahmoud Salakawy, AI & ML Engineer: I build ML and GenAI systems that hold up in production.",
};

export type PageMeta = {
  title: string;
  description: string;
  /** Canonical path when it differs from the route (redirected routes). */
  canonical?: string;
  /** Listed in sitemap.xml. */
  indexed: boolean;
};

export const pages: Record<string, PageMeta> = {
  "/": {
    title: "Mahmoud Salakawy | AI & ML Engineer",
    description:
      "AI & ML Engineer building ML and GenAI systems that hold up in production: a peer-reviewed anomaly-detection method running in two countries, plus grounded RAG, ML APIs and MLOps.",
    indexed: true,
  },
  "/projects/ran-anomaly-rca": {
    title: "RAN Anomaly RCA: Research → Production → GenAI | Mahmoud Salakawy",
    description:
      "A peer-reviewed RAN anomaly-detection method, the production tool that runs it in two countries, and the GenAI Telecom Copilot that explains what it finds.",
    indexed: true,
  },
  "/projects/civil-code-rag": {
    title: "Civil Code RAG | Mahmoud Salakawy",
    description:
      "A bilingual Arabic/English RAG service with citation validation, taken from notebook to a tested, versioned and containerised API.",
    indexed: true,
  },
  "/research": {
    title: "Research | Mahmoud Salakawy",
    description:
      "Published research on policy-calibrated forecast intervals for radio access network anomaly detection.",
    indexed: true,
  },
  "/docs": {
    title: "Documentation | Mahmoud Salakawy",
    description:
      "Architecture, conceptual user guide, technical notes and limitations for the RAN Anomaly RCA case study.",
    indexed: true,
  },
  // Merged into the flagship; kept so shared links still resolve.
  "/projects/ran-kpi-anomaly-detection": {
    title: "RAN Anomaly RCA: Research → Production → GenAI | Mahmoud Salakawy",
    description:
      "How a peer-reviewed anomaly-detection method became a production tool for RAN engineering teams in two countries.",
    canonical: "/projects/ran-anomaly-rca",
    indexed: false,
  },
};

/** Absolute URL for a route path, with the trailing slash GitHub Pages serves. */
export const absoluteUrl = (path: string) =>
  siteUrl + (path === "/" ? "/" : `${path}/`);

export const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mahmoud Salakawy",
  url: absoluteUrl("/"),
  image: `${siteUrl}/mahmoud-salakawy.jpg`,
  jobTitle: "AI & ML Engineer",
  description: pages["/"].description,
  email: "mailto:eng.salakawy@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cairo",
    addressCountry: "EG",
  },
  worksFor: {
    "@type": "Organization",
    name: "Vodafone Intelligent Solutions (_VOIS)",
  },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Cairo University" },
  knowsAbout: [
    "Machine learning",
    "Time-series anomaly detection",
    "Retrieval-augmented generation",
    "MLOps",
    "Telecom radio access networks",
  ],
  sameAs: [
    "https://www.linkedin.com/in/mahmoud-salakawy-msc-7b412b92/",
    "https://github.com/MahmoudAmgad88",
  ],
  // The paper identifies work, not the person, so it is linked as authored
  // work rather than listed in sameAs.
  subjectOf: {
    "@type": "ScholarlyArticle",
    name: "Policy-Calibrated Forecast Intervals for Anomaly Detection in Radio Access Mobile Network",
    url: "https://doi.org/10.21608/jicds.2026.457039.1026",
    datePublished: "2026",
    author: { "@type": "Person", name: "M. A. ElSalakawy" },
  },
};
