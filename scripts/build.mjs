import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const dist = resolve(root, "dist");
const server = resolve(dist, "server");

await rm(server, { recursive: true, force: true });
await mkdir(server, { recursive: true });

const textAssets = {
  "/trinafmoneypocket": await readFile(resolve(root, "trinafmoneypocket/index.html"), "utf8"),
  "/trinafmoneypocket/index.html": await readFile(resolve(root, "trinafmoneypocket/index.html"), "utf8"),
  "/": await readFile(resolve(root, "index.html"), "utf8"),
  "/index.html": await readFile(resolve(root, "index.html"), "utf8"),
  "/profile": await readFile(resolve(root, "profile.html"), "utf8"),
  "/profile.html": await readFile(resolve(root, "profile.html"), "utf8"),
  "/sayed-fikri-profile": await readFile(resolve(root, "sayed-fikri-profile/index.html"), "utf8"),
  "/sayed-fikri-profile/index.html": await readFile(resolve(root, "sayed-fikri-profile/index.html"), "utf8"),
  "/nuha-tea": await readFile(resolve(root, "nuha-tea.html"), "utf8"),
  "/nuha-tea.html": await readFile(resolve(root, "nuha-tea.html"), "utf8"),
  "/nuhateaco": await readFile(resolve(root, "nuhateaco/index.html"), "utf8"),
  "/nuhateaco/index.html": await readFile(resolve(root, "nuhateaco/index.html"), "utf8"),
};

const binaryFiles = {
  "/assets/service-explorer.css": ["text/css; charset=utf-8", "assets/service-explorer.css"],
  "/assets/service-explorer.js": ["text/javascript; charset=utf-8", "assets/service-explorer.js"],
  "/trinafmoneypocket/style.css": ["text/css; charset=utf-8", "trinafmoneypocket/style.css"],
  "/trinafmoneypocket/app.js": ["text/javascript; charset=utf-8", "trinafmoneypocket/app.js"],
  "/assets/nuha-mobile-cart.webp": ["image/webp", "assets/nuha-mobile-cart.webp"],
  "/assets/nuha-luxury.css": ["text/css; charset=utf-8", "assets/nuha-luxury.css"],
  "/assets/nuha-hero-luxury.webp": ["image/webp", "assets/nuha-hero-luxury.webp"],
  "/assets/nuha-tea-ingredients.webp": ["image/webp", "assets/nuha-tea-ingredients.webp"],
  "/assets/hero-system-lossless.webp": ["image/webp", "assets/hero-system-lossless.webp"],
  "/assets/hero-lights.css": ["text/css; charset=utf-8", "assets/hero-lights.css"],
  "/assets/hero-lights.js": ["text/javascript; charset=utf-8", "assets/hero-lights.js"],
  "/assets/stack-and-contact.css": ["text/css; charset=utf-8", "assets/stack-and-contact.css"],
  "/assets/contact-motion.js": ["text/javascript; charset=utf-8", "assets/contact-motion.js"],
  "/assets/arif-profile-preview-v2.webp": ["image/webp", "assets/arif-profile-preview-v2.webp"],
  "/assets/arif-workbench-v2.webp": ["image/webp", "assets/arif-workbench-v2.webp"],
  "/assets/arif-profile.css": ["text/css; charset=utf-8", "assets/arif-profile.css"],
  "/assets/arif-profile.js": ["text/javascript; charset=utf-8", "assets/arif-profile.js"],
  "/assets/nuha-project-v2.webp": ["image/webp", "assets/nuha-project-v2.webp"],
  "/assets/services-system-v2.webp": ["image/webp", "assets/services-system-v2.webp"],
  "/assets/process-system-v2.webp": ["image/webp", "assets/process-system-v2.webp"],
  "/assets/reference-layout.css": ["text/css; charset=utf-8", "assets/reference-layout.css"],
  "/assets/site.js": ["text/javascript; charset=utf-8", "assets/site.js"],
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
  "/nuha-hero.png": ["image/png", "nuha-hero.png"],
};

for (const icon of ["openai", "python", "typescript", "angular", "django", "laravel", "spring", "bootstrap", "powerbi", "microsoftexcel", "postgresql", "mysql"]) {
  binaryFiles[`/assets/tech/${icon}.svg`] = ["image/svg+xml", `assets/tech/${icon}.svg`];
}

for (const service of ["landing-v2", "email", "assistant", "systems", "improvements", "reporting"]) {
  binaryFiles[`/assets/services/${service}.webp`] = ["image/webp", `assets/services/${service}.webp`];
}

const binaryAssets = {};
for (const name of ["wash", "nazra", "pasti", "omd", "trinaf-logo", "raya-scene", "trinaf-hero", "trinaf-signature"]) {
  binaryFiles[`/trinafmoneypocket/assets/${name}.webp`] = ["image/webp", `trinafmoneypocket/assets/${name}.webp`];
}
for (const name of ["wash", "nazra", "pasti", "omd"]) {
  binaryFiles[`/trinafmoneypocket/assets/${name}-original.jpeg`] = ["image/jpeg", `trinafmoneypocket/assets/${name}-original.jpeg`];
}
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
      "Cache-Control": textAssets[path]
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
