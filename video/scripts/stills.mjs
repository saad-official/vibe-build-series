// Review helper: bundle once, then render several stills of one composition.
// Usage: node scripts/stills.mjs <compositionId> <outDir> <frame> [frame...]
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import { mkdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const [id, outDir, ...frames] = process.argv.slice(2);
if (!id || !outDir || frames.length === 0) {
  console.error("Usage: node scripts/stills.mjs <compositionId> <outDir> <frame> [frame...]");
  process.exit(1);
}
mkdirSync(outDir, { recursive: true });
const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts") });
const composition = await selectComposition({ serveUrl, id });
for (const f of frames) {
  const output = path.join(outDir, `${id}-${String(f).padStart(4, "0")}.png`);
  await renderStill({ serveUrl, composition, frame: Number(f), output, imageFormat: "png" });
  console.log(output);
}
// bundle() leaves its webpack output in the OS temp dir; C: is small, so remove it, but only
// when the path is exactly a Remotion bundle folder inside the temp dir.
const bundleDir = path.resolve(serveUrl);
if (path.dirname(bundleDir) === path.resolve(tmpdir()) && path.basename(bundleDir).startsWith("remotion-webpack-bundle-")) {
  rmSync(bundleDir, { recursive: true, force: true });
}
