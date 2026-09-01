import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, useLocation } from "react-router";
import { describe, expect, it, vi } from "vitest";

import App from "../src/App";

function LocationProbe() {
  const location = useLocation();
  return <output data-testid="location">{location.pathname}</output>;
}

function renderApp(pathname = "/") {
  return render(
    <MemoryRouter initialEntries={[pathname]}>
      <App />
      <LocationProbe />
    </MemoryRouter>,
  );
}

describe("portfolio application", () => {
  it("navigates with semantic links and switches language", async () => {
    const user = userEvent.setup();
    renderApp();

    expect(
      await screen.findByRole("heading", { name: "Buildings" }),
    ).toBeVisible();
    await user.click(screen.getByRole("button", { name: "Toggle menu" }));
    await user.click(screen.getByRole("link", { name: "About" }));
    expect(
      await screen.findByRole("heading", { name: "Hi! My name is Diana." }),
    ).toBeVisible();
    expect(screen.getByTestId("location")).toHaveTextContent("/about");

    screen.getByRole("button", { name: "Превключи на български" }).focus();
    await user.keyboard("{Enter}");
    expect(
      await screen.findByRole("heading", { name: "Здравей! Аз съм Диана." }),
    ).toBeVisible();
    expect(document.documentElement).toHaveAttribute("lang", "bg");
  });

  it("keeps a directly addressed gallery category after render", async () => {
    renderApp("/gallery/sozopol");
    expect(
      await screen.findByRole("region", { name: "Seaside House in Sozopol" }),
    ).toBeVisible();
    expect(screen.getByTestId("location")).toHaveTextContent(
      "/gallery/sozopol",
    );
    expect(document.querySelector(".l1")).toBeInTheDocument();
    expect(document.querySelector(".l2")).toBeInTheDocument();
    expect(document.querySelector(".l3")).not.toBeInTheDocument();
    expect(document.querySelector(".l4")).not.toBeInTheDocument();
    expect(document.querySelector(".l5")).not.toBeInTheDocument();
  });

  it("opens and closes an accessible image dialog", async () => {
    const user = userEvent.setup();
    renderApp("/gallery/sozopol");

    const imageButtons = await screen.findAllByRole("button", {
      name: "Open portfolio image",
    });
    await user.click(imageButtons[0]);
    expect(screen.getByRole("dialog")).toBeVisible();
    expect(screen.getByRole("button", { name: "Back" })).toHaveFocus();

    await user.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
  });

  it("redirects invalid galleries to the home page", async () => {
    renderApp("/gallery/not-a-project");
    await waitFor(() =>
      expect(screen.getByTestId("location")).toHaveTextContent("/"),
    );
    expect(
      await screen.findByRole("heading", { name: "Buildings" }),
    ).toBeVisible();
  });

  it("renders mobile contact actions without loading the 3D canvas", async () => {
    renderApp("/contact");
    expect(
      await screen.findByRole("link", { name: /globalarh@abv.bg/ }),
    ).toHaveAttribute("href", "mailto:globalarh@abv.bg");
    expect(screen.getByRole("link", { name: /diana-radeva/ })).toHaveAttribute(
      "rel",
      "noreferrer noopener",
    );
    expect(document.querySelector("canvas")).not.toBeInTheDocument();
  });

  it("reveals contact actions progressively when motion is enabled", async () => {
    const defaultMatchMedia = window.matchMedia.getMockImplementation();
    let unmount;

    window.matchMedia.mockImplementation((query) => ({
      matches: query.includes("max-width: 1280px"),
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    try {
      ({ unmount } = renderApp("/contact"));
      const phoneLink = await screen.findByRole("link", {
        name: /359 894 696679/,
      });
      expect(phoneLink.closest(".icon-cont")).not.toHaveClass("show");
      await waitFor(
        () => expect(phoneLink.closest(".icon-cont")).toHaveClass("show"),
        { timeout: 1_200 },
      );
    } finally {
      unmount?.();
      window.matchMedia.mockImplementation(defaultMatchMedia);
    }
  });
});
