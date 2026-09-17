import { execSync, spawn } from "node:child_process";
import { platform } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const port = process.env.PORT ?? "3000";

function killPort(targetPort) {
  try {
    if (platform() === "win32") {
      const output = execSync(`netstat -ano | findstr :${targetPort}`, {
        encoding: "utf8",
      });
      const pids = new Set();

      for (const line of output.split(/\r?\n/)) {
        if (!line.includes("LISTENING")) continue;
        const pid = line.trim().split(/\s+/).at(-1);
        if (pid && pid !== "0") pids.add(pid);
      }

      for (const pid of pids) {
        try {
          execSync(`taskkill /PID ${pid} /F`, { stdio: "ignore" });
          console.log(`Stopped process ${pid} on port ${targetPort}`);
        } catch {
          // Process may have already exited.
        }
      }
      return;
    }

    execSync(`lsof -ti:${targetPort} | xargs kill -9`, {
      stdio: "ignore",
      shell: true,
    });
  } catch {
    // Port is already free.
  }
}

killPort(port);

const nextBin = path.join(root, "node_modules", "next", "dist", "bin", "next");
const child = spawn(process.execPath, [nextBin, "dev", "--webpack"], {
  cwd: root,
  stdio: "inherit",
  env: process.env,
});

child.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  process.exit(code ?? 0);
});
