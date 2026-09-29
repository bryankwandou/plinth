# Benchmark: what a judged or funded deck contains

Check the spine against these three before building slides. Each missing row is either a slide to add or a line in the hand-over saying why it is missing (no team yet, no traction yet). Never fill a row with invented content.

## Sources

- Colosseum, "How to Win a Colosseum Hackathon" (blog.colosseum.com/how-to-win-a-colosseum-hackathon): the pitch covers "Team background", "Product description", "Why you started building the product", "The potential market opportunity unlocked by your product", "How you will get initial product usage (or if applicable, the traction and user feedback already received)", "How the product works (your demo)"; under 3 minutes.
- Sequoia Capital, "Writing a Business Plan" (sequoiacap.com/article/writing-a-business-plan): Company purpose, Problem, Solution, Why now?, Market potential, Competition / alternatives, Business model, Team, Financials, Vision.
- Airbnb seed deck, 2008 (widely republished; teardown at slidebean.com/blog/airbnb-pitch-deck): real product screenshots on the product slide, market size as nested figures with named sources, competitors placed on a two-axis map, one idea per slide.

- Real Colosseum winner decks, from the public sheet of winning decks (docs.google.com/spreadsheets/d/19BzDy0DoJP3qNlK66qlmzYc8qh4H-zpf3LGialda-a0): Windfall (3rd, Radar, 55 slides) and Moon Boi Universe (4th, Renaissance, 14 slides), read page by page on 2026-09-29. What both do that a template deck does not:
  - one brand colour owns the deck, with the logo on the cover and in the footer of every slide, plus a page number (Windfall: yellow; Moon Boi: black with neon);
  - icons and partner names inside the diagrams (Windfall's flow: Player → Windfall → Sanctum → Jito);
  - real product screens, traction as large numbers, team as faces with one line each;
  - no slide is only words.

## What Plinth does about it

- `<style>:root{--accent:…;--brand:…}</style>` and `<svg id="brandmark" hidden>` at the top of the deck: the template puts the mark, deck name and page number on every slide.
- `section.brand` for the cover, section breaks and discussion questions: full-bleed brand colour with the logo (`<div class="logo"></div>`).
- Icons from the template sprite (`<svg class="ico"><use href="#i-chat"/></svg>`) at the start of every `.flow`, `.tl` and `.cards` item.
- `.cards` for anything listed without numbers: team roles, budget lines, audit findings, learning goals.
- The linter flags every slide that is only words.

## Checklist

| Row | Colosseum | Sequoia | Airbnb 2008 | Plinth component |
|---|---|---|---|---|
| Cover shows the product, not only a title | | Company purpose | Logo + one line | `.split` + `.phone` / `img.shot` |
| Problem with a sourced number | Why you started | Problem | Problem slide | `.hbars`, `.big` |
| Product / how it works | Product, demo | Solution | Screenshots | `.flow`, `.phone`, `img.shot` |
| Why now | | Why now? | | `.tl` |
| Market size, sourced, nested | Market opportunity | Market potential | Nested figures | `.rings` |
| Competition on the buyer's two axes | | Competition | Two-axis map | `.quad`, `table.t` |
| Business model | | Business model | Revenue model | `table.t` |
| First users / traction | Initial usage | | Adoption strategy | `.tl` |
| Team | Team background | Team | Team | photos only if real |
| Ask, with what it buys and by when | | Financials | Financials | `.tl`, `table.t` |

A grant deck swaps market and competition for need, evidence (including evidence against), budget and sustainability. A talk has no checklist; it needs one argument and a closing slide that shows it.

## Illustrations

- A product that exists: screenshot it (`img.shot`), cropped to the part that matters, and check the screenshot says the same thing as the deck. If the live product now does something else, do not use it.
- A product that does not exist yet: draw the real interaction (`.phone` chat or SMS, `.flow`) and caption it "Illustration" or "Design mockup, not yet built".
- Never stock photos of people, never AI-generated scenes, never a logo you are not allowed to use.
