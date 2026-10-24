# Mahmoud Salakawy — AI/ML Portfolio

A personal engineering portfolio showcasing telecom AI, machine learning, grounded GenAI, research, and selected projects.

## About

The site introduces Mahmoud's telecom RAN experience and AI/ML engineering work, with a recruiter-focused homepage and dedicated case-study, research, and technical documentation pages.

## Featured Case Study

**RAN Anomaly RCA** connects time-series anomaly-detection research with a separate grounded root-cause analysis prototype. The case study explains architecture, evidence handling, engineering review, and limitations; it does not claim that every component forms one production deployment.

## Tech Stack

- React and TypeScript
- Vite and Tailwind CSS
- React Router and Lucide React
- Locally bundled Inter and JetBrains Mono fonts

## Local Development

Use Node.js 22.19 or later.

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

## Verification

With Google Chrome installed, run the browser checks against a production build:

```bash
npm run build
npm run test:smoke
```

The tests cover routes, responsive navigation, accessibility, CV downloads, themes, and key interactions. Optional mobile Lighthouse checks are available through `npm run audit`. Generated reports remain local and are excluded from Git.

## Project Structure

```text
src/
  content/         Public profile, project, research, and documentation data
  pages/           Homepage, engineering case study, research, and docs
  components.tsx   Shared controls and synthetic diagrams
  enhancements.tsx Theme and scrolling utilities
  *.css            Base styles, presentation refinements, and theme tokens
public/            Public CV, portrait, favicon, and Apache rewrite rules
tests/             Playwright browser checks
scripts/           Optional Lighthouse audit
```

## Deployment

GitHub Pages is deployed by `.github/workflows/pages.yml` when `main` changes. The workflow builds under `/Mahmoud-ai-portfolio/` and generates HTML entry files for direct route loading and refresh. Only `dist/` is uploaded; private originals and source planning files are excluded.

The published URL is https://MahmoudAmgad88.github.io/Mahmoud-ai-portfolio/.

For other static hosting, `npm run build` still defaults to the domain root. Deploy `dist/`, including `.htaccess` on Apache. To build for another subdirectory, set `VITE_BASE_PATH` with leading and trailing slashes.

## Privacy / Content

Examples and visualizations use public or synthetic information. Employer-confidential material, operational datasets, internal application source, private documents, and credentials are excluded. The downloadable CV contains public portfolio content; original personal documents are not tracked.
