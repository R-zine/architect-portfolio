import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import type { Locator, Page } from "@playwright/test";

async function waitForSettledPage(page: Page): Promise<void> {
  await page.locator("main").first().waitFor({ state: "attached" });
  await page.waitForFunction(() => {
    let element = document.querySelector("main");
    if (!element) return false;

    while (element) {
      if (Number.parseFloat(getComputedStyle(element).opacity) < 0.99) {
        return false;
      }
      element = element.parentElement;
    }
    return [...document.querySelectorAll(".icon-cont")].every(
      (contact) => Number.parseFloat(getComputedStyle(contact).opacity) >= 0.99,
    );
  });
}

test("navigation, deep links, and image modal work", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Buildings" })).toBeVisible();
  await expect(page.locator("body")).toHaveCSS(
    "background-color",
    "rgb(31, 31, 32)",
  );
  await page.getByRole("button", { name: "Toggle menu" }).click();
  await page.getByRole("link", { name: "Buildings" }).click();
  await expect(page).toHaveURL(/\/gallery\/buildings$/);
  await expect(page.locator("body")).toHaveCSS(
    "background-color",
    "rgb(31, 31, 32)",
  );

  await page.getByRole("button", { name: "Seaside House in Sozopol" }).click();
  await expect(page).toHaveURL(/\/gallery\/sozopol$/);
  await page.reload();
  await expect(
    page.getByRole("region", { name: "Seaside House in Sozopol" }),
  ).toBeVisible();

  await page
    .getByRole("button", { name: "Open portfolio image" })
    .first()
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();
});

test("contact links are semantic and safe", async ({ page }) => {
  await page.goto("/contact");
  await expect(
    page.getByRole("link", { name: /globalarh@abv.bg/ }),
  ).toHaveAttribute("href", "mailto:globalarh@abv.bg");
  await expect(
    page.getByRole("link", { name: /diana-radeva/ }),
  ).toHaveAttribute("rel", /noopener/);
});

test("@desktop-only contact details are centered in the footer band", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1_920, height: 1_080 });
  await page.goto("/contact");
  await page.locator(".icons").waitFor({ state: "attached" });

  const geometry = await page.evaluate(() => {
    const details = document.querySelector(".icons")!.getBoundingClientRect();
    const firstLink = document
      .querySelector(".icon-cont a")!
      .getBoundingClientRect();
    const footer = document
      .querySelector(".footer-banner")!
      .getBoundingClientRect();

    return {
      detailsBottom: details.bottom,
      detailsTop: details.top,
      firstLinkCenter: (firstLink.top + firstLink.bottom) / 2,
      footerBottom: footer.bottom,
      footerCenter: (footer.top + footer.bottom) / 2,
      footerTop: footer.top,
    };
  });

  expect(geometry.detailsTop).toBeCloseTo(geometry.footerTop, 0);
  expect(geometry.detailsBottom).toBeCloseTo(geometry.footerBottom, 0);
  expect(geometry.firstLinkCenter).toBeCloseTo(geometry.footerCenter, 0);
});

test("@desktop-only menu line traces and retracts as one continuous path", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");

  const lineWidth = (className: string): Promise<number> =>
    page
      .locator(className)
      .evaluate((element) =>
        Number.parseFloat(getComputedStyle(element).width),
      );
  const lineHeight = (className: string): Promise<number> =>
    page
      .locator(className)
      .evaluate((element) =>
        Number.parseFloat(getComputedStyle(element).height),
      );

  await page.waitForFunction(
    () => {
      const bottom = document.querySelector(".l5");
      const bend = document.querySelector(".l4");
      const top = document.querySelector(".l3");
      if (!bottom || !bend || !top) return false;

      return (
        Number.parseFloat(getComputedStyle(bottom).width) > 20 &&
        Number.parseFloat(getComputedStyle(bottom).width) < 165 &&
        Number.parseFloat(getComputedStyle(bend).height) < 2 &&
        Number.parseFloat(getComputedStyle(top).width) < 2
      );
    },
    null,
    { polling: 25, timeout: 3_000 },
  );

  await page.waitForFunction(
    () => {
      const bottom = document.querySelector(".l5");
      const bend = document.querySelector(".l4");
      const top = document.querySelector(".l3");
      if (!bottom || !bend || !top) return false;

      const bendHeight = Number.parseFloat(getComputedStyle(bend).height);
      return (
        Number.parseFloat(getComputedStyle(bottom).width) > 168 &&
        bendHeight > 5 &&
        bendHeight < 48 &&
        Number.parseFloat(getComputedStyle(top).width) < 2
      );
    },
    null,
    { polling: 25 },
  );

  await page.waitForFunction(
    () => {
      const bend = document.querySelector(".l4");
      const top = document.querySelector(".l3");
      if (!bend || !top) return false;

      const topWidth = Number.parseFloat(getComputedStyle(top).width);
      return (
        Number.parseFloat(getComputedStyle(bend).height) > 48 &&
        topWidth > 20 &&
        topWidth < 640
      );
    },
    null,
    { polling: 25 },
  );

  await expect.poll(() => lineWidth(".l3")).toBeGreaterThan(648);
  await expect.poll(() => lineHeight(".l4")).toBeGreaterThan(48);
  await expect.poll(() => lineWidth(".l5")).toBeGreaterThan(168);

  const menuButton = page.getByRole("button", { name: "Toggle menu" });
  await menuButton.hover();
  await expect.poll(() => lineWidth(".l5")).toBeLessThan(2);
  await expect.poll(() => lineHeight(".l2")).toBeGreaterThan(56);

  await menuButton.click();
  await expect.poll(() => lineHeight(".l4")).toBeLessThan(2);
  await expect.poll(() => lineWidth(".l3")).toBeLessThan(2);

  await menuButton.click();
  await expect.poll(() => lineWidth(".l3")).toBeGreaterThan(648);
  await expect.poll(() => lineHeight(".l4")).toBeGreaterThan(48);

  await page.mouse.move(1_000, 600);
  await expect.poll(() => lineWidth(".l5")).toBeGreaterThan(168);
});

test("@desktop-only gallery keeps the menu-open frame", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/gallery/buildings");

  const topLine = page.locator(".l1");
  const leftLine = page.locator(".l2");
  await expect(topLine).toHaveCount(1);
  await expect
    .poll(() => topLine.evaluate((line) => line.getBoundingClientRect().width))
    .toBeGreaterThan(1_300);
  await expect
    .poll(() =>
      leftLine.evaluate((line) => line.getBoundingClientRect().height),
    )
    .toBeGreaterThan(56);
  await expect(page.locator(".l3")).toHaveCount(0);
  await expect(page.locator(".l4")).toHaveCount(0);
  await expect(page.locator(".l5")).toHaveCount(0);

  const menuButton = page.getByRole("button", { name: "Toggle menu" });
  await menuButton.click();
  await menuButton.click();
  await expect(topLine).toHaveCount(1);
  await expect
    .poll(() =>
      leftLine.evaluate((line) => line.getBoundingClientRect().height),
    )
    .toBeGreaterThan(56);

  await menuButton.click();
  await page.getByRole("link", { name: "Home Page" }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(topLine).toHaveCount(0);

  await page.waitForFunction(
    () => {
      const first = document.querySelector(".l3")?.getBoundingClientRect();
      const second = document.querySelector(".l4")?.getBoundingClientRect();
      const third = document.querySelector(".l5")?.getBoundingClientRect();
      if (!first || !second || !third) return false;
      return (
        first.width > 20 &&
        first.width < 640 &&
        second.height < 2 &&
        third.width < 2
      );
    },
    null,
    { polling: 25 },
  );
  const firstSegment = await page.locator(".l3").evaluate((line) => {
    const bounds = line.getBoundingClientRect();
    const buttonBounds = document
      .querySelector(".menu--main--btn")!
      .getBoundingClientRect();
    return {
      buttonLeft: buttonBounds.left,
      left: bounds.left,
      right: bounds.right,
    };
  });
  expect(firstSegment.left).toBeCloseTo(firstSegment.buttonLeft, 0);
  expect(firstSegment.right).toBeGreaterThan(firstSegment.left);

  await page.waitForFunction(
    () => {
      const first = document.querySelector(".l3")?.getBoundingClientRect();
      const second = document.querySelector(".l4")?.getBoundingClientRect();
      const third = document.querySelector(".l5")?.getBoundingClientRect();
      if (!first || !second || !third) return false;
      return (
        first.width > 648 &&
        second.height > 5 &&
        second.height < 48 &&
        third.width < 2
      );
    },
    null,
    { polling: 25 },
  );
  const secondSegment = await page.locator(".l4").evaluate((line) => {
    const bounds = line.getBoundingClientRect();
    const firstBounds = document.querySelector(".l3")!.getBoundingClientRect();
    return { firstTop: firstBounds.top, top: bounds.top };
  });
  expect(secondSegment.top).toBeCloseTo(secondSegment.firstTop, 0);

  await page.waitForFunction(
    () => {
      const second = document.querySelector(".l4")?.getBoundingClientRect();
      const third = document.querySelector(".l5")?.getBoundingClientRect();
      if (!second || !third) return false;
      return second.height > 48 && third.width > 20 && third.width < 165;
    },
    null,
    { polling: 25 },
  );
  const finalSegment = await page.locator(".l5").evaluate((line) => {
    const bounds = line.getBoundingClientRect();
    const secondBounds = document.querySelector(".l4")!.getBoundingClientRect();
    return { right: bounds.right, secondLeft: secondBounds.left };
  });
  expect(finalSegment.right).toBeCloseTo(finalSegment.secondLeft, 0);

  await expect
    .poll(() =>
      page
        .locator(".l5")
        .evaluate((line) => line.getBoundingClientRect().width),
    )
    .toBeGreaterThan(168);
});

test("@desktop-only gallery pictures fade as they enter and leave the scroll area", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1_920, height: 687 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/gallery/buildings");

  const gallery = page.locator(".Buildings");
  const pictures = page.locator(".Buildings > article");
  const firstPicture = pictures.first();
  const partiallyVisiblePicture = pictures.nth(6);
  const lastPicture = pictures.last();
  const opacity = (picture: Locator): Promise<number> =>
    picture.evaluate((element) =>
      Number.parseFloat(getComputedStyle(element).opacity),
    );

  await expect.poll(() => opacity(firstPicture)).toBeGreaterThan(0.99);
  const visiblePixels = await partiallyVisiblePicture.evaluate((element) => {
    const pictureBounds = element.getBoundingClientRect();
    const galleryBounds = element.parentElement!.getBoundingClientRect();
    return Math.max(
      0,
      Math.min(pictureBounds.bottom, galleryBounds.bottom) -
        Math.max(pictureBounds.top, galleryBounds.top),
    );
  });
  expect(visiblePixels).toBeGreaterThan(0);
  expect(visiblePixels).toBeLessThan(150);
  await expect.poll(() => opacity(partiallyVisiblePicture)).toBeLessThan(0.01);
  await expect.poll(() => opacity(lastPicture)).toBeLessThan(0.01);

  await gallery.evaluate((element) => element.scrollBy(0, 150));
  await expect
    .poll(() => opacity(partiallyVisiblePicture))
    .toBeGreaterThan(0.99);

  await gallery.evaluate((element) =>
    element.scrollTo({ top: element.scrollHeight, behavior: "instant" }),
  );

  await expect.poll(() => opacity(lastPicture)).toBeGreaterThan(0.99);
  await expect.poll(() => opacity(firstPicture)).toBeLessThan(0.01);
});

test("@desktop-only footer line flows into the gallery scrollbar", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1_920, height: 1_080 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");

  const horizontal = page.locator(".fl1");
  const vertical = page.locator(".fl2");
  const travelingLine = page.locator(".Scroll");

  await expect
    .poll(() =>
      horizontal.evaluate((line) => line.getBoundingClientRect().width),
    )
    .toBeGreaterThan(398);
  await expect
    .poll(() =>
      vertical.evaluate((line) => line.getBoundingClientRect().height),
    )
    .toBeGreaterThan(46);
  await expect
    .poll(() =>
      travelingLine.evaluate((line) =>
        Number.parseFloat(getComputedStyle(line).opacity),
      ),
    )
    .toBeGreaterThan(0.99);

  const startingGeometry = await page.evaluate(() => {
    const horizontalBounds = document
      .querySelector(".fl1")!
      .getBoundingClientRect();
    const travelingBounds = document
      .querySelector(".Scroll")!
      .getBoundingClientRect();
    return {
      horizontalRight: horizontalBounds.right,
      horizontalTop: horizontalBounds.top,
      travelingBottom: travelingBounds.bottom,
      travelingLeft: travelingBounds.left,
      travelingTop: travelingBounds.top,
    };
  });
  expect(
    Math.abs(startingGeometry.horizontalRight - startingGeometry.travelingLeft),
  ).toBeLessThan(2);

  await page.getByRole("button", { name: "Toggle menu" }).click();
  await page.getByRole("link", { name: "Buildings" }).click();
  await expect(page).toHaveURL(/\/gallery\/buildings$/);

  await page.waitForFunction(
    () => {
      const line = document.querySelector(".Scroll");
      if (!line) return false;
      const height = line.getBoundingClientRect().height;
      return height > 60 && height < 190;
    },
    null,
    { polling: 25 },
  );

  const transitionGeometry = await page.evaluate(() => {
    const horizontalBounds = document
      .querySelector(".fl1")!
      .getBoundingClientRect();
    const verticalBounds = document
      .querySelector(".fl2")!
      .getBoundingClientRect();
    const travelingBounds = document
      .querySelector(".Scroll")!
      .getBoundingClientRect();
    return {
      horizontalTop: horizontalBounds.top,
      horizontalWidth: horizontalBounds.width,
      travelingHeight: travelingBounds.height,
      travelingTop: travelingBounds.top,
      verticalHeight: verticalBounds.height,
    };
  });
  expect(transitionGeometry.horizontalWidth).toBeLessThan(398);
  expect(
    Math.abs(transitionGeometry.horizontalTop - startingGeometry.horizontalTop),
  ).toBeLessThan(2);
  expect(transitionGeometry.verticalHeight).toBeLessThan(2);
  expect(transitionGeometry.travelingTop).toBeLessThan(
    startingGeometry.travelingTop,
  );

  const gallery = page.locator(".Buildings");
  await gallery.waitFor();
  const alignment = await page.evaluate(() => {
    const galleryBounds = document
      .querySelector(".Buildings")!
      .getBoundingClientRect();
    const travelingBounds = document
      .querySelector(".Scroll")!
      .getBoundingClientRect();
    return Math.abs(galleryBounds.right - travelingBounds.right);
  });
  expect(alignment).toBeLessThan(2);
  await expect
    .poll(() =>
      travelingLine.evaluate((line) => line.getBoundingClientRect().height),
    )
    .toBeGreaterThan(198);

  await page.getByRole("button", { name: "Toggle menu" }).click();
  await page.getByRole("link", { name: "Home Page" }).click();
  await expect(page).toHaveURL(/\/$/);

  await page.waitForFunction(
    () => {
      const line = document.querySelector(".Scroll");
      if (!line) return false;
      const height = line.getBoundingClientRect().height;
      return height > 70 && height < 90;
    },
    null,
    { polling: 25 },
  );
  await expect
    .poll(() =>
      horizontal.evaluate((line) => line.getBoundingClientRect().width),
    )
    .toBeLessThan(2);

  await page.waitForFunction(
    () => {
      const line = document.querySelector(".fl1");
      if (!line) return false;
      const width = line.getBoundingClientRect().width;
      return width > 20 && width < 380;
    },
    null,
    { polling: 25 },
  );
  await expect
    .poll(() =>
      travelingLine.evaluate((line) => line.getBoundingClientRect().height),
    )
    .toBeLessThan(50);

  await expect
    .poll(() =>
      horizontal.evaluate((line) => line.getBoundingClientRect().width),
    )
    .toBeGreaterThan(398);
  await expect
    .poll(() =>
      vertical.evaluate((line) => line.getBoundingClientRect().height),
    )
    .toBeGreaterThan(46);

  const returnedGeometry = await page.evaluate(() => {
    const horizontalBounds = document
      .querySelector(".fl1")!
      .getBoundingClientRect();
    const travelingBounds = document
      .querySelector(".Scroll")!
      .getBoundingClientRect();
    return {
      horizontalRight: horizontalBounds.right,
      horizontalTop: horizontalBounds.top,
      travelingBottom: travelingBounds.bottom,
      travelingLeft: travelingBounds.left,
      travelingTop: travelingBounds.top,
    };
  });
  expect(
    Math.abs(
      returnedGeometry.horizontalRight - startingGeometry.horizontalRight,
    ),
  ).toBeLessThan(2);
  expect(
    Math.abs(returnedGeometry.horizontalTop - startingGeometry.horizontalTop),
  ).toBeLessThan(2);
  expect(
    Math.abs(returnedGeometry.travelingLeft - startingGeometry.travelingLeft),
  ).toBeLessThan(2);
  expect(
    Math.abs(returnedGeometry.travelingTop - startingGeometry.travelingTop),
  ).toBeLessThan(2);
  expect(
    Math.abs(
      returnedGeometry.travelingBottom - startingGeometry.travelingBottom,
    ),
  ).toBeLessThan(2);
});

test("@a11y primary pages have no automatically detectable violations", async ({
  page,
}) => {
  for (const route of ["/", "/about", "/gallery/buildings", "/contact"]) {
    await page.goto(route);
    await waitForSettledPage(page);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(
      results.violations,
      `${route}: ${JSON.stringify(results.violations)}`,
    ).toEqual([]);
  }
});

test("@desktop-only visual layout remains stable", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Buildings" })).toBeVisible();
  await page.locator(".l5").waitFor();
  await expect
    .poll(() =>
      page
        .locator(".l3")
        .evaluate((line) => Number.parseFloat(getComputedStyle(line).width)),
    )
    .toBeGreaterThan(648);
  const logoAspectRatio = await page.locator(".logo").evaluate((logo) => {
    const bounds = logo.getBoundingClientRect();
    return bounds.width / bounds.height;
  });
  expect(logoAspectRatio).toBeCloseTo(201 / 61, 2);
  await expect(page).toHaveScreenshot("home-desktop.png", {
    animations: "disabled",
    maxDiffPixels: 250,
  });

  await page.goto("/about");
  await expect(
    page.getByRole("heading", { name: /My name is Diana/ }),
  ).toBeVisible();
  await expect(page.locator(".text")).toHaveText("Hi! My name is Diana.");
  await expect(page.locator(".number").last()).toHaveText("150 000+");
  await expect
    .poll(() =>
      page
        .locator(".l3")
        .evaluate((line) => Number.parseFloat(getComputedStyle(line).width)),
    )
    .toBeGreaterThan(648);
  await expect(page).toHaveScreenshot("about-desktop.png", {
    animations: "disabled",
    maxDiffPixels: 250,
  });
});

test("homepage stays within initial transfer budgets and does not fetch 3D assets", async ({
  page,
}) => {
  const requests: string[] = [];
  page.on("request", (request) => requests.push(request.url()));
  await page.goto("/");
  await page.getByRole("heading", { name: "Buildings" }).waitFor();

  const resources = await page.evaluate(() =>
    (
      performance.getEntriesByType("resource") as PerformanceResourceTiming[]
    ).map((entry) => ({
      name: entry.name,
      size: entry.encodedBodySize,
      type: entry.initiatorType,
    })),
  );
  const scriptBytes = resources
    .filter((resource) => resource.type === "script")
    .reduce((total, resource) => total + resource.size, 0);
  const imageBytes = resources
    .filter((resource) => resource.type === "img")
    .reduce((total, resource) => total + resource.size, 0);

  expect(scriptBytes).toBeLessThan(650_000);
  expect(imageBytes).toBeLessThan(2_000_000);
  expect(requests.some((url) => url.endsWith("/model.glb"))).toBe(false);
});
