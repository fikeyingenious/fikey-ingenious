# Services extension

Mode: Persuade. Local review draft; no publication requested.

Finalized catalogue, 31 October 2026: Website Design & Development (one-page and multi-page tiers together); Business Email Setup; AI Website Assistant (scoped pilot); Custom Business Systems & Portals; System Improvements & Bug Fixes (assessment fee distinct from repairs); Business Dashboards & Reports (Power BI, custom screens or agreed exports). Standalone automation and integration removed from the headline list. Website care remains an optional add-on. Canonical current copy: research/final-services-copy.md. Pricing remains proposed starting prices for review.

Inherit DESIGN.md, existing typography, unchanged logo and connected black-glass technology workshop. Extend the services block with six purchasable offers and the existing contact form with a local enquiry review. All pricing is proposed and shown as starting prices with boundaries.

Desktop: a readable service list with six visible starting prices beside a generous artwork-and-scope panel. Mobile: a two-column six-option selector followed by the active service. No autoplay selection, scroll hijacking, hover-gated content or concealed pricing. Without JavaScript every offer remains visible.

Signature interaction: selecting a service sends a brief gold connection across its artwork as the scene materialises. Existing near-black ground, silver edges and amber optics connect the service visuals to the hero. All text remains HTML. Images are labelled concept illustrations, never claimed client work.

Motion budget: CSS only, one short arrival per selection and one four-second light pass confined to the visible service image. Pause offscreen and while document is hidden. Reduced motion keeps all content and state changes without scene movement.

Actions scroll to the existing enquiry form and preselect the exact service. They prepare an enquiry; they send nothing. Preserve existing contact details and unrelated sections.

Implementation: `assets/service-explorer.js` scopes the explorer to `.service-offers`; `assets/service-explorer.css` styles its offers and the contact review. The explorer uses a two-column desktop composition and changes to the two-column selector above one content panel at 760px. Artwork remains contained in a 1.65-ratio frame with 14px corners. Manrope headings and prices, DM Sans copy, inherited gold tokens, hairline separators and pill actions preserve the incumbent system.

Enhanced navigation uses tab/tabpanel relationships, a roving tab stop, directional arrows and Home/End; its orientation updates at the mobile breakpoint. All six panels remain available without JavaScript. Enquiry actions preserve an existing message and add the selected service to the form when needed. Global DESIGN.md and `.impeccable/design.json` remain the authority for the shared visual world; this brief records only the services extension.

31 October improvement draft: CMS editor sits under websites. Every offer now includes indicative delivery, ongoing provider costs and handover. Proposed 14-day website/email and 30-day code/reporting defect support is quotation-confirmed. Relevant live website, founder background and explicitly labelled demonstration references distinguish evidence from concept art. AI pilot explicitly has no live demo. Enquiry uses a local review followed by explicit WhatsApp/email links; no backend submission, external auto-navigation or sent claim. Edits invalidate stale review links.

Contact implementation: `assets/site.js` requires a non-blank name and project description, validates email when supplied, writes the review as text and prepares encoded WhatsApp/email destinations. The email field is optional for WhatsApp. Form edits and service selection clear the review and remove its destinations until the visitor reviews again. Delivery facts use a definition list; assurance and review panels stack at 760px and retain the existing dark surfaces, gold focus and pill actions.

User requested removal of the visible Pause motion control. Removed its markup/styles/handler; decorative light now runs once for four seconds instead of looping. Reduced-motion, visibility and offscreen safeguards remain.
