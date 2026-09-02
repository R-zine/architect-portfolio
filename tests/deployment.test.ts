import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..");

describe("production font delivery", () => {
  it("self-hosts Roboto Condensed within the production CSP", () => {
    const html = readFileSync(resolve(projectRoot, "index.html"), "utf8");
    const css = readFileSync(resolve(projectRoot, "src/index.css"), "utf8");
    const headers = readFileSync(
      resolve(projectRoot, "public/_headers"),
      "utf8",
    );

    expect(html).not.toMatch(/fonts\.(?:googleapis|gstatic)\.com/);
    expect(css).toContain('url("/assets/fonts/roboto-condensed-latin.woff2")');
    expect(css).toContain(
      'url("/assets/fonts/roboto-condensed-cyrillic.woff2")',
    );
    expect(headers).toContain("font-src 'self'");
    expect(
      existsSync(
        resolve(
          projectRoot,
          "public/assets/fonts/roboto-condensed-latin.woff2",
        ),
      ),
    ).toBe(true);
    expect(
      existsSync(
        resolve(
          projectRoot,
          "public/assets/fonts/roboto-condensed-cyrillic.woff2",
        ),
      ),
    ).toBe(true);
  });
});
