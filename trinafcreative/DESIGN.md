---
name: triNAF Creative
description: Cinematic black and warm gold for an interactive print and design catalog.
colors:
  ink: "#0b0c0c"
  surface: "#111313"
  gold: "#e6b879"
  paper: "#f5f1e9"
  muted: "#bbb7af"
  line: "#3d3429"
  catalog-paper: "#efebe3"
  catalog-ink: "#28241e"
  gold-hover: "#f2cd9b"
typography:
  display:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(48px,4.9vw,77px)"
    fontWeight: 800
    lineHeight: 1.01
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "clamp(34px,3.3vw,50px)"
    fontWeight: 400
    lineHeight: 1.14
    letterSpacing: "-0.03em"
  body:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.65
  title:
    fontFamily: "Manrope, sans-serif"
    fontSize: "17px"
    fontWeight: 600
    lineHeight: 1.3
  label:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "11px"
rounded:
  field: "5px"
  panel: "9px"
  pill: "30px"
  button: "100px"
spacing:
  section: "80px 6.25%"
  compact-section: "55px 6%"
  button: "13px 26px"
  field: "12px 14px"
  product-gap: "28px"
components:
  button-primary:
    backgroundColor: "{colors.gold}"
    textColor: "#14110d"
    rounded: "{rounded.button}"
    padding: "{spacing.button}"
  button-primary-hover:
    backgroundColor: "{colors.gold-hover}"
  button-outline:
    backgroundColor: "#090b0b60"
    textColor: "{colors.paper}"
    rounded: "{rounded.button}"
    padding: "{spacing.button}"
  enquiry-field:
    backgroundColor: "#161713"
    textColor: "#f0e9dc"
    rounded: "{rounded.field}"
    padding: "{spacing.field}"
  category-selected:
    backgroundColor: "#29251f"
    textColor: "#f5eee4"
    rounded: "{rounded.pill}"
    padding: "8px 12px"
---

# Design System: triNAF Creative

## Overview

**Creative North Star: "The Cinematic Gold Studio"**

The user-pinned black and gold studio reference is the visual authority. Dark, image-led atmosphere frames confident typography and warm gold accents. The lighter catalog creates a practical browsing surface within that world.

**Key Characteristics:**
- Cinematic imagery with dark gradient scrims.
- Warm gold signals emphasis and action.
- Confident sans-serif display paired with editorial serif section headings.
- Open, ruled catalog rows rather than raised cards.

## Colors

Primary: warm gold carries selected emphasis, primary actions and fine line icons. Neutral: ink and surface establish the dark shell; paper and muted provide text hierarchy. Catalog paper and catalog ink invert the reading surface for browsing.

**The Gold Signal Rule.** Use gold for emphasis and action; preserve large quiet dark areas around it.

## Typography

Use Manrope for the hero, wordmark and product titles, Playfair Display for section and package headings, and DM Sans for body text and controls. The hero is bold and tightly tracked; section headings are regular-weight and spacious by comparison. Small uppercase labels use tracked lettering, with most recurring labels at 11px in the final stylesheet cascade. The uppercase discipline line and small section labels are explicit aesthetic overrides retained from the pinned reference.

**The Two Voices Rule.** Preserve the contrast between confident sans-serif display and editorial serif section headings.

## Layout

Desktop sections use the section spacing token; the mobile inset is 6%. The hero places copy on the left and crops the supplied studio image behind the right side. Its desktop mask stays strongly dark through 41% to suppress lettering within the source reference. Current desktop hero height is viewport-relative, bounded between 730px and 920px. Work uses a 31%/69% split; catalog products use four columns, three below 1150px and two below 800px. Packages become a single column below 480px. Contact becomes one column below 800px, and its paired fields stack below 480px.

At 800px the navigation becomes an expandable menu. Service links use seven columns at wide widths, four at intermediate widths, and two below 480px. Honor the later overrides in style.css when inspecting responsive behavior.

## Elevation & Depth

Depth comes from image cropping, dark scrims, radial lighting and tonal surfaces. Components have no box shadows. Hairline borders separate sections and products. Work panels use skewed geometry and expand on hover.

**The Atmospheric Depth Rule.** Let imagery and tonal layering create depth; keep catalog controls and product rows flat.

## Shapes

Actions and search are pill-shaped; enquiry fields have modest corners. Work panels use gently rounded corners with a negative nine-degree skew, counter-skewing their captions. Product rows remain open with top rules rather than enclosing borders.

## Components

Primary actions use solid gold with dark text; secondary actions use a fine warm border and translucent dark fill. Both have a minimum height of 49px, with a more compact header variant. Primary hover lightens the fill; outline hover adds a translucent gold fill.

Category chips use a dark selected pill on the light catalog. Filter changes update pressed states in place after initial rendering to preserve keyboard focus. Service-type filters use a fine underline for selection. Product cards pair a line icon, service label, title, indicative price and underlined Select action. The empty state offers a clear-search-and-filters action.

Search is a transparent rounded field on catalog paper. Enquiry fields use a dark fill and warm fine border. The shared keyboard focus treatment is a two-pixel gold outline with five-pixel offset. Disabled buttons lower opacity to 0.4.

Navigation is quiet text with a gold underline on hover and the current item. The mobile Menu control exposes the navigation and updates its expanded state. Product and package selection fill the enquiry field and move focus there. Enquiry submission reveals a bordered status message; this remains a demo preview and sends or saves nothing.

Motion uses short color and background transitions, a slower expanding work panel, and smooth section navigation. CSS removes transitions and smooth page scrolling for reduced-motion preferences; the selection script currently requests smooth scrolling explicitly.

## Do's and Don'ts

### Do:
- **Do** preserve the supplied cinematic black and gold direction.
- **Do** keep visible copy in English.
- **Do** keep keyboard focus visible and selection states distinguishable.
- **Do** retain the indicative-price and demo-enquiry disclosures.

### Don't:
- **Don't** represent concept imagery as verified client work.
- **Don't** add business claims, credentials or customer proof without evidence.
- **Don't** imply that the demo enquiry is sent or saved.
- **Don't** introduce raised card shadows into the flat catalog.
