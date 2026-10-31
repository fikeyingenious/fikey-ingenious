import { access, readFile, readdir, stat } from "node:fs/promises";
import { extname, join, relative, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const output = resolve(root, "dist/cloudflare");

const expectedRoutes = [
  "index.html",
  "profile.html",
  "nuha-tea.html",
  "nuhateaco/index.html",
  "sayed-fikri-profile/index.html",
  "trinafcreative/index.html",
  "trinafmoneypocket/index.html",
];

const forbiddenSegments = [
  ".git",
  ".impeccable",
  ".openai",
  "design-toolkit",
  "landing-preview",
  "research",
  "node_modules",
];

async function walk(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(path)));
    else files.push(path);
  }
  return files;
}

for (const route of expectedRoutes) await access(resolve(output, route));

const files = await walk(output);
const relativeFiles = files.map((file) => relative(output, file));
const forbidden = relativeFiles.filter((file) =>
  forbiddenSegments.some((segment) => file.split("/").includes(segment)),
);

if (forbidden.length > 0) {
  throw new Error(`Forbidden deployment files found: ${forbidden.join(", ")}`);
}

const sourcePattern = /(?:src|href)=["']([^"'#?]+)(?:[?#][^"']*)?["']/g;
const missingReferences = [];

for (const file of files.filter((path) => extname(path) === ".html")) {
  const html = await readFile(file, "utf8");
  for (const match of html.matchAll(sourcePattern)) {
    const reference = match[1];
    if (/^(?:https?:|mailto:|tel:|data:)/.test(reference)) continue;

    const target = reference.startsWith("/")
      ? resolve(output, `.${reference}`)
      : resolve(file, "..", reference);

    try {
      const targetStat = await stat(target);
      if (targetStat.isDirectory()) await access(resolve(target, "index.html"));
    } catch {
      missingReferences.push(`${relative(output, file)} -> ${reference}`);
    }
  }
}

if (missingReferences.length > 0) {
  throw new Error(`Missing local references:\n${missingReferences.join("\n")}`);
}

const totalBytes = (
  await Promise.all(files.map(async (file) => (await stat(file)).size))
).reduce((total, size) => total + size, 0);

console.log(
  `Verified ${expectedRoutes.length} public routes and ${files.length} files (${(
    totalBytes /
    1024 /
    1024
  ).toFixed(1)} MiB).`,
);
