import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

const contentSecurityPolicy = [
  "default-src 'self'",
  "img-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'wasm-unsafe-eval'",
  "connect-src 'self'",
  "font-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
].join("; ");

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1100,
    target: "es2022",
    sourcemap: true,
  },
  preview: {
    headers: {
      "Content-Security-Policy": contentSecurityPolicy,
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    include: ["tests/**/*.test.{ts,tsx}"],
    setupFiles: ["./tests/setup.ts"],
    testTimeout: 15_000,
    coverage: {
      provider: "v8",
      reporter: ["text", "json-summary", "html"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/generated/**",
        "src/components/Contact/Model.tsx",
        "src/components/Contact/ContactScene.tsx",
        "src/components/Buildings/galleryData.ts",
      ],
      thresholds: {
        lines: 75,
        functions: 75,
        statements: 75,
        branches: 65,
      },
    },
  },
});
