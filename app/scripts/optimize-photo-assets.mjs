import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

const sourceDirectory = path.resolve("public/img/sections");
const outputDirectory = path.join(sourceDirectory, "optimized");
const maximumDimension = 2560;
const placeholderBudget = 350 * 1024;

await mkdir(outputDirectory, { recursive: true });

async function collectSourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const sourceFiles = [];

  for (const entry of entries) {
    const absolutePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      if (absolutePath === outputDirectory) continue;
      sourceFiles.push(...(await collectSourceFiles(absolutePath)));
    } else if (/\.jpe?g$/i.test(entry.name)) {
      sourceFiles.push(absolutePath);
    }
  }

  return sourceFiles;
}

const sourceFiles = await collectSourceFiles(sourceDirectory);

for (const sourcePath of sourceFiles) {
  const relativeSource = path.relative(sourceDirectory, sourcePath);
  const parsedSource = path.parse(relativeSource);
  const outputFile = path.join(parsedSource.dir, `${parsedSource.name}.webp`);
  const outputPath = path.join(outputDirectory, outputFile);
  const isPlaceholder = relativeSource.startsWith(`placeholders${path.sep}`);

  await mkdir(path.dirname(outputPath), { recursive: true });

  await sharp(sourcePath, { limitInputPixels: false })
    .rotate()
    .resize({
      width: maximumDimension,
      height: maximumDimension,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({
      effort: 4,
      quality: isPlaceholder ? 72 : 78,
      smartSubsample: true,
    })
    .toFile(outputPath);

  let { size } = await stat(outputPath);

  if (isPlaceholder && size > placeholderBudget) {
    await sharp(sourcePath, { limitInputPixels: false })
      .rotate()
      .resize({
        width: 2048,
        height: 2048,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ effort: 5, quality: 62, smartSubsample: true })
      .toFile(outputPath);
    ({ size } = await stat(outputPath));
  }

  if (isPlaceholder && size > placeholderBudget) {
    await sharp(sourcePath, { limitInputPixels: false })
      .rotate()
      .resize({
        width: 1800,
        height: 1800,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ effort: 5, quality: 56, smartSubsample: true })
      .toFile(outputPath);
    ({ size } = await stat(outputPath));
  }

  console.log(
    `${relativeSource} -> ${path.join("optimized", outputFile)} (${Math.round(size / 1024)} KB)`,
  );
}
