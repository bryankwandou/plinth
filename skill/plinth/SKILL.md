---
name: plinth
description: Build slide presentations and hackathon pitch decks that read like a person with an opinion made them — clean corporate layout, one claim per slide, no filler words. Use when the user asks for slides, a deck, a pitch deck, a keynote, a board update, a demo-day or hackathon pitch (Colosseum, Superteam, ETHGlobal), a pitch video script, or says "my slides look AI-generated", "make this deck cleaner", "review my deck", "susun slide", "bikin pitch deck", "presentasi". Outputs a single self-contained HTML deck (arrow keys, print to PDF) plus speaker notes, and lints the copy before handing it over.
---

# Plinth

A deck is an argument with pictures. Every rule below serves that sentence.

## Step 0 — Decide which job this is

Ask at most one question, only if the answer is not in the request:

| Signal | Mode | Read |
|---|---|---|
| hackathon, investors, demo day, grant, "pitch" | **Pitch** | `references/pitch.md` |
| team update, keynote, class, board, workshop, "presentasi" | **Talk** | `references/talk.md` |
| "review", "fix", "why does this look AI" + an existing deck | **Review** | `references/review.md` |

Always read `references/craft.md` (layout and type) and `references/voice.md` (words). They apply to every mode.

Then open `references/scenarios.md` and take the spine for the specific occasion (hackathon video, demo day, seed meeting, accelerator, grant, sales, quarterly update, board, launch keynote, conference talk, lecture, thesis/skripsi defense, lightning talk, all-hands). If the deck is not in English, also read `references/languages.md` for register, number formats and headline length in that language.

## Step 1 — Write the spine before any slide

Write the deck as headlines only, one line each, in a plain list. Read the list top to bottom. If it does not make the whole case on its own, the deck is not ready — fix the list, not the slides.

Headline rules:
- A headline is a full claim with a verb: "Merchants lose 3% of every sale to card fees", not "The Problem".
- 12 words or fewer. If it needs more, it is two slides.
- Section labels ("Problem", "Market", "Team") go in the small eyebrow above the headline, never as the headline.

Show the spine to the user when the stakes are high (investor, judged pitch). For a routine internal deck, go straight on.

## Step 2 — Give each slide one job

For each headline pick exactly one supporting element:
- one number, set large, with its source line underneath
- one chart that proves the headline (see `craft.md` → charts)
- one screenshot or product frame, cropped to the part that matters
- one short list, three items at most
- one quote from a real user, with name and role

Two elements = two slides. Empty space is fine; it is where the eye rests.

## Step 3 — Build the deck

Copy `assets/deck-template.html`, fill the slides, keep its CSS tokens. Do not invent a new visual system per deck; consistency is what reads as professional. Change only `--accent` and the fonts when the user has a brand.

Speaker notes go in `<aside class="notes">` inside each slide: what to say, 40–70 words, written the way the person talks.

## Step 4 — Lint, then fix by hand

Run:

```bash
node scripts/lint-deck.mjs path/to/deck.html
```

It flags filler vocabulary, headline length, slide density, missing sources on numbers, emoji, and exclamation marks. A score below 90 means rewrite, not tweak. Rewrite flagged lines by saying the specific thing instead — never swap one stock phrase for its synonym.

## Step 5 — Hand over

Give the user: the HTML path, how to present (open in browser, `F` fullscreen, arrows, `P` print to PDF), the lint score, and anything you had to guess (a number with no source, a team bio you did not have). Guesses are listed, never hidden.

Offer a PowerPoint copy when the user has to upload a .pptx, edit in PowerPoint/Keynote/Google Slides, or hand the deck to someone who does:

```bash
npm install pptxgenjs            # once
node scripts/to-pptx.mjs path/to/deck.html [out.pptx]
```

The .pptx is editable (real text boxes, same fonts and colors, 16:9, speaker notes kept). Tell the user the fonts (Inter, JetBrains Mono) must be installed on the presenting machine, or PowerPoint will substitute and line breaks may shift. Custom inline layouts beyond the template's classes (eyebrow, h1/h2, p, lists, `.big`, `.stat`, `.quote`/`.who`, `.frame`, `.bar`, `.source`) come through as plain text; check those slides.

## Non-negotiables

- No invented data. A number without a source is marked `[source needed]` on the slide itself.
- No emoji, no exclamation marks, no gradient text, no stock-photo people.
- Font sizes: headline ≥ 40px on a 1280×720 canvas, body ≥ 22px. Anything smaller means too many words.
- 3 minutes of video pitch = 8–11 slides. 20-minute talk = 15–25. More slides with less on each beats the reverse.
