import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const assetsDir = path.resolve("public/assets");
const files = await readdir(assetsDir);

let originalBytes = 0;
let optimizedBytes = 0;
let count = 0;

for (const file of files) {
  if (!file.toLowerCase().endsWith(".png")) continue;

  const input = path.join(assetsDir, file);
  const output = path.join(assetsDir, file.replace(/\.png$/i, ".webp"));
  const before = (await stat(input)).size;

  await sharp(input)
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 82, effort: 5 })
    .toFile(output);

  const after = (await stat(output)).size;
  originalBytes += before;
  optimizedBytes += after;
  count += 1;
}

const saved = originalBytes - optimizedBytes;
console.log(`Optimized ${count} images.`);
console.log(`Original: ${(originalBytes / 1024 / 1024).toFixed(2)} MB`);
console.log(`WebP: ${(optimizedBytes / 1024 / 1024).toFixed(2)} MB`);
console.log(`Saved: ${(saved / 1024 / 1024).toFixed(2)} MB`);
