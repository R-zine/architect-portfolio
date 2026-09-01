import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1100,
    target: "es2022",
    sourcemap: true,
  },
  test: {
    environment: "jsdom",
    globals: true,
    include: ["tests/**/*.test.{js,jsx}"],
    setupFiles: ["./tests/setup.js"],
    testTimeout: 15_000,
    coverage: {
      provider: "v8",
      reporter: ["text", "json-summary", "html"],
      include: ["src/**/*.{js,jsx}"],
      exclude: [
        "src/generated/**",
        "src/components/Contact/Model.jsx",
        "src/components/Contact/ContactScene.jsx",
        "src/components/Buildings/buildings.js",
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
