// Renders public/og-image.jpg (1200x630), the link-preview image for every route.
// Run with `npm run og-image` after changing the headline or portrait.
import { readFile } from "node:fs/promises";
import { chromium } from "@playwright/test";

const dataUri = async (path, type) =>
  `data:${type};base64,${(await readFile(path)).toString("base64")}`;
const font = (weight) =>
  dataUri(
    `node_modules/@fontsource/inter/files/inter-latin-${weight}-normal.woff2`,
    "font/woff2",
  );
const [inter500, inter600, mono, photo] = await Promise.all([
  font(500),
  font(600),
  dataUri(
    "node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2",
    "font/woff2",
  ),
  dataUri("public/mahmoud-salakawy-640.webp", "image/webp"),
]);

const html = `<!doctype html>
<style>
  @font-face { font-family: Inter; font-weight: 500; src: url(${inter500}); }
  @font-face { font-family: Inter; font-weight: 600; src: url(${inter600}); }
  @font-face { font-family: Mono; src: url(${mono}); }
  * { margin: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px; overflow: hidden;
    display: grid; grid-template-columns: 1fr 360px; gap: 64px;
    align-items: center; padding: 64px 72px;
    font-family: Inter; color: #253c34;
    background: radial-gradient(circle at 85% 20%, #e3ece1, #f7f5ef 60%);
  }
  .brand { display: flex; align-items: center; gap: 14px; font-weight: 600; font-size: 30px; }
  .brand span { font: 30px Mono; color: #28634d; }
  h1 { margin: 40px 0 0; font-weight: 600; font-size: 50px; line-height: 1.12; letter-spacing: -1.5px; }
  h1 em { font-style: normal; color: #28634d; }
  p { margin-top: 36px; font: 20px Mono; color: #a65b3c; letter-spacing: 1px; }
  img { width: 360px; height: 420px; object-fit: cover; object-position: center 30%;
        border-radius: 22px 22px 22px 90px; box-shadow: 0 24px 60px #253c3426; }
</style>
<body>
  <div>
    <div class="brand"><span>MS</span> Mahmoud Salakawy</div>
    <h1>AI &amp; ML Engineer.<br /><em>I build ML and GenAI systems that hold up in production.</em></h1>
    <p>GENAI · FORECASTING · ANOMALY DETECTION · MLOPS</p>
  </div>
  <img src="${photo}" alt="" />
</body>`;

const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: "public/og-image.jpg", quality: 90 });
await browser.close();
console.log("Wrote public/og-image.jpg");
