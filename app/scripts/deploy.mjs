import { spawnSync } from "node:child_process";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const DEFAULT_IMAGE_REPOSITORY = "ghcr.io/loic-vanden-bossche/portfolio";
const TAG_PATTERN = /^[A-Za-z0-9_][A-Za-z0-9_.-]{0,127}$/;

const version = process.argv[2];

if (!version) {
  console.error("Usage: yarn deploy <version>");
  console.error("Example: yarn deploy v1.0.0");
  process.exit(1);
}

if (!TAG_PATTERN.test(version) || version.toLowerCase() === "latest") {
  console.error(
    `Invalid deployment version "${version}". Use an immutable Docker tag such as v1.0.0.`,
  );
  process.exit(1);
}

const repositoryRoot = fileURLToPath(new URL("../..", import.meta.url));
const infrastructureDirectory = path.join(repositoryRoot, "infrastructure");
const imageRepository = process.env.GHCR_IMAGE ?? DEFAULT_IMAGE_REPOSITORY;
const image = `${imageRepository}:${version}`;
const latestImage = `${imageRepository}:latest`;

function run(command, args) {
  console.log(`\n> ${command} ${args.join(" ")}`);

  const result = spawnSync(command, args, {
    cwd: repositoryRoot,
    stdio: "inherit",
  });

  if (result.error) {
    console.error(`Unable to run ${command}: ${result.error.message}`);
    process.exit(1);
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

console.log(`Deploying ${image}`);

run("docker", [
  "build",
  "--pull",
  "--file",
  "app/Dockerfile",
  "--tag",
  image,
  "--tag",
  latestImage,
  "app",
]);
run("docker", ["push", image]);
run("docker", ["push", latestImage]);
run("terraform", [`-chdir=${infrastructureDirectory}`, "init", "-input=false"]);
run("terraform", [
  `-chdir=${infrastructureDirectory}`,
  "apply",
  "-auto-approve",
  `-var=application_image=${image}`,
]);
