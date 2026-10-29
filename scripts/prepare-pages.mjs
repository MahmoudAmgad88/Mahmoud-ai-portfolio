import { copyFile, mkdir, writeFile } from "node:fs/promises";

// GitHub Pages has no SPA rewrite rule. Each public route gets a real HTML entry.
for (const route of [
  "projects/ran-anomaly-rca",
  "projects/civil-code-rag",
  "projects/ran-kpi-anomaly-detection",
  "docs",
  "research",
]) {
  await mkdir(`dist/${route}`, { recursive: true });
  await copyFile("dist/index.html", `dist/${route}/index.html`);
}
await copyFile("dist/index.html", "dist/404.html");
await writeFile("dist/.nojekyll", "");
