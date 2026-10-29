import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = [
  "/",
  "/projects/ran-anomaly-rca",
  "/projects/civil-code-rag",
  "/docs",
  "/research",
];

for (const width of [375, 768, 1280, 1440]) {
  for (const route of routes) {
    test(`${route} works at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toBeVisible();
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
      expect(await page.title()).toContain("Mahmoud Salakawy");
      await page.reload();
      await expect(page.locator("h1")).toBeVisible();
      const accessibility = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(accessibility.violations).toEqual([]);
      expect(errors).toEqual([]);
      if (route === "/" || (route.includes("/projects/") && width === 1280)) {
        await page.locator("img").evaluateAll(async (images) => {
          await Promise.all(images.map((image) => image.decode()));
        });
        await page.screenshot({
          path: `test-results/${route === "/" ? "home" : "case-study"}-${width}.png`,
          fullPage: true,
        });
      }
    });
  }
}

test("navigation, project details and documentation anchors", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "RAN Anomaly RCA" })
    .click();
  await expect(page).toHaveURL(/projects\/ran-anomaly-rca$/);
  await expect(
    page.getByRole("button", { name: "Open navigation" }),
  ).toHaveAttribute("aria-expanded", "false");
  await page.getByRole("link", { name: "Architecture notes" }).click();
  await expect(page).toHaveURL(/docs#architecture$/);
  await expect(page.locator("#architecture")).toBeInViewport();
  await page.getByRole("link", { name: "Mahmoud Salakawy home" }).click();
  await page
    .locator("#project-02")
    .getByText("Project details", { exact: true })
    .click();
  await expect(
    page.getByText(/A text classification pipeline using TF-IDF/),
  ).toBeVisible();
  await page.getByRole("link", { name: "Explore RAN Anomaly RCA" }).click();
  await expect(page.locator("h1")).toContainText("RAN Anomaly");
  await page.goto("/not-a-page");
  await expect(page.getByRole("link", { name: "Back to home" })).toBeVisible();
});

test("all rendered internal links resolve and sensitive claims stay absent", async ({
  page,
}) => {
  for (const route of routes) {
    await page.goto(route);
    const sourceUrl = page.url();
    const content = await page.locator("body").innerText();
    expect(content).not.toMatch(/Vodafone|VOIS|C2 General/);
    const links = await page
      .locator('a[href^="/"], a[href^="#"]')
      .evaluateAll((elements) => elements.map((e) => e.getAttribute("href")!));
    for (const link of links) {
      const target = new URL(link, sourceUrl);
      if (target.pathname.endsWith(".pdf")) {
        const response = await page.request.get(target.href);
        expect(response.ok()).toBe(true);
        expect((await response.body()).subarray(0, 5).toString()).toBe("%PDF-");
        continue;
      }
      expect(routes.includes(target.pathname)).toBe(true);
      if (target.hash) {
        await page.goto(target.pathname + target.hash);
        await expect(page.locator(target.hash)).toHaveCount(1);
      }
    }
  }
});

test("project filters and synthetic signal inspection work", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "GenAI & LLMs", exact: true }).click();
  await expect(page.locator(".project-card h3")).toHaveText([
    "Civil Code RAG",
    "Resume Screening Automation",
  ]);
  await page.getByRole("button", { name: "MLOps", exact: true }).click();
  await expect(page.locator(".project-card h3")).toHaveText([
    "Civil Code RAG",
    "CI Model-Quality Gate",
  ]);
  await page
    .getByRole("button", { name: "Machine learning", exact: true })
    .click();
  await expect(page.locator(".project-card")).toHaveCount(3);
  await page.getByRole("button", { name: "All projects", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(6);
  await page.goto("/projects/ran-anomaly-rca#detection");
  await expect(page.locator(".signal-inspector output")).toHaveText(
    "Outside range",
  );
  await page.getByRole("button", { name: "Normal", exact: true }).click();
  await expect(page.locator(".signal-inspector output")).toHaveText(
    "Within range",
  );
  await page.getByRole("button", { name: "Spike", exact: true }).click();
  await expect(page.locator(".signal-inspector output")).toHaveText(
    "Outside range",
  );
  await page.getByRole("slider", { name: "Inspect day" }).fill("1");
  await expect(page.locator(".signal-inspector output")).toHaveText(
    "Within range",
  );
  await page.setViewportSize({ width: 375, height: 812 });
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Open navigation" }),
  ).toHaveAttribute("aria-expanded", "false");
});

test("personal portrait, CV download, theme persistence and playback", async ({
  page,
}) => {
  await page.goto("/");
  const portrait = page.getByRole("img", {
    name: "Mahmoud Salakawy, AI & ML Engineer",
  });
  await portrait.scrollIntoViewIfNeeded();
  await expect(portrait).toBeVisible();
  expect(
    await portrait.evaluate(
      (image: HTMLImageElement) => image.complete && image.naturalWidth > 0,
    ),
  ).toBe(true);
  const downloadEvent = page.waitForEvent("download");
  await page.getByRole("link", { name: "Download CV" }).first().click();
  expect((await downloadEvent).suggestedFilename()).toBe(
    "mahmoud-salakawy-cv.pdf",
  );
  await expect(page.getByRole("link", { name: "Email me" })).toHaveAttribute(
    "href",
    "mailto:eng.salakawy@gmail.com",
  );
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  const accessibility = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(accessibility.violations).toEqual([]);
  await page.screenshot({
    path: "test-results/home-dark-1280.png",
    fullPage: true,
  });
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await page.goto("/projects/ran-anomaly-rca#detection");
  await page.getByRole("button", { name: "Play signal", exact: true }).click();
  const playbackBounds = await page.locator(".chart-play").boundingBox();
  expect(playbackBounds?.height).toBeLessThan(50);
  await expect(
    page.getByRole("button", { name: "Pause playback" }),
  ).toBeVisible();
  await expect(
    page.getByRole("slider", { name: "Inspect day" }),
  ).not.toHaveValue("34");
  await page.getByRole("button", { name: "Pause playback" }).click();
  const paused = await page
    .getByRole("slider", { name: "Inspect day" })
    .inputValue();
  await page.waitForTimeout(800);
  await expect(page.getByRole("slider", { name: "Inspect day" })).toHaveValue(
    paused,
  );
});

test("malformed anchors and blocked storage do not break the site", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new Error("Storage unavailable");
      },
    });
  });
  await page.goto("/#%E0%A4%A");
  await expect(page.locator("h1")).toBeVisible();
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  expect(errors).toEqual([]);
});

test("reduced motion remains readable and keyboard navigation works", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await expect(page.locator(".reveal-pending")).toHaveCount(0);
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main")).toBeFocused();
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page.getByRole("link", { name: "Work", exact: true }).click();
  await expect(page.locator("#selected-work")).toBeInViewport();
  await expect(
    page.getByRole("button", { name: "Open navigation" }),
  ).toHaveAttribute("aria-expanded", "false");
});

test("recruiter scan leads from identity and proof to flagship and technical depth", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await expect(page.locator(".hero-name")).toHaveText("Mahmoud Salakawy");
  await expect(page.locator("h1")).toContainText("AI & ML Engineer");
  await expect(
    page.getByRole("link", { name: "Explore RAN Anomaly RCA", exact: true }),
  ).toBeInViewport();
  await expect(
    page.getByRole("link", { name: "Download CV" }).first(),
  ).toBeInViewport();
  await expect(page.locator(".hero-intersection")).toContainText(
    "Time-Series ML",
  );
  await expect(page.locator(".chart")).toHaveCount(0);
  const sequence = await page
    .locator("#main > section")
    .evaluateAll((sections) =>
      sections.map((section) => section.id || section.className),
    );
  expect(sequence[0]).toBe("about");
  expect(sequence[1]).toContain("proof-strip");
  expect(sequence[2]).toBe("projects");
  expect(sequence[3]).toBe("selected-work");
  await expect(page.locator(".workflow li")).toHaveText([
    "01Network KPIs",
    "02Detect",
    "03Rank",
    "04Ground",
    "05Explain",
    "06Engineer decides",
  ]);
  await page.getByRole("link", { name: "Explore full case study" }).click();
  await expect(page.locator("h1")).toContainText("RAN Anomaly");
  await page.getByRole("link", { name: "Architecture notes" }).click();
  await expect(page.locator("#architecture")).toBeInViewport();
  await page.goto("/");
  await page.getByRole("link", { name: "Architecture & Docs" }).click();
  await expect(page).toHaveURL(/docs#architecture$/);
});

test("refined header stays calm, ordered and keyboard accessible at every breakpoint", async ({
  page,
}) => {
  for (const width of [375, 768, 1280, 1440]) {
    await page.setViewportSize({ width, height: 800 });
    await page.goto("/");
    const header = page.locator("header");
    const nav = page.getByRole("navigation", { name: "Main navigation" });
    await expect(header.locator(".brand-role")).toHaveCount(0);
    await expect(header).not.toContainText("AI & ML Engineer");
    expect((await header.boundingBox())!.height).toBeLessThanOrEqual(70);
    if (width <= 800) {
      await page.getByRole("button", { name: "Open navigation" }).click();
      await page.keyboard.press("Tab");
      await expect(
        nav.getByRole("link", { name: "RAN Anomaly RCA", exact: true }),
      ).toBeFocused();
      expect(
        (await nav.getByRole("link").allTextContents()).map((label) =>
          label.trim(),
        ),
      ).toEqual([
        "RAN Anomaly RCA",
        "Work",
        "Research",
        "Docs",
        "Download CV",
        "Contact",
      ]);
      await page.keyboard.press("Escape");
      await expect(
        page.getByRole("button", { name: "Open navigation" }),
      ).toBeFocused();
      await expect(nav).toBeHidden();
    } else {
      expect(
        (await nav.getByRole("link").allTextContents()).map((label) =>
          label.trim(),
        ),
      ).toEqual(["Work", "RAN Anomaly RCA", "Research", "Docs", "Download CV"]);
      const bounds = await nav.getByRole("link").evaluateAll((links) =>
        links.map((link) => {
          const rect = link.getBoundingClientRect();
          return rect.top + rect.height / 2;
        }),
      );
      expect(Math.max(...bounds) - Math.min(...bounds)).toBeLessThan(3);
      await expect(page.locator("h1")).toBeInViewport();
      await expect(page.locator(".hero-actions")).toBeInViewport();
    }
    expect(
      (await page.locator("main").innerText()).match(/91\.27%/g),
    ).toHaveLength(1);
    await expect(page.locator(".portrait-caption")).toHaveCount(0);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  await page.goto("/research");
  await expect(
    page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: "Research", exact: true }),
  ).toHaveAttribute("aria-current", "page");
});

test("engineering case study exposes anchors and a responsive verified summary", async ({
  page,
}) => {
  test.setTimeout(60000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  const labels = [
    "Overview",
    "Architecture",
    "Detection",
    "Grounded RCA",
    "Evidence",
    "Limitations",
  ];
  for (const width of [375, 768, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/projects/ran-anomaly-rca");
    const summary = page.getByRole("complementary", { name: "At a glance" });
    await expect(summary).toBeVisible();
    await expect(summary.locator("dt")).toHaveText([
      "Project",
      "Domain",
      "Core approach",
      "Trust principle",
      "Decision model",
      "Research",
    ]);
    await expect(summary).toContainText("Evidence before explanation");
    const intro = await page.locator(".case-introduction").boundingBox();
    const panel = await summary.boundingBox();
    if (width > 800) expect(panel!.x).toBeGreaterThan(intro!.x + intro!.width);
    else expect(panel!.y).toBeGreaterThanOrEqual(intro!.y + intro!.height);
    const sections = page.getByRole("navigation", {
      name: "Case study sections",
    });
    await expect(sections.getByRole("link")).toHaveText(labels);
    for (const label of labels) {
      const link = sections.getByRole("link", { name: label, exact: true });
      const target = await link.getAttribute("href");
      await link.click();
      await expect(page.locator(`${target} h2`).first()).toBeInViewport();
      await expect(link).toHaveAttribute("aria-current", "location");
    }
    await expect(page.locator("#detection .chart")).toBeVisible();
    await expect(page.locator("#grounded-rca .check-list")).toBeVisible();
    await expect(page.locator("#limitations .case-planned")).toBeVisible();
    await page.screenshot({
      path: `test-results/engineering-case-${width}.png`,
      fullPage: true,
    });
  }
});

test("homepage cards stay concise with engineering detail behind disclosure", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.locator("#projects .transformation-grid > div"),
  ).toHaveCount(3);
  await expect(
    page.locator("#projects .signal-demo, #projects .chart"),
  ).toHaveCount(0);
  await expect(page.locator("#projects .flagship-actions a")).toHaveCount(2);
  for (const card of await page.locator(".project-card").all()) {
    await expect(card.locator(".project-purpose")).toBeVisible();
    await expect(card.locator(".tags > span")).toHaveCount(3);
    await expect(card.locator(".project-summary")).toBeHidden();
    expect((await card.boundingBox())!.height).toBeLessThan(420);
    await card.getByText("Project details", { exact: true }).click();
    await expect(card.locator(".project-summary")).toBeVisible();
    await card.getByText("Project details", { exact: true }).click();
  }
});

test("implemented capabilities and future work stay visibly distinct", async ({
  page,
}) => {
  await page.goto("/projects/ran-anomaly-rca");
  const detectionStatus = page.locator("#detection .status");
  const rcaStatus = page.locator("#grounded-rca .status");
  const future = page.locator("#limitations .case-planned");
  const futureStatus = future.locator(".status");
  await expect(detectionStatus).toHaveText("IMPLEMENTED / DETECTION WORK");
  await expect(rcaStatus).toHaveText("IMPLEMENTED / RCA PROTOTYPE");
  await expect(futureStatus).toHaveText("PLANNED / NOT IMPLEMENTED");
  await expect(future).toContainText("LSTM autoencoders");
  await expect(page.locator("#detection")).not.toContainText(
    "LSTM autoencoders",
  );
  await expect(page.locator("#grounded-rca")).not.toContainText(
    "LSTM autoencoders",
  );
  for (const theme of ["light", "dark"]) {
    if (theme === "dark")
      await page.getByRole("button", { name: "Switch to dark theme" }).click();
    await expect(futureStatus).toBeVisible();
    const implemented = await detectionStatus.evaluate((element) => {
      const style = getComputedStyle(element);
      return { color: style.color, background: style.backgroundColor };
    });
    const planned = await futureStatus.evaluate((element) => {
      const style = getComputedStyle(element);
      return { color: style.color, background: style.backgroundColor };
    });
    expect(implemented.color).not.toBe(planned.color);
    expect(implemented.background).not.toBe(planned.background);
  }
});

test("every project is listed and Civil Code RAG has a full case study", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".project-card h3")).toHaveText([
    "Civil Code RAG",
    "IT Ticket Classification",
    "5G QoS Classification",
    "Voice Call QoE Prediction",
    "Resume Screening Automation",
    "CI Model-Quality Gate",
  ]);
  await expect(
    page.getByRole("link", { name: "Civil Code RAG source on GitHub" }),
  ).toHaveAttribute(
    "href",
    "https://github.com/MahmoudAmgad88/civil-code-rag-mlops",
  );
  await page
    .locator("#skills")
    .getByRole("link", { name: "Voice Call QoE Prediction" })
    .click();
  await expect(page.locator("#project-04")).toBeInViewport();
  await page
    .locator("#project-01")
    .getByRole("link", { name: "Case study" })
    .click();
  await expect(page).toHaveURL(/projects\/civil-code-rag$/);
  await expect(page.locator("h1")).toContainText("Civil Code RAG");
  const sections = page.getByRole("navigation", {
    name: "Case study sections",
  });
  await expect(sections.getByRole("link")).toHaveText([
    "Overview",
    "Architecture",
    "Guardrails",
    "MLOps",
    "Evidence",
    "Limitations",
  ]);
  await expect(page.locator("#guardrails .check-list li")).toHaveCount(5);
  await expect(page.locator("main")).toContainText("Not legal advice");
});
