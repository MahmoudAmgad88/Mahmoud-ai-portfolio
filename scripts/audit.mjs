import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";

const origin = "http://127.0.0.1:4175";
const server = spawn(
  process.execPath,
  [
    "node_modules/vite/bin/vite.js",
    "preview",
    "--host",
    "127.0.0.1",
    "--port",
    "4175",
    "--strictPort",
  ],
  { stdio: "ignore", windowsHide: true },
);
let chrome;
try {
  let ready = false;
  for (let attempt = 0; attempt < 40; attempt++) {
    try {
      ready = (await fetch(origin)).ok;
    } catch {
      /* Server is starting. */
    }
    if (ready) break;
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  if (!ready) throw new Error("Preview server did not start.");
  chrome = await launch({
    chromeFlags: ["--headless", "--disable-gpu", "--no-first-run"],
  });
  await mkdir("test-results", { recursive: true });
  for (const path of ["/", "/projects/ran-anomaly-rca", "/docs", "/research"]) {
    const result = await lighthouse(origin + path, {
      port: chrome.port,
      output: "json",
      logLevel: "error",
      onlyCategories: ["performance", "accessibility"],
    });
    if (!result) throw new Error(`No audit result for ${path}`);
    const scores = Object.fromEntries(
      Object.entries(result.lhr.categories).map(([key, category]) => [
        key,
        Math.round(category.score * 100),
      ]),
    );
    console.log(JSON.stringify({ path, ...scores }));
    await writeFile(
      `test-results/lighthouse-${path === "/" ? "home" : path.split("/").pop()}.json`,
      result.report,
    );
    if (scores.performance < 85 || scores.accessibility < 90)
      process.exitCode = 1;
  }
} finally {
  await chrome?.kill();
  server.kill();
}
