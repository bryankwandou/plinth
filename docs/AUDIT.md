# Plinth — Audit

Date: 2026-09-25. Scope: README.md, skill/plinth/SKILL.md, the stated research numbers, and the public market. External claims link to their source. Internal numbers come from README.md. GitHub star counts were read from the GitHub API on the date above.

## 1. The roast

**Verdict: your own research argues against your product.** The README says winners and non-winners had the same one-liner length (13 words) and the same hype-word rate (4%), and concludes that "format is table stakes, and the argument is what wins." Plinth's measurable output is a format linter: word counts, filler words, emoji, exclamation marks. So the data says the thing you lint does not separate winners from losers, and you shipped the linter anyway.

- **The one real gap in the data is not in the product.** The only difference you found was X-account linking (96% vs 80%). Plinth does nothing about building in public. The finding that could have been a feature is a footnote.
- **The research is a correlation, used as if it were a cause.** 363 projects, one ecosystem (Colosseum/Solana), one time window, no control for team quality. "Winners link X" most likely means strong teams also do marketing, not that linking X wins hackathons. Nothing in the README shows the linter score predicting outcomes, because it was never tested against outcomes.
- **Lint 100 is a score you gave yourself.** before.txt 24 → after.txt 100 is a demo, not evidence. Both example decks score 100 on a rubric written by the same author. There is no external judge, no A/B, and no user.
- **Distribution is zero.** `bryankwandou/plinth` has 0 stars. [anthropics/skills](https://github.com/anthropics/skills) has 178,070. Install is `git clone` + `cp -r`. Nobody finds this without a plugin marketplace listing.
- **The moat is a markdown file.** SKILL.md is about 70 lines of opinion that anyone can copy under MIT, and a similar skill already exists: [academic-pptx-skill](https://github.com/Gabberflast/academic-pptx-skill) "enforces action titles, structured argument, exhibit discipline, citation standards."
- **The platform is eating the category.** Anthropic shipped Claude in PowerPoint (research preview Feb 2026, GA May 2026) and opened file creation, including PowerPoint, to free users on 11 Feb 2026 ([gHacks](https://www.ghacks.net/2026/02/23/anthropic-launches-claude-inside-powerpoint-for-ai-powered-slide-creation-and-editing/), [findskill.ai](https://findskill.ai/blog/claude-free-file-creation-2026/), [claude.com](https://claude.com/claude-for-powerpoint)). "One claim per slide" is a prompt instruction, and a prompt instruction is exactly what the platform can absorb for free.
- **The output format is the wrong one for real work.** HTML-only, while investors, companies and accelerators pass around PPTX, Google Slides and PDF. Tome's web-first format that "did not export cleanly to PowerPoint or Keynote" is cited as one reason it died ([Deckary](https://deckary.com/blog/tome-review), [2Slides](https://2slides.com/blog/tome-shut-down-best-alternatives-2026)).
- **The category does not pay.** Tome had millions of users, mostly students, and still shut down on 30 Apr 2025 because "almost nobody was willing to pay" ([Deckary](https://deckary.com/blog/tome-review), [Autoppt](https://autoppt.com/blog/tome-app-pivot-away-from-presentations/)). Plinth's niche, hackathon builders, pays even less.
- **Visual sameness is sold as a feature.** "Do not invent a new visual system per deck." If a judge sees ten Plinth decks in one batch, the house style becomes the new AI tell.
- **The linter rules clash with your own spine.** "12 words or fewer" per headline, while the measured winner median one-liner is 13 words. Minor, but it shows the thresholds are taste, not data.
- **The Indonesian angle is buried.** "susun slide" and "presentasi" sit in the trigger list, and voice.md covers Indonesian filler. That is the one thing the global tools below do not advertise, and the positioning never mentions it.

### Scorecard (roast-my-product rubric, adapted: "crypto necessity" is scored as "why a skill and not an app")

| Dimension | Score | Why |
|---|---|---|
| Value proposition (2x) | 4/10 | "Cleaner, less AI-sounding decks" is real pain; the product's own data says it does not decide outcomes |
| Why a skill, not an app | 6/10 | Runs inside Claude Code at no cost beyond Claude itself; also why it is trivially copied |
| Target user clarity | 4/10 | Hackathon teams + keynotes + board updates + Indonesian meetings = four audiences |
| First-time experience | 4/10 | Manual clone/copy; no plugin install; no sample prompt output in the terminal |
| Core loop | 5/10 | Spine → build → lint is sound; nothing brings a user back after the pitch |
| Moat | 2/10 | MIT markdown + a regex linter |
| Technical execution | 6/10 | Shared lint core for CLI and web, CI exit code, tests exist; HTML-only output |
| Naming and messaging | 5/10 | "Plinth" says nothing about decks; the README leads with install, not outcome |
| Monetization | 1/10 | None, and the comparable market shows people do not pay for this |
| Timing | 3/10 | Late: Gamma at scale, Anthropic native PPTX, Tome already dead |
| **Weighted total** | **36/100** | |

## 2. Competitive landscape

| Product | What it is | Price (sourced) | Scale / status (sourced) | Where it beats Plinth | Where Plinth differs |
|---|---|---|---|---|---|
| [Gamma](https://en.wikipedia.org/wiki/Gamma_(app)) | Prompt → deck/doc/site in "cards" | Free (400 credits), paid tiers up to Ultra ([Flowith](https://flowith.io/blog/gamma-app-pricing-2026-free-vs-plus-vs-pro/), [eesel](https://www.eesel.ai/blog/gamma-pricing)) | 70M+ users, $100M+ ARR, $68M Series B Nov 2025 ([Wikipedia](https://en.wikipedia.org/wiki/Gamma_(app))) | Distribution, visuals, sharing, analytics | Argument-first rules, source-required numbers, linter |
| [Beautiful.ai](https://www.beautiful.ai/pricing) | Smart-layout slides with AI generation | Pro $12/mo annual; Team $40/user/mo annual; $45 one-off deck ([beautiful.ai](https://www.beautiful.ai/pricing), [presentations.ai](https://www.presentations.ai/blog/beautiful-ai-pricing)) | Paid-only, 14-day trial with card | PPTX import/export, team themes | Free, runs inside Claude Code |
| [Tome](https://deckary.com/blog/tome-review) | AI storytelling slides | n/a | Shut down 30 Apr 2025; team pivoted to Lightfield CRM ([Deckary](https://deckary.com/blog/tome-review)) | — | Cautionary tale: users, no revenue |
| [Pitch.com](https://help.pitch.com/en/articles/13621309-pitch-plans-and-pricing) | Collaborative deck editor with AI | Free (5 members, 100 AI credits); Plus/Team/Business $10/$15/$20 per seat annual ([Pitch help](https://help.pitch.com/en/articles/13621309-pitch-plans-and-pricing)) | — | Real-time collaboration, pitch templates | Content discipline, not editing |
| [Canva Magic Design](https://www.canva.com/help/using-magic-presentations/) | Prompt → deck inside Canva | Premium AI, counts toward monthly usage ([Canva help](https://www.canva.com/help/using-magic-presentations/)) | Magic Studio used 5B+ times ([OpenAI](https://openai.com/index/canva/)) | Asset library, brand kits, reach | No stock visuals, argument rules |
| [Claude in PowerPoint / Claude file creation](https://claude.com/claude-for-powerpoint) | Native Claude slides in PPTX | Included in Claude plans; file creation free since 11 Feb 2026 ([findskill.ai](https://findskill.ai/blog/claude-free-file-creation-2026/)) | GA May 2026 ([Deckary](https://deckary.com/blog/claude-review)) | Native PPTX, respects company masters | Opinionated rules + linter; the platform can add these any time |
| [Anthropic pptx skill](https://github.com/anthropics/skills) | Official PPTX-generation skill | Free | repo 178,070 stars (GitHub API) | PPTX output, design QA pipeline ([powerpoint.md](https://powerpoint.md/skills/anthropic-pptx.html)) | Plinth writes the argument; could sit on top |
| [academic-pptx-skill](https://github.com/Gabberflast/academic-pptx-skill) | Community Claude skill for academic talks | Free | — | Same "action titles, structured argument" thesis, PPTX via the official skill | Pitch/hackathon focus, linter |
| [Slidev](https://github.com/slidevjs/slidev) | Markdown + Vue slides for developers | Free, MIT | 48,837 stars (GitHub API) | Mature, themes, code demos | Writes the content; Slidev only renders it |
| [reveal.js](https://github.com/hakimel/reveal.js) | HTML presentation framework | Free, MIT | 72,346 stars (GitHub API) | Ecosystem, plugins, export | Same |
| [Marp](https://github.com/marp-team/marp-cli) | Markdown → slides/PDF/PPTX | Free, MIT | marp-cli 3,834 stars (GitHub API) | PPTX/PDF export from markdown | Same |

Read of the table: renderers are commoditised and free, AI generators are funded and at scale, and Anthropic now ships decks natively. The only open slot is the thing none of them sell: a checker that tells you your argument is weak. Plinth half-owns that slot with a word linter; it does not yet check arguments.

## 3. Business Model Canvas

| Block | Current state | Gap |
|---|---|---|
| **Customer segments** | Hackathon teams (Colosseum, Superteam, ETHGlobal); founders; people giving talks; Indonesian speakers | Too broad; no segment verified with a single user |
| **Value propositions** | Headline-first spine, one job per slide, no invented data, lint score, single HTML file | Value is unproven against outcomes; "less AI-sounding" is a vanity metric unless judges agree |
| **Channels** | GitHub repo, plinthdeck.vercel.app with in-browser linter, example decks | No plugin marketplace listing, no awesome-list entry, 0 stars |
| **Customer relationships** | Self-serve, open source | No feedback loop, no issues, no community |
| **Revenue streams** | None | Candidates below; comparable consumer market shows weak willingness to pay ([Tome](https://deckary.com/blog/tome-review)) |
| **Key resources** | SKILL.md + references, lint-core.js, Colosseum dataset snapshot | Dataset access depends on a Colosseum Copilot token; snapshot will age |
| **Key activities** | Maintaining rules, linter, templates; research refresh | No evaluation pipeline to prove the rules |
| **Key partners** | Anthropic (skill platform), Colosseum (data), Vercel (hosting) | Each partner can replace or shut off the part it supplies |
| **Cost structure** | Author time, free hosting | Low cost, and low defensibility for the same reason |

## 4. SWOT

| Strengths | Weaknesses |
|---|---|
| Clear, strict method (spine first, one claim per slide) | Output is HTML only; no PPTX/Google Slides |
| Linter shared by CLI, CI and website | Linter checks words, not argument quality |
| Refuses invented data; marks `[source needed]` | Own research shows format does not separate winners |
| Indonesian filler-word coverage | 0 stars, manual install, no users on record |
| Free, runs inside Claude Code | Copyable in an afternoon |

| Opportunities | Threats |
|---|---|
| Argument checker nobody sells (claim → evidence → source) | Anthropic native PPTX and in-app Claude ([claude.com](https://claude.com/claude-for-powerpoint)) |
| Sit on top of the official pptx skill instead of competing | Gamma's scale and funding ([Wikipedia](https://en.wikipedia.org/wiki/Gamma_(app))) |
| Hackathon organisers as a channel (submission pre-check) | Category pays poorly ([Tome shutdown](https://deckary.com/blog/tome-review)) |
| Indonesian / Bahasa-first positioning | Skills are easy to clone; a better-known author ships the same idea |
| Build-in-public checklist (the one real gap in your data) | Uniform house style becomes a recognisable tell |

## 5. Top risks

1. **Irrelevance by platform.** Claude already produces PPTX for free users; if Anthropic adds "action title" guidance to its own skill, Plinth has no remaining reason to install.
2. **Thesis risk.** If lint score does not correlate with judging outcomes, the headline feature is cosmetic. This has not been tested.
3. **Data risk.** The 96% vs 80% and 13-word figures come from one 363-project sample, pulled on one day. Presenting them as findings without confidence intervals invites the first critic to dismiss the whole project.
4. **Format risk.** HTML-only excludes most investor and corporate workflows.
5. **Zero-revenue risk.** No monetization and a comparable (Tome) that failed to monetize millions of users.
6. **Dependency risk.** Colosseum Copilot token and the Claude skill format are both controlled by third parties.

## 6. Changes that strengthen the idea

1. **Test the thesis before adding features.** Run lint-core over the full 293 winners vs a matched non-winner set. If scores do not differ, say so in the README and reposition the linter as hygiene, not a win predictor. If they do differ, that result is the product's headline.
2. **Lint the argument, not only the words.** Add checks: every headline is a claim with a verb; every number has a source line; the spine read alone covers problem → proof → ask; the ask slide exists. That is the slot no competitor in section 2 fills.
3. **Ship PPTX and PDF.** Emit the spine and notes into the official Anthropic pptx skill (or Marp, which exports PPTX) instead of maintaining your own renderer. Position Plinth as the writing layer that sits on top.
4. **Turn the X-linking gap into a feature.** Add a pre-submission checklist: X account linked, demo video, repo public, a build-in-public post log. It is the only difference your data found.
5. **Pick one segment.** Hackathon submissions, starting with Colosseum. Drop "board updates" and "keynotes" from the description until one segment has users.
6. **Fix distribution.** Package as a Claude Code plugin, submit to [awesome-claude-skills](https://github.com/travisvn/awesome-claude-skills), and offer the web linter to hackathon organisers as a submission pre-check.
7. **Get external proof.** Five real teams, before/after decks, and one judge's comment beat any self-scored 100.
8. **Publish the research method.** Sample selection, date, query, and the caveat that it is correlation. Replace "96% vs 80%" with the counts behind it.
9. **Let the theme vary.** Two or three layout families so a batch of Plinth decks does not look identical.
10. **Lead with Indonesian.** "Bahasa-first deck linter" is a position the listed competitors do not advertise; test whether it is worth more than the global framing.
11. **Monetization, only after 1–7:** organiser licence for bulk pre-check of submissions, or a paid review service. Do not build billing before a single user exists.
