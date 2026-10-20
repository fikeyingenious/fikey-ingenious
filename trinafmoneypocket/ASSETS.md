# Trinaf asset provenance

The original product pixels and logo are used, not the rejected AI product extractions. Background removal by a deterministic straight-edge alpha mask was explicitly authorised by the user. This changes only the poster background, never printed artwork. Source posters remain accessible through product links. Lossless WebP preserves the source product pixels inside each mask; the logo is trimmed to its transparent bounds and proportionally resized without redrawing.

## Supplied originals

- `assets/trinaf-logo.webp`: `/Users/fikeyingenious/Documents/TRINAF CREATIVE/Logo/logo trinaf-01.png`.
- `assets/wash.webp` and `assets/wash-original.jpeg`: `/Users/fikeyingenious/Downloads/WhatsApp Image 2026-10-20 at 23.11.23 (3).jpeg`.
- `assets/pasti.webp` and `assets/pasti-original.jpeg`: `/Users/fikeyingenious/Downloads/WhatsApp Image 2026-10-20 at 23.11.23 (1).jpeg`.
- `assets/nazra.webp` and `assets/nazra-original.jpeg`: `/Users/fikeyingenious/Downloads/WhatsApp Image 2026-10-20 at 23.11.23 (2).jpeg`.
- `assets/omd.webp` and `assets/omd-original.jpeg`: `/Users/fikeyingenious/Downloads/WhatsApp Image 2026-10-20 at 23.11.23.jpeg`.

## Generated scenery

`assets/raya-scene.webp` is a compressed derivative of the built-in image-generation output `exec-506b341f-fffa-4e99-84c7-fd52b8e0ca06.png`. The scene is decorative campaign artwork, not a photograph of Trinaf premises. Products are layered separately as original-pixel cutouts.

Exact generation prompt:

> Use case: product-mockup. Create a photorealistic luxury Hari Raya campaign BACKGROUND PLATE for a premium money-envelope landing page. Wide 16:9 composition. Warm black interior with a large illuminated Moorish pointed arch on the right, softly blurred foliage and intricate gold architectural detailing behind, sculptural black natural stone display plinth at lower right, elegant champagne-gold satin ribbon curling around the plinth, one small glowing brass lantern at far right. Premium cinematic editorial product photography, dark warm brown and gold light, tactile stone and silk, sharp foreground, restrained opulence. LEFT 45 percent is almost black negative space for live HTML headline. The right-center plinth must be EMPTY for real product images layered later. No envelopes, no packaging, no products, no text, no logos, no people, no interface. Do not create a website screenshot. High resolution crisp material detail, landscape banner.

## Scope

## TNF signature correction

The user explicitly reaffirmed the TNF signature hero and signature pair using `Screenshot 2026-10-21 at 2.07.13 AM.png` and `Screenshot 2026-10-21 at 2.07.24 AM.png`. These replace the initial client-product hero/signature compositions. Both are illustrative Trinaf Signature campaign concepts; the actual client products remain original-pixel cutouts.

- `assets/trinaf-hero.webp`: built-in generation `exec-e516f868-682a-4739-b35d-b5b5078b83a1.png`, referenced to the first screenshot and original logo.
- `assets/trinaf-signature.webp`: built-in correction `exec-42ab8142-0f32-4d67-94bb-e9a89f924567.png`, based on `exec-d290163f-301f-4fba-ae74-803d19170f94.png` with the first screenshot as the monogram authority. The rejected isolated-N version is not shipped.
- Exact production and correction prompts are preserved in the image provenance sidecars. Built-in image generation was used, not CLI/API fallback.

## Local behaviour

Price confirmed by user: RM1.20 per piece, minimum 50 pieces. WhatsApp is intentionally not connected. Cart and custom brief are browser-local preparation tools; no order, payment or message is sent.

## Exact signature production prompts

### Hero

Use case: product-mockup. Recreate the supplied approved Trinaf campaign visual as a high-resolution WEBSITE HERO ART PLATE, not a website screenshot. Image 1 is the exact art-direction reference: tall black money envelope with delicate elaborate gold Islamic arabesque corner ornament and hanging lantern linework, standing slightly tilted on a rough black stone plinth, champagne gold satin ribbon, glowing brass lantern right foreground, warm illuminated pointed arch behind, dark foliage. Image 2 is the authoritative Trinaf Creative logo; reproduce this original logo faithfully on the middle of the envelope, preserving its TNF symbol and triNAF CREATIVE wordmark, do not invent different lettering. Extend to wide 16:9: LEFT 43% nearly black clean negative space for live HTML headline, RIGHT 57% contains the complete large upright signature envelope and scenery. Envelope should occupy x58-86%, y15-88%; whole top and bottom and corners visible. Gold foil detail, crisp black paper texture, cinematic warm light, photoreal premium print campaign, matching image 1 not navy client work. No UI, no buttons, no navigation, no headline, no pricing, no people. Only text permitted is the authentic product logo. This is the Trinaf signature concept, not a client product.

### Signature initial composition

Use case: product-mockup. Create a high-resolution wide 16:9 WEBSITE SECTION ART PLATE matching the approved Trinaf signature artwork in image 1. Image 1 is reference for composition/material, NOT interface text: TWO large black money envelopes standing in a fanned arrangement, front main envelope at center-right and back envelope behind, ornate intricate gold Islamic arabesque filigree corner borders, small gold hanging-lantern linework, champagne satin ribbon loops around rough black stone pedestal, warm golden bokeh in a dark premium studio. Image 2 is authoritative original TNF / triNAF CREATIVE logo, reproduce faithfully on the FRONT middle of the main envelope, preserve symbol and wordmark. Left 36% dark clean empty space for live HTML heading; rightmost 12% mostly dark room for live feature list. Envelopes center x48-83%, fully framed top/bottom, large and crisp, around 78% canvas height. No UI, no heading, no price, no icons, no thumbnail gallery, no buttons, no words besides original brand logo on envelope. NOT navy client products, NOT plain minimalist envelope. Luxurious black and gold foil product photography, exactly the reference's visual character. Standalone production artwork, not a screenshot.

### Signature monogram correction

Use case: precise-object-edit. Image 1 is the edit target: black and gold two-envelope Trinaf signature campaign. Change ONLY the central logo on the main front envelope. It currently has an incorrect isolated N-like symbol. Replace it with the complete correct connected TNF monogram shown prominently on the envelope in image 2, with the T on left, N middle, F right, all as one faithfully copied symbol. Keep the existing triNAF CREATIVE wordmark unchanged and match the same gold foil. Image 2 is the exact authoritative TNF monogram reference; do not simplify it to N. Keep every other element of image 1 identical: envelope geometry, filigree, lanterns, ribbon, rock, framing, lighting, backdrop. No added text or objects. This is a local brand-mark correction only.
