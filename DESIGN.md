---
name: Aakkagam Games
description: Warm, handmade landing page for free browser board games from ancient traditions
colors:
  ink: "#2b2320"
  paper: "#faf6f0"
  terracotta: "#8b3a2b"
  terracotta-press: "#6f2d21"
  muted-clay: "#6b5f58"
  rule: "#e2d8cc"
  ink-dark: "#ece5df"
  paper-dark: "#1d1917"
  terracotta-dark: "#e0805f"
  terracotta-press-dark: "#e9997c"
  muted-clay-dark: "#a3968e"
  rule-dark: "#332c28"
typography:
  display:
    fontFamily: "Georgia, 'Times New Roman', serif"
    fontSize: "clamp(2.1rem, 5.4vw, 3.1rem)"
    fontWeight: 700
    lineHeight: 1.14
  headline:
    fontFamily: "Georgia, 'Times New Roman', serif"
    fontSize: "clamp(1.5rem, 3vw, 1.85rem)"
    fontWeight: 700
    lineHeight: 1.25
  body:
    fontFamily: "Georgia, 'Times New Roman', serif"
    fontSize: "1rem"
    lineHeight: 1.6
  meta:
    fontFamily: "Georgia, 'Times New Roman', serif"
    fontSize: "0.95rem"
    color: "{colors.muted-clay}"
  small:
    fontFamily: "Georgia, 'Times New Roman', serif"
    fontSize: "0.9rem"
    color: "{colors.muted-clay}"
rounded:
  button: "6px"
spacing:
  gutter: "1.25rem"
  shell: "64rem"
  measure: "40rem"
  game-gap: "clamp(2rem, 4vw, 3.5rem)"
  section-gap: "clamp(2.25rem, 5.5vw, 3.75rem)"
components:
  button-play:
    backgroundColor: "{colors.terracotta}"
    textColor: "{colors.paper}"
    rounded: "{rounded.button}"
    padding: "0.6rem 1.4rem"
  game-block:
    borderTop: "1px solid {colors.rule}"
    paddingBlock: "{spacing.section-gap}"
    backgroundColor: "transparent"
---

# Design System: Aakkagam Games

## 1. Overview

**Creative North Star: "The Sand Kattam"**

A board drawn in warm sand, played with pebbles and tamarind seeds. Everything on this page should feel handmade, warm, and tactile: paper the color of dry sand, ink the color of dark earth, one terracotta accent like fired clay. The page reads the way a good museum label explains an artifact: the object at full size, and a few honest sentences beside it.

The system explicitly rejects the ad-heavy game portal (thumbnail grids, screaming CTAs), the generic SaaS landing template (hero + gradient + feature cards), the dark "gamer" aesthetic (neon on black), and the kids' cartoon site (bubble letters, mascots). Its lightness is literal: one static HTML file, system serif, no JavaScript, no raster images required to render.

**Key Characteristics:**
- Warm tinted neutrals; nothing is pure black or pure white
- One terracotta accent doing all the color work (Restrained strategy)
- A 64rem shell with asymmetric per-game compositions inside it; prose measure never exceeds 40rem
- Boards drawn as line art in SVG, large enough to read as artifacts
- Serif throughout; hierarchy by size and weight, not font changes
- Flat surfaces, hairline rules, no cards, no shadows, no motion

## 2. Colors

Tinted warm neutrals plus a single terracotta accent; the palette of sand, earth, and fired clay.

### Primary
- **Terracotta** (#8b3a2b light / #e0805f dark): the only accent. Links, all h2 headings (including game names), Play button backgrounds, and the small accent marks inside the board drawings. It signals "this is where you act or navigate", nothing else.

### Neutral
- **Ink** (#2b2320 light / #ece5df dark): body text, h1, and every board's stroke color. Dark earth, not black.
- **Paper** (#faf6f0 light / #1d1917 dark): the page background, the Play button's text color, and the fill of the light-side game pieces in the board drawings. Dry sand, not white.
- **Muted Clay** (#6b5f58 light / #a3968e dark): secondary text only (brand line, tagline, per-game meta line, footer).
- **Rule** (#e2d8cc light / #332c28 dark): hairline separators between sections. Never used for text.

### Named Rules
**The Fired Clay Rule.** Terracotta appears on at most 10% of the page: links, h2 headings, Play buttons, and small board accents. If terracotta starts covering backgrounds or large panels, it has escaped the kiln. Board accents are the pressure point, since boards render large: keep them to pieces and marks, never filled regions of the board itself.

**The No Pure Rule.** #000 and #fff are forbidden. Every neutral is tinted toward the warm brown hue.

## 3. Typography

**Display Font:** Georgia (with 'Times New Roman', serif)
**Body Font:** Georgia (same stack; one family throughout)

**Character:** A bookish system serif that reads like printed matter, not an app. Free, instant, and warm; the typographic equivalent of the games themselves.

### Hierarchy
- **Display / h1** (700, `clamp(2.1rem, 5.4vw, 3.1rem)`, 1.14): the page headline, once. Capped at a 32rem measure so it wraps into a solid three-line block rather than one thin line.
- **Headline / h2** (700, `clamp(1.5rem, 3vw, 1.85rem)`, 1.25): set in Terracotta. Carries both game names and section headings; there is one h2 treatment, not two.
- **Body** (400, 1rem, 1.6): all prose, capped at 38rem inside game blocks and 40rem in prose sections, keeping lines near 65 to 70ch.
- **Meta** (400, 0.95rem, Muted Clay): the origin-and-facts line under each game name ("Egypt · two players · about 15 minutes").
- **Small** (400, 0.9rem, Muted Clay): footer.

### Named Rules
**The One Family Rule.** Georgia carries everything. Hierarchy comes from size and weight only; introducing a second family needs a reason as strong as a new game launch.

**The Plain Metadata Rule.** The meta line stays sentence-case Georgia in Muted Clay. No uppercase, no letter-spacing, no monospace. Track-spaced micro-labels next to hairline rules are the editorial-magazine reflex, and this page is a museum label, not a magazine.

## 4. Elevation

Flat and ruled. No box-shadows anywhere; separation comes from generous vertical space and 1px Rule hairlines that span the full shell. Buttons feel like stamped clay: solid, matter-of-fact, no lift or glow.

### Named Rules
**The Sand Is Flat Rule.** A board drawn in sand casts no shadows. Neither does this page.

**The Full-Width Rule Rule.** Every hairline spans the whole 64rem shell, even when the text beside it is capped at 40rem. A rule that stops where the paragraph stops reads as a mistake.

## 5. Components

### Buttons (Play link)
- **Shape:** gently rounded (6px radius)
- **Primary:** solid Terracotta background, Paper text, bold, 0.6rem 1.4rem padding; rendered as an `<a>`, one per game
- **Hover / Active:** darken to Terracotta Press, 0.15s ease-out on background-color only
- **Focus:** 2px Terracotta outline, 2px offset

### Game block
No card. Each game is an `<article>` separated from the last by a full-width hairline, with `clamp(2.25rem, 5.5vw, 3.75rem)` of padding above and below. It holds three parts: the board SVG, a `.game-id` (h2 + meta line), and a `.game-body` (prose + Play link). Below 52em they stack in that order. Above 52em, each game arranges the same three parts differently, driven by its board's real aspect ratio:

- **Senet** (10:3): board spans the full shell, with the id in a 15rem column and the body beside it underneath. The museum-label composition.
- **align3** (2:1, two boards): board in a 22rem left column spanning both rows, id and body stacked to its right.
- **ostomachion** (1:1): mirrored, with a 15rem board column on the right.

Do not normalize these into one shared arrangement. The variation is the point; identical repeated blocks are the game-portal grid this system rejects.

### Board drawings
Inline SVG, `aria-hidden="true"`, stroked in `currentColor` (Ink) with small Terracotta accents for pieces and marks. No fills beyond the pieces.

**The Constant Stroke Rule.** A board's stroke weight should land near 2 to 3 rendered pixels at every viewport. Width-capped boards (align3, ostomachion) get one hardcoded `stroke-width`. The Senet board scales from phone to wide screen, so its weights come from CSS custom properties (`--sw-frame`, `--sw-grid`, `--sw-mark`) that step down at 40em and 64em. Without this the grid turns to faint hairlines on a phone and to heavy marker strokes on a desktop.

**The Borrowed Glyph Rule.** Where a game already draws something, copy its vocabulary rather than inventing a second one. The Senet house marks here (ankh at 15, cut diamond at 26, twin zigzags at 27, three and two strokes at 28 and 29, sun disc at 30) are lifted from the shipped game's own `Board.svelte`.

### Prose sections
Full-width `<section class="prose">` with a hairline top border; direct children capped at 40rem.

### Navigation
No nav bar. The footer repeats the game links in plain text.

### FAQ list
Semantic `<dl>`: bold `<dt>` questions, plain `<dd>` answers, no accordions or toggles.

## 6. Do's and Don'ts

### Do:
- **Do** keep the whole page one static HTML file with inline CSS; no build step, no external fonts, no scripts.
- **Do** give every game exactly one terracotta Play link, with an honest label ("Play Senet free").
- **Do** let each board's real proportions decide its composition.
- **Do** support both schemes via `prefers-color-scheme`; every color has a light and dark value.
- **Do** hold AA contrast in both schemes, including Paper-on-Terracotta button text.
- **Do** let history do the persuading: specific, true detail over superlatives.

### Don't:
- **Don't** reintroduce cards. Bordered, padded, rounded containers around each game are what this layout replaced.
- **Don't** build an "ad-heavy game portal": no thumbnail grids, no screaming CTAs, no clutter.
- **Don't** use the "generic SaaS landing" template: no hero gradients, no feature-card triptychs, no testimonials.
- **Don't** go "dark gamer": no neon on black, no glow effects.
- **Don't** go "kids' cartoon": no bubble letters, no mascots, no primary-color overload.
- **Don't** use #000 or #fff, box-shadows, gradient text, or colored side-stripe borders.
- **Don't** add motion beyond the Play button's background transition; if any is ever added, it must respect `prefers-reduced-motion`.
