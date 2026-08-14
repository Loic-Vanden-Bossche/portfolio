import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

const sourceDirectory = path.resolve("public/img/sections");
const outputDirectory = path.join(sourceDirectory, "optimized");
const maximumDimension = 2560;

await mkdir(outputDirectory, { recursive: true });

const sourceFiles = (await readdir(sourceDirectory)).filter((file) =>
  /\.jpe?g$/i.test(file),
);

for (const sourceFile of sourceFiles) {
  const sourcePath = path.join(sourceDirectory, sourceFile);
  const outputFile = `${path.parse(sourceFile).name}.webp`;
  const outputPath = path.join(outputDirectory, outputFile);

  await sharp(sourcePath, { limitInputPixels: false })
    .rotate()
    .resize({
      width: maximumDimension,
      height: maximumDimension,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ effort: 4, quality: 78, smartSubsample: true })
    .toFile(outputPath);

  const { size } = await stat(outputPath);
  console.log(`${sourceFile} -> ${outputFile} (${Math.round(size / 1024)} KB)`);
}
