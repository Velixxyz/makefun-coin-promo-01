// The Haunt ($HAUNT) — entry for makefun-coin-promo-01.
//
// The grader runs this program twice and the two runs must write the
// same bytes. All this program does is copy LAUNCH.json from the
// repository root to the output directory. Nothing it writes is judged:
// the house reads the coin itself from pump.fun.
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const botDir = process.env.MAKEFUN_BOT_DIR ?? scriptDir;
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Resolve LAUNCH.json from the bot directory first, then beside this
// script, then the working directory, so the copy works no matter
// where the grader runs it from. The bytes are copied unchanged.
const candidates = [
  join(botDir, "LAUNCH.json"),
  join(scriptDir, "LAUNCH.json"),
  join(process.cwd(), "LAUNCH.json"),
];
const launchPath = candidates.find((p) => existsSync(p));
if (!launchPath) {
  throw new Error(
    `LAUNCH.json not found in any of: ${candidates.join(", ")}`,
  );
}
mkdirSync(outputDir, { recursive: true });
copyFileSync(launchPath, join(outputDir, "LAUNCH.json"));
