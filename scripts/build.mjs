import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const dist = resolve(root, "dist");
const server = resolve(dist, "server");

await rm(dist, { recursive: true, force: true });
await mkdir(server, { recursive: true });

const textAssets = {
  "/": await readFile(resolve(root, "index.html"), "utf8"),
  "/index.html": await readFile(resolve(root, "index.html"), "utf8"),
  "/nuha-tea": await readFile(resolve(root, "nuha-tea.html"), "utf8"),
  "/nuha-tea.html": await readFile(resolve(root, "nuha-tea.html"), "utf8"),
  "/nuhateaco": await readFile(resolve(root, "nuha-tea.html"), "utf8"),
};

const binaryFiles = {
  "/fikey-ingenious-logo.png": ["image/png", "fikey-ingenious-logo.png"],
  "/fikey-ingenious-logo-icon.png": ["image/png", "fikey-ingenious-logo-icon.png"],
  "/nuha-kenduri.jpeg": ["image/jpeg", "nuha-kenduri.jpeg"],
  "/nuha-menu.jpeg": ["image/jpeg", "nuha-menu.jpeg"],
  "/nuha-banner.jpeg": ["image/jpeg", "nuha-banner.jpeg"],
  "/nuha-signature.jpeg": ["image/jpeg", "nuha-signature.jpeg"],
  "/nuha-logo.png": ["image/png", "nuha-logo.png"],
  "/nuha-cup.webp": ["image/webp", "nuha-cup.webp"],
  "/nuha-vanilla.webp": ["image/webp", "nuha-vanilla.webp"],
  "/nuha-kenduri.webp": ["image/webp", "nuha-kenduri.webp"],
  "/nuha-favicon.png": ["image/png", "nuha-favicon.png"],
  "/nuha-hero.webp": ["image/webp", "nuha-hero.webp"],
};

const binaryAssets = {};
for (const [route, [type, file]] of Object.entries(binaryFiles)) {
  binaryAssets[route] = {
    type,
    data: (await readFile(resolve(root, file))).toString("base64"),
  };
}

const worker = `const textAssets = ${JSON.stringify(textAssets)};
const binaryAssets = ${JSON.stringify(binaryAssets)};

function decodeBase64(value) {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index++) bytes[index] = binary.charCodeAt(index);
  return bytes;
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname.length > 1 ? url.pathname.replace(/\\/$/, "") : url.pathname;
    const headers = {
      "Cache-Control": path === "/" || path === "/index.html"
        ? "public, max-age=300"
        : "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    };

    if (textAssets[path]) {
      return new Response(textAssets[path], {
        headers: { ...headers, "Content-Type": "text/html; charset=utf-8" },
      });
    }

    if (binaryAssets[path]) {
      const asset = binaryAssets[path];
      return new Response(decodeBase64(asset.data), {
        headers: { ...headers, "Content-Type": asset.type },
      });
    }

    return new Response("Page not found", {
      status: 404,
      headers: { ...headers, "Content-Type": "text/plain; charset=utf-8" },
    });
  },
};
`;

await writeFile(resolve(server, "index.js"), worker);
console.log("Built Fikey Ingenious Technologies site.");
