import { expect, test } from "@playwright/test";

test("Contact scrolls from another page and on repeated mobile navigation", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/docs");
  for (let attempt = 0; attempt < 2; attempt++) {
    await page.getByRole("button", { name: "Open navigation" }).click();
    await page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: "Contact", exact: true })
      .click();
    await expect(page.locator("#contact")).toBeInViewport();
    await expect(page).toHaveURL(/\/#contact$/);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  }
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/research");
  await page
    .locator("footer")
    .getByRole("link", { name: "Contact", exact: true })
    .click();
  await expect(page.locator("#contact")).toBeInViewport();
});

test("contact offers a valid email app link and browser compose alternative", async ({
  page,
}) => {
  await page.goto("/#contact");
  const contact = page.locator("#contact");
  await expect(
    contact.getByRole("link", { name: "Email me", exact: true }),
  ).toHaveAttribute("href", "mailto:eng.salakawy@gmail.com");
  await expect(
    contact.getByRole("link", { name: "eng.salakawy@gmail.com", exact: true }),
  ).toBeVisible();
  const gmail = contact.getByRole("link", { name: "Open Gmail", exact: true });
  const target = new URL((await gmail.getAttribute("href"))!);
  expect(target.origin).toBe("https://mail.google.com");
  expect(target.searchParams.get("view")).toBe("cm");
  expect(target.searchParams.get("to")).toBe("eng.salakawy@gmail.com");
  await expect(gmail).toHaveAttribute("target", "_blank");
});
