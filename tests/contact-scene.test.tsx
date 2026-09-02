import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";

interface CanvasMockProps {
  camera: { fov: number };
  children: ReactNode;
  shadows: boolean;
}

interface StageMockProps {
  children: ReactNode;
  intensity: number;
  preset: string;
  shadows: string;
}

interface ModelMockProps {
  scale: number;
}

vi.mock("@react-three/fiber", () => ({
  Canvas: ({ camera, children, shadows }: CanvasMockProps) => (
    <div
      data-testid="canvas"
      data-fov={camera.fov}
      data-shadows={String(shadows)}
    >
      {children}
    </div>
  ),
}));

vi.mock("@react-three/drei", () => ({
  OrbitControls: () => null,
  Stage: ({ children, intensity, preset, shadows }: StageMockProps) => (
    <div
      data-testid="stage"
      data-intensity={intensity}
      data-preset={preset}
      data-shadows={shadows}
    >
      {children}
    </div>
  ),
}));

vi.mock("../src/components/Contact/Model", () => ({
  Model: ({ scale }: ModelMockProps) => (
    <div data-testid="model" data-scale={scale} />
  ),
}));

import ContactScene from "../src/components/Contact/ContactScene";

describe("contact scene", () => {
  it("uses normalized Rembrandt lighting and dynamic shadows", () => {
    render(<ContactScene />);

    expect(screen.getByTestId("canvas")).toHaveAttribute(
      "data-shadows",
      "true",
    );
    expect(screen.getByTestId("canvas")).toHaveAttribute("data-fov", "50");
    expect(screen.getByTestId("stage")).toHaveAttribute(
      "data-preset",
      "rembrandt",
    );
    expect(screen.getByTestId("stage")).toHaveAttribute("data-intensity", "5");
    expect(screen.getByTestId("stage")).toHaveAttribute(
      "data-shadows",
      "contact",
    );
    expect(screen.getByTestId("model")).toHaveAttribute("data-scale", "0.002");
  });
});
