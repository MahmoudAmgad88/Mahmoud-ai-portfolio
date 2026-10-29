import { expect, test } from "@playwright/test";

test("GitHub Pages subpath supports assets, direct routes and anchors", async ({
  page,
  request,
}) => {
  const base = process.env.PAGES_BASE_PATH;
  test.skip(!base, "Run with PAGES_BASE_PATH against a matching Pages build.");
  const prefix = base!;
  for (const route of ["", "projects/ran-anomaly-rca/", "docs/", "research/"]) {
    const response = await page.goto(prefix + route);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toBeVisible();
    expect(await page.title()).not.toContain("Page not found");
    await page.reload();
    await expect(page.locator("h1")).toBeVisible();
  }
  await page.goto(prefix);
  const image = page.getByRole("img", {
    name: "Mahmoud Salakawy, AI & ML Engineer",
  });
  await expect(image).toHaveAttribute("src", prefix + "mahmoud-salakawy.jpg");
  await image.evaluate((element: HTMLImageElement) => element.decode());
  expect(
    await image.evaluate(
      (element: HTMLImageElement) =>
        element.complete && element.naturalWidth > 0,
    ),
  ).toBe(true);
  const cv = page
    .getByRole("link", { name: "Download CV", exact: true })
    .first();
  await expect(cv).toHaveAttribute("href", prefix + "mahmoud-salakawy-cv.pdf");
  const pdf = await request.get(prefix + "mahmoud-salakawy-cv.pdf");
  expect((await pdf.body()).subarray(0, 5).toString()).toBe("%PDF-");
  await page
    .getByRole("link", { name: "Explore full case study", exact: true })
    .click();
  await expect(page).toHaveURL(
    new RegExp(prefix + "projects/ran-anomaly-rca$"),
  );
  await page
    .getByRole("link", { name: "Architecture notes", exact: true })
    .click();
  await expect(page.locator("#architecture")).toBeInViewport();
  expect(page.url()).toContain(prefix + "docs#architecture");
  const script = await page
    .locator('script[type="module"]')
    .getAttribute("src");
  expect(script).toMatch(new RegExp("^" + prefix + "assets/"));
  expect((await request.get(script!)).status()).toBe(200);
});
