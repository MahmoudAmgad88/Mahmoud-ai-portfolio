import { mkdir, readFile, writeFile } from "node:fs/promises";
import {
  absoluteUrl,
  ogImage,
  pages,
  person,
  siteName,
  siteUrl,
} from "../src/content/seo.ts";

// GitHub Pages has no SPA rewrite rule. Each public route gets a real HTML
// entry, with its own title, description, canonical URL and link-preview tags
// so shared links show the right page without running JavaScript.
const template = await readFile("dist/index.html", "utf8");
const seoBlock = /<!-- seo:start[\s\S]*?<!-- seo:end -->/;
if (!seoBlock.test(template)) throw new Error("index.html has no seo block");

const escape = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

function headTags(route, page) {
  const url = absoluteUrl(page.canonical ?? route);
  const image = `${siteUrl}/${ogImage.path}`;
  const tags = [
    `<title>${escape(page.title)}</title>`,
    `<meta name="description" content="${escape(page.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${route === "/" ? "website" : "article"}" />`,
    `<meta property="og:site_name" content="${siteName}" />`,
    `<meta property="og:title" content="${escape(page.title)}" />`,
    `<meta property="og:description" content="${escape(page.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="${ogImage.width}" />`,
    `<meta property="og:image:height" content="${ogImage.height}" />`,
    `<meta property="og:image:alt" content="${escape(ogImage.alt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escape(page.title)}" />`,
    `<meta name="twitter:description" content="${escape(page.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<meta name="twitter:image:alt" content="${escape(ogImage.alt)}" />`,
  ];
  if (route === "/")
    tags.push(
      `<script type="application/ld+json">${JSON.stringify(person).replace(/</g, "\\u003c")}</script>`,
    );
  return tags.join("\n    ");
}

for (const [route, page] of Object.entries(pages)) {
  const html = template.replace(seoBlock, headTags(route, page));
  const dir = route === "/" ? "dist" : `dist${route}`;
  await mkdir(dir, { recursive: true });
  await writeFile(`${dir}/index.html`, html);
}

// Unknown paths: keep the app (it renders "not found") but out of search results.
await writeFile(
  "dist/404.html",
  template.replace(
    seoBlock,
    `<title>Page not found | ${siteName}</title>\n    <meta name="robots" content="noindex" />`,
  ),
);

const today = new Date().toISOString().slice(0, 10);
await writeFile(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Object.entries(pages)
  .filter(([, page]) => page.indexed)
  .map(
    ([route]) =>
      `  <url><loc>${absoluteUrl(route)}</loc><lastmod>${today}</lastmod></url>`,
  )
  .join("\n")}
</urlset>
`,
);
// Crawlers only read robots.txt at a domain root. This copy takes effect if the
// site is served from a root (for example a custom domain); on the GitHub
// project path, submit sitemap.xml in Google Search Console instead.
await writeFile(
  "dist/robots.txt",
  `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
);
await writeFile("dist/.nojekyll", "");
