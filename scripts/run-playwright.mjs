import { spawn, spawnSync } from "node:child_process";
import { once } from "node:events";
import path from "node:path";
import { fileURLToPath } from "node:url";

const workspace = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const host = "127.0.0.1";
const port = "4173";
const baseUrl = `http://${host}:${port}`;
const viteCli = path.join(workspace, "node_modules", "vite", "bin", "vite.js");
const playwrightCli = path.join(
  workspace,
  "node_modules",
  "@playwright",
  "test",
  "cli.js",
);

const preview = spawn(
  process.execPath,
  [viteCli, "preview", "--host", host, "--port", port],
  {
    cwd: workspace,
    detached: process.platform !== "win32",
    stdio: ["ignore", "inherit", "inherit"],
    windowsHide: true,
  },
);

async function waitForPreview() {
  const deadline = Date.now() + 30_000;

  while (Date.now() < deadline) {
    if (preview.exitCode !== null) {
      throw new Error(`Vite preview exited with code ${preview.exitCode}.`);
    }

    try {
      const response = await fetch(baseUrl, {
        signal: AbortSignal.timeout(1_000),
      });
      if (response.ok) return;
    } catch {
      // The preview process is still starting.
    }

    await new Promise((resolve) => setTimeout(resolve, 200));
  }

  throw new Error(`Vite preview did not become ready at ${baseUrl}.`);
}

async function stopPreview() {
  if (preview.exitCode !== null) return;

  if (process.platform === "win32") {
    spawnSync("taskkill", ["/pid", String(preview.pid), "/T", "/F"], {
      stdio: "ignore",
      windowsHide: true,
    });
    preview.unref();
    return;
  }

  process.kill(-preview.pid, "SIGTERM");
  await Promise.race([
    once(preview, "exit"),
    new Promise((resolve) => setTimeout(resolve, 5_000)),
  ]);

  if (preview.exitCode === null) process.kill(-preview.pid, "SIGKILL");
}

let exitCode = 1;

try {
  await waitForPreview();
  const tests = spawn(
    process.execPath,
    [playwrightCli, "test", ...process.argv.slice(2)],
    {
      cwd: workspace,
      env: process.env,
      stdio: "inherit",
      windowsHide: true,
    },
  );
  const [code] = await once(tests, "exit");
  exitCode = code ?? 1;
} finally {
  await stopPreview();
}

process.exitCode = exitCode;
