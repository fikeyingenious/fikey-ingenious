import { copyFile, mkdir, rm } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const output = resolve(root, "dist/cloudflare");

// Only files in this allow-list can be published to Cloudflare.
const publicFiles = [
  "index.html",
  "profile.html",
  "nuha-tea.html",
  "fikey-ingenious-logo.png",
  "fikey-ingenious-logo-icon.png",
  "nuha-banner.jpeg",
  "nuha-cup.webp",
  "nuha-favicon.png",
  "nuha-kenduri.webp",
  "nuha-logo.png",
  "nuha-vanilla.webp",

  "nuhateaco/index.html",
  "sayed-fikri-profile/index.html",

  "assets/arif-profile-preview-v2.webp",
  "assets/arif-profile.css",
  "assets/arif-profile.js",
  "assets/arif-workbench-v2.webp",
  "assets/contact-motion.js",
  "assets/hero-lights.css",
  "assets/hero-lights.js",
  "assets/hero-system-lossless.webp",
  "assets/nuha-hero-luxury.webp",
  "assets/nuha-luxury.css",
  "assets/nuha-mobile-cart.webp",
  "assets/nuha-project-v2.webp",
  "assets/nuha-tea-ingredients.webp",
  "assets/process-system-v2.webp",
  "assets/reference-layout.css",
  "assets/service-explorer.css",
  "assets/service-explorer.js",
  "assets/services-system-v2.webp",
  "assets/site.js",
  "assets/stack-and-contact.css",

  "assets/services/assistant.webp",
  "assets/services/email.webp",
  "assets/services/improvements.webp",
  "assets/services/landing-v2.webp",
  "assets/services/reporting.webp",
  "assets/services/systems.webp",

  "assets/tech/angular.svg",
  "assets/tech/bootstrap.svg",
  "assets/tech/django.svg",
  "assets/tech/laravel.svg",
  "assets/tech/microsoftexcel.svg",
  "assets/tech/mysql.svg",
  "assets/tech/openai.svg",
  "assets/tech/postgresql.svg",
  "assets/tech/powerbi.svg",
  "assets/tech/python.svg",
  "assets/tech/spring.svg",
  "assets/tech/typescript.svg",

  "trinafcreative/index.html",
  "trinafcreative/app.js",
  "trinafcreative/motion.css",
  "trinafcreative/motion.js",
  "trinafcreative/style.css",
  "trinafcreative/assets/creative-mediums-v2.png",
  "trinafcreative/assets/studio-hero-v2.png",
  "trinafcreative/assets/studio-reference.png",

  "trinafmoneypocket/index.html",
  "trinafmoneypocket/app.js",
  "trinafmoneypocket/style.css",
  "trinafmoneypocket/assets/nazra-original.jpeg",
  "trinafmoneypocket/assets/nazra.webp",
  "trinafmoneypocket/assets/omd-original.jpeg",
  "trinafmoneypocket/assets/omd.webp",
  "trinafmoneypocket/assets/pasti-original.jpeg",
  "trinafmoneypocket/assets/pasti.webp",
  "trinafmoneypocket/assets/raya-scene.webp",
  "trinafmoneypocket/assets/trinaf-hero.webp",
  "trinafmoneypocket/assets/trinaf-logo.webp",
  "trinafmoneypocket/assets/trinaf-signature.webp",
  "trinafmoneypocket/assets/wash-original.jpeg",
  "trinafmoneypocket/assets/wash.webp",
];

await rm(output, { recursive: true, force: true });

for (const file of publicFiles) {
  const destination = resolve(output, file);
  await mkdir(dirname(destination), { recursive: true });
  await copyFile(resolve(root, file), destination);
}

await copyFile(resolve(root, "cloudflare/_headers"), resolve(output, "_headers"));

console.log(`Prepared ${publicFiles.length} public site files in dist/cloudflare.`);
