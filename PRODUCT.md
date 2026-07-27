# Product

## Register

brand

## Users

- Parents and kids wanting a quick two-player game on a single shared phone or tablet.
- Board game hobbyists curious about historic games (Senet, three men's morris, Terni Lapilli, ostomachion).
- Visitors who met Senet somewhere else first: a museum case, a documentary, a Tutankhamun exhibition, and went looking for a way to play it.
- Tamil-heritage visitors who know kattam / aakkagam culturally and search for it by name.
- Search and AI-assistant referrals arriving from queries like "free two player browser game", "what is Terni Lapilli", "play Senet online".

Context: they land once, decide in seconds, and should leave by clicking into a game. The device is often a phone held between two people.

## Product Purpose

The landing page for Aakkagam Games (games.aakkagam.com), a collection of free browser-based board games and puzzles rebuilt from ancient traditions. Three games, all live:

- **Senet** (`/senet/`): the Egyptian race game, 2 players, roughly 10 to 20 minutes.
- **align3** (`/align3/`): three men's morris on the Roman Terni Lapilli circle and Tamil kattam square, 2 players, 2 to 5 minutes.
- **ostomachion** (`/ostomachion/`): Archimedes' 14-piece square dissection puzzle, 1 player, open-ended.

Four boards across three games, since align3 carries two. Primary job: convert a search or AI-referral visit into a click into a game. Secondary: be the canonical, well-structured source (SEO + structured data + llms.txt) for what these games are. Success = visitors start playing.

## Brand Personality

Warm and handmade. Sand-drawn boards, pebbles and tamarind seeds, museum-postcard warmth. Human, unhurried, quietly confident about two thousand years of play. Not corporate, not loud, not childish.

## Anti-references

- Ad-heavy game portals (Poki / CrazyGames): thumbnail grids, screaming CTAs, clutter.
- Generic SaaS landing template: hero + gradient + feature cards + testimonials.
- Dark "gamer" aesthetic: neon on black, RGB glow, esports styling.
- Kids' cartoon site: bubble letters, mascots, primary-color overload.
- Egyptian kitsch, now that Senet is here: no Papyrus-style novelty type, no gold-on-black pharaoh bling, no decorative scarabs. Senet's own marks (the ankh, the water zigzags) appear only where they carry meaning, exactly as the game itself draws them.

## Design Principles

1. **Play is one click away.** Every game gets a clear, honest play link inside its own block; nothing stands between arrival and playing.
2. **Show the board, not a screenshot grid.** Games are presented like artifacts (boards, stones, geometry), not app-store tiles. Each board is drawn at a size where it can actually be read.
3. **Each board sets its own composition.** Senet is 10:3, align3 is 2:1, ostomachion is square. Their real proportions drive the layout, which is what keeps three games from reading as a repeated template.
4. **History earns trust.** Short, true, specific historical detail (Roman paving stones, sand kattam, Tutankhamun's burial goods) does the persuasion; no marketing superlatives.
5. **Small and fast is the brand.** One static HTML file, no build step, no JavaScript, instant load; the page's lightness mirrors the games' lightness.
6. **Content is the SEO.** Real prose, FAQs, and structured data over keyword stuffing; the page should read well to a person and an LLM alike.

## Accessibility & Inclusion

WCAG AA: AA contrast in both light and dark schemes, keyboard-navigable links, semantic landmarks, `prefers-reduced-motion` respected for any motion added. Readable at default zoom for older visitors; works on small phones held between two players. Board SVGs are decorative (`aria-hidden`); everything they show is also stated in the prose beside them.
