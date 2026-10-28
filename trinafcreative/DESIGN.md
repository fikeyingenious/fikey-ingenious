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
    fontSize: "clamp(48px,4.65vw,76px)"
    fontWeight: 800
    lineHeight: 1.02
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
  panel: "7px"
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

The user-pinned black and gold studio reference is the visual authority. Dark, image-led atmosphere frames confident typography and warm gold accents. The lighter catalog creates a practical browsing surface within that world. The user found the earlier screenshot crop inadequate: purpose-made artwork is now required, with live HTML copy and controls kept separate from imagery.

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

Desktop sections use the section spacing token; the mobile inset is 6%. The hero uses dedicated artwork at `assets/studio-hero-v2.png`, composed as a complete studio scene with quiet space on the left for live copy. Show the camera, print roll and screens together rather than magnifying a screenshot crop. Desktop uses cover sizing at center 53%, with a light-to-dark readability scrim, and a height of `clamp(640px,49vw,810px)`; intermediate desktop widths (801–1200px) use 650px. The desktop headline follows the display token, with 55px at intermediate widths and 80px from 1700px.

At 800px and below, stack copy above the image: the hero has a 930px minimum height, with 570px artwork at the bottom. Phones below 480px use an 885px minimum hero, 445px artwork and 49px headline. Preserve the scene instead of placing the full paragraph over its focal objects.

Work uses a 31%/69% split. Its dedicated four-quarter source is `assets/creative-mediums-v2.png`, rendered at `400% 100%` with horizontal positions 0%, 33.3333%, 66.6667% and 100%. All four panels remain available on phones through horizontal overflow. Catalog products use four columns, three below 1150px and two below 800px. Packages become a single column below 480px. Contact becomes one column below 800px, and its paired fields stack below 480px.

At 800px the navigation becomes an expandable menu. Service links use seven columns at wide widths, four at intermediate widths, and two below 480px. Honor the later overrides in style.css when inspecting responsive behavior.

## Elevation & Depth

Depth comes from purpose-made studio imagery, readability scrims, radial lighting and tonal surfaces. Catalog components have no box shadows; primary-action hover may use a restrained local glow. Hairline borders separate sections and products. Work panels use skewed geometry and expand on hover.

**The Atmospheric Depth Rule.** Let imagery and tonal layering create depth; keep catalog controls and product rows flat.

## Shapes

Actions and search are pill-shaped; enquiry fields have modest corners. Work panels use gently rounded corners with a negative ten-degree skew, counter-skewing their captions. Product rows remain open with top rules rather than enclosing borders.

## Components

Primary actions use solid gold with dark text; secondary actions use a fine warm border and translucent dark fill. Both have a minimum height of 49px, with a more compact header variant. Primary hover lightens the fill; outline hover adds a translucent gold fill.

Category chips use a dark selected pill on the light catalog. Filter changes update pressed states in place after initial rendering to preserve keyboard focus. Service-type filters use a fine underline for selection. Product cards pair a line icon, service label, title, indicative price and underlined Select action. The empty state offers a clear-search-and-filters action.

Search is a transparent rounded field on catalog paper. Enquiry fields use a dark fill and warm fine border. The shared keyboard focus treatment is a two-pixel gold outline with five-pixel offset. Disabled buttons lower opacity to 0.4.

Navigation is quiet text with a gold underline on hover and the current item. Intersection observation updates the current section and its accessible location state as visitors move through the page. The mobile Menu control exposes the navigation and updates its expanded state. Product and package selection fill the enquiry field and move focus there. Enquiry submission reveals a bordered status message; this remains a demo preview and sends or saves nothing.

Motion follows a “creative current”: an original triNAF adaptation of the user's requested smoother, expressive experience, inspired by Lusion, ET Sileent and Codrops. Native CSS, SVG and the Web Animations API provide the effect without GIFs, video downloads or an animation-library dependency. The timings below describe the implementation; they are not a measured frame-rate guarantee.

The hero's gold ribbon travels over nine seconds, its camera scene drifts between scale 1.015 and 1.045 over 18 seconds in alternating directions, and the primary action receives a nine-second reflected-light sweep. Headline lines reveal over 800ms each with an initial 100ms delay and 100ms stagger. The intro resolves over 650ms after 350ms. The gallery reveals once on entering view: 700ms panels staggered by 65ms. Catalog updates fade and resolve a one-pixel blur over 220ms. Entrance begins during setup, with backwards fill holding delayed lines at their initial frame to avoid a visible-to-masked jump. These replace the earlier `studio-reveal` and `copy-reveal` entrances.

A visible Pause motion / Play motion control updates its pressed state and accessible label. Hero loops pause when the user pauses, the hero leaves view, or the document becomes hidden; authored hero entrance animations pause with them. The control does not stop unrelated catalog feedback. Desktop depth responds only to a fine hover pointer above 800px, with a total nine-pixel horizontal and six-pixel vertical range, eased over 900ms. Leaving the hero resets that offset. The ribbon is hidden at tablet and phone widths.

Phone navigation uses 180ms opacity and 300ms transform/visibility transitions. Work interaction uses 650ms geometry, 450ms brightness, 350ms borders and 400ms caption movement. Primary actions use 220ms state transitions and 300ms arrow movement; service icons use a 450ms lift. A restrained primary-action hover shadow is local feedback, not a catalog elevation system.

**The Visitor Control Rule.** Respect reduced motion and explicit pause; decorative movement must not block browsing or enquiry selection.

Reduced-motion preferences remove spatial loops, pointer depth, ribbon, entrance animations and the motion control. Motion preference changes cancel authored Web Animations API effects. CSS removes interaction transitions, while product selection uses instant scrolling and immediate focus instead of the usual smooth scroll and 500ms delay. Gallery labels retain their static counter-skew, while hover movement is suppressed. Navigation remains an ordinary document flow with no scroll interception.

## Do's and Don'ts

### Do:
- **Do** preserve the supplied cinematic black and gold direction.
- **Do** use purpose-made, interface-free artwork with live HTML typography.
- **Do** keep visible copy in English.
- **Do** keep keyboard focus visible and selection states distinguishable.
- **Do** retain the indicative-price and demo-enquiry disclosures.

### Don't:
- **Don't** represent concept imagery as verified client work.
- **Don't** add business claims, credentials or customer proof without evidence.
- **Don't** imply that the demo enquiry is sent or saved.
- **Don't** introduce raised card shadows into the flat catalog.
