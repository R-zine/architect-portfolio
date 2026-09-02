import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Scroll from "../src/components/Scroll";
import { getGalleryAsset } from "../src/utils/galleryAssets";

describe("small UI helpers", () => {
  it("renders the gallery scroll marker declaratively", () => {
    const { rerender } = render(<Scroll mode={false} />);
    const marker = document.querySelector(".Scroll");
    expect(marker).not.toHaveClass("transform");

    rerender(<Scroll mode />);
    expect(marker).toHaveClass("transform");
    expect(marker).toHaveAttribute("aria-hidden", "true");
  });

  it("fails clearly for an ungenerated logical image", () => {
    expect(() => getGalleryAsset("./img/missing.jpg")).toThrow(
      "Missing generated gallery asset",
    );
  });
});
