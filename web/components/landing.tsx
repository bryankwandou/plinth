"use client";

import NumberFlow from "@number-flow/react";
import { MotionConfig, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Check, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

import { ScrollArea } from "@/components/ui/scroll-area";
import { InViewNumber } from "@/components/ui/skiper-ui/skiper37";
import { Link000, Link001, Link003 } from "@/components/ui/skiper-ui/skiper40";
import { ProgressiveBlur } from "@/components/ui/skiper-ui/skiper41";
import { TextRoll } from "@/components/ui/skiper-ui/skiper58";
import {
  VideoPlayer,
  VideoPlayerContent,
  VideoPlayerControlBar,
  VideoPlayerMuteButton,
  VideoPlayerPlayButton,
  VideoPlayerSeekBackwardButton,
  VideoPlayerSeekForwardButton,
  VideoPlayerTimeDisplay,
  VideoPlayerTimeRange,
} from "@/components/ui/skiper-ui/skiper67";
import { ScrollProgressRing } from "@/components/ui/skiper-ui/skiper89";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/skiper-ui/skiper101";
import { createAnimation } from "@/components/ui/skiper-ui/skiper26";

/* ------------------------------------------------------------------ */
/* Shared globals from site/i18n.js and site/lint-core.js (unchanged)  */
/* ------------------------------------------------------------------ */
type Issue = { slide: number; kind: string; msg: string };
type Slide = { headline: string; body: string; source: string };
declare global {
  interface Window {
    PLINTH_I18N?: { names: Record<string, string>; rtl: string[]; strings: Record<string, Record<string, string>> };
    PlinthLint?: { parseText: (s: string) => Slide[]; lintSlides: (s: Slide[]) => { score: number; issues: Issue[] } };
  }
}

/* English source strings. Keys match site/i18n.js. */
const EN: Record<string, string> = {
  lg: "Language", th: "Toggle theme",
  n1: "Data", n2: "How it works", n3: "Try the linter", n4: "Examples", n5: "Video",
  h0: "A Claude skill for decks",
  h1: 'Slides that make <span class="u">an argument</span>',
  h2: "Plinth writes your headlines first, gives each slide one job, then checks every word for filler. Built for hackathon pitches, investor decks and talks.",
  c1: "Lint a deck now", c2: "Get the skill", cp: "Copy",
  x1: "Base rate", x2: "What does not matter", x3: "What does", x4: "Takeaway", x5: "median words, both groups",
  m1: "One project in eighteen takes home a prize", m2: "Winners write one-liners as long as everyone else",
  m3: "Winners are far more likely to build in public", m4: "Format is table stakes. The argument wins.",
  d0: "The research", d1: "We compared every Colosseum winner with the projects that did not place",
  d2: "The things people polish most turned out to be identical between the two groups. The rules in Plinth come from what was left.",
  s1: "projects indexed", s2: "prize winners", s3: "win rate", s4: "pitch limit judges enforce",
  b1: "X account linked, winners", b2: "X account linked, others", b3: "Hype words, winners", b4: "Hype words, others",
  src: "Source: Colosseum Copilot API, 363-project sample over 15 category queries, pulled 25 September 2026. Judging guidance from blog.colosseum.com.",
  w0: "How it works", w1: "Headlines first, slides second, lint last",
  t1: "Write the case as claims", p1: "Every headline is a full sentence with a verb. Read top to bottom, the list alone should make your case.",
  t2: "One job per slide", p2: "A number, a chart, a screenshot, or three short points. One HTML file with speaker notes and print to PDF.",
  t3: "Check every word", p3: "Filler, topic-label headlines, crowded slides and numbers without a source get flagged before anyone sees them.",
  l0: "Try it", l1: "Paste your slides and see what a judge will notice",
  l2: 'First line of each slide is the headline. Separate slides with a line of three dashes. Add "source:" under any number. Nothing leaves your browser.',
  pb: "Load a weak deck", pg: "Load the rewrite", pc: "Clear",
  k0: "Examples", k1: "Two decks built with the skill, both scoring 100",
  e1: "What 5,428 hackathon projects say about pitching", e2: "Talk · 9 slides · arrow keys to present",
  e3: "Plinth, pitched with Plinth", e4: "Pitch · 8 slides · honest about zero traction",
  v0: "Walkthrough", v1: "Watch one deck go from outline to a score of 100",
  v2: "A short screen recording: the skill writes the headline spine, builds the slides, then lints and fixes the copy.",
  v3: "Walkthrough video of the Plinth skill.",
  r0: "The rules", r1: "Eight rules the skill will not break",
  q1: "A headline is a claim, never a topic label.", q2: "Twelve words or fewer per headline.",
  q3: "One piece of evidence per slide.", q4: "Every number carries its source.",
  q5: "One accent color, used where the eye should land.", q6: "No emoji, no exclamation marks, no gradient text.",
  q7: "Missing data is marked on the slide, never invented.", q8: "Under three minutes for a hackathon pitch.",
  f1: "Made by Bryan Kwandou. MIT license.",
};

const PRESETS: Record<string, string> = {
  bad: `The Problem
- Seamless onboarding for everyone
- Unlock liquidity
- Empower creators
- Next-gen UX!
---
We are revolutionizing payments with cutting-edge AI
Our market is $4T
---
Why Us
A world-class team leveraging a robust stack`,
  good: `Card fees take 3% of every sale a Makassar warung makes
source: Bank Indonesia MDR schedule, 2025
---
We settle in 400 ms for a flat Rp 200
source: devnet test run, 50 transfers
---
Two founders who ran a warung payments desk for three years`,
  clear: "",
};

const INSTALL = "git clone https://github.com/bryankwandou/plinth && cp -r plinth/skill/plinth ~/.claude/skills/";
const LANG_KEY = "plinth-lang";

/* ------------------------------------------------------------------ */
/* i18n: same rules as the static page (query, localStorage, browser) */
/* ------------------------------------------------------------------ */
function useI18n() {
  const [lang, setLangState] = useState("en");
  const [names, setNames] = useState<Record<string, string>>({ en: "English" });

  const pick = useCallback((v: string | null | undefined): string | null => {
    const I = window.PLINTH_I18N;
    if (!v || !I) return null;
    const LS = Object.keys(I.names);
    const s = String(v).toLowerCase();
    const x = LS.find((k) => k.toLowerCase() === s);
    if (x) return x;
    if (s === "zh-hk" || s === "zh-mo" || s.startsWith("zh-hant")) return "zh-TW";
    if (s.startsWith("zh")) return "zh-CN";
    if (s.startsWith("pt")) return "pt-BR";
    if (s === "fil") return "tl";
    const b = s.split("-")[0];
    return LS.find((k) => k === b) || null;
  }, []);

  const setLang = useCallback(
    (l: string | null, save: boolean) => {
      const I = window.PLINTH_I18N;
      const next = pick(l) || "en";
      const r = document.documentElement;
      r.lang = next;
      r.dir = I?.rtl.includes(next) ? "rtl" : "ltr";
      setLangState(next);
      if (save) {
        try { localStorage.setItem(LANG_KEY, next); } catch {}
      }
    },
    [pick],
  );

  useEffect(() => {
    const I = window.PLINTH_I18N;
    if (I) setNames(I.names);
    let q: string | null = null;
    let s: string | null = null;
    try { q = new URLSearchParams(location.search).get("lang"); } catch {}
    try { s = localStorage.getItem(LANG_KEY); } catch {}
    const nav = (navigator.languages || [navigator.language]).map(pick).find(Boolean);
    setLang(pick(q) || pick(s) || nav || "en", !!pick(q));
  }, [pick, setLang]);

  const t = useCallback(
    (k: string) => {
      const d = typeof window !== "undefined" ? window.PLINTH_I18N?.strings[lang] : undefined;
      return (lang !== "en" && d?.[k]) || EN[k];
    },
    [lang],
  );
  const h = useCallback((k: string) => ({ dangerouslySetInnerHTML: { __html: t(k) } }), [t]);
  return { lang, names, setLang, t, h };
}

/* ------------------------------------------------------------------ */
/* Scroll reveal (same behaviour as the static page)                   */
/* ------------------------------------------------------------------ */
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("seen");
          io.unobserve(e.target);
        }),
      { threshold: 0.2 },
    );
    document.querySelectorAll(".reveal").forEach((e) => io.observe(e));
    const onEnd = (e: TransitionEvent) => {
      const el = e.target as HTMLElement;
      if (el.classList?.contains("seen") && e.propertyName === "opacity") el.style.setProperty("--i", "0");
    };
    document.addEventListener("transitionend", onEnd);
    return () => { io.disconnect(); document.removeEventListener("transitionend", onEnd); };
  }, []);
}
const stagger = (i: number) => ({ "--i": i }) as React.CSSProperties;

/* Pointer-follow highlight on cards */
function onCardMove(e: React.PointerEvent<HTMLElement>) {
  const c = e.currentTarget;
  const r = c.getBoundingClientRect();
  c.style.setProperty("--mx", `${e.clientX - r.left}px`);
  c.style.setProperty("--my", `${e.clientY - r.top}px`);
}

/* ------------------------------------------------------------------ */
/* Pieces                                                              */
/* ------------------------------------------------------------------ */
function ThemeToggle({ label }: { label: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const reduce = useReducedMotion();
  const toggle = () => {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
    if (reduce || !doc.startViewTransition) return setTheme(next);
    // Skiper26 circular view transition, grown from the toggle's corner
    const anim = createAnimation("circle", "top-right");
    let el = document.getElementById("theme-transition-styles") as HTMLStyleElement | null;
    if (!el) {
      el = document.createElement("style");
      el.id = "theme-transition-styles";
      document.head.appendChild(el);
    }
    el.textContent = anim.css;
    doc.startViewTransition(() => setTheme(next));
  };
  return (
    <button type="button" className="theme" onClick={toggle} aria-label={label}>
      <SunMoon className="size-4" aria-hidden="true" />
    </button>
  );
}

function HeroStage({ t }: { t: (k: string) => string }) {
  const [k, setK] = useState(0);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], [0, -54], { clamp: true });
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setK((v) => (v + 1) % 4), 2800);
    return () => clearInterval(id);
  }, [reduce]);
  const on = (i: number) => (i === k ? "mini on" : "mini");
  return (
    <motion.div className="stagebox" aria-label="Example slides" style={reduce ? undefined : { y }}>
      <div className={on(0)}>
        <div className="e">{t("x1")}</div>
        <h3>{t("m1")}</h3>
        <div className="n">5.4%</div>
      </div>
      <div className={on(1)}>
        <div className="e">{t("x2")}</div>
        <h3>{t("m2")}</h3>
        <div className="n">13</div>
        <div className="s">{t("x5")}</div>
      </div>
      <div className={on(2)}>
        <div className="e">{t("x3")}</div>
        <h3>{t("m3")}</h3>
        <div className="bars">
          <i className="hi" style={{ width: "96%" }} />
          <i style={{ width: "80%" }} />
        </div>
      </div>
      <div className={on(3)}>
        <div className="e">{t("x4")}</div>
        <h3>{t("m4")}</h3>
      </div>
      <div className="dots" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <b key={i} className={i === k ? "on" : ""} />
        ))}
      </div>
    </motion.div>
  );
}

function CompareBars({ t }: { t: (k: string) => string }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const rows: [string, number, boolean][] = [["b1", 96, true], ["b2", 80, false], ["b3", 4, true], ["b4", 4, false]];
  return (
    <div className="cmp reveal" ref={ref} style={stagger(3)}>
      {rows.map(([k, w, hi]) => (
        <div className="r" key={k}>
          <span>{t(k)}</span>
          <div className="t"><i className={hi ? "hi" : ""} style={{ width: inView ? `${w}%` : 0 }} /></div>
          <span className="v">{w}%</span>
        </div>
      ))}
    </div>
  );
}

function DeckCard({ href, title, name, sub, i }: { href: string; title: string; name: string; sub: string; i: number }) {
  const fr = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.4);
  useEffect(() => {
    const el = fr.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / 1280));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <a className="deck hl reveal" href={href} onPointerMove={onCardMove} style={stagger(i)}>
      <div className="fr" ref={fr}>
        <iframe src={href} loading="lazy" tabIndex={-1} title={title} style={{ transform: `scale(${scale})` }} />
      </div>
      <div className="m">
        <b>{name}</b>
        <span>{sub}</span>
      </div>
    </a>
  );
}

function Linter({ t }: { t: (k: string) => string }) {
  const [text, setText] = useState(PRESETS.bad);
  const [res, setRes] = useState<{ score: number; issues: Issue[] } | null>(null);
  useEffect(() => {
    const id = setTimeout(() => {
      const L = window.PlinthLint;
      if (!L) return;
      const sl = L.parseText(text);
      setRes(sl.length ? L.lintSlides(sl) : null);
    }, 120);
    return () => clearTimeout(id);
  }, [text]);
  const score = res?.score ?? 0;
  const color = !res ? "var(--ink)" : score >= 90 ? "var(--good)" : score < 60 ? "var(--bad)" : "var(--ink)";
  return (
    <div className="lint reveal" style={stagger(3)}>
      <div>
        <textarea spellCheck={false} aria-label="Slides" value={text} onChange={(e) => setText(e.target.value)} />
        <div className="presets">
          <button type="button" onClick={() => setText(PRESETS.bad)}>{t("pb")}</button>
          <button type="button" onClick={() => setText(PRESETS.good)}>{t("pg")}</button>
          <button type="button" onClick={() => setText(PRESETS.clear)}>{t("pc")}</button>
        </div>
      </div>
      <div className="out" aria-live="polite">
        <div className="score">
          <b style={{ color }}>
            <NumberFlow value={score} locales="en-US" transformTiming={{ duration: 600, easing: "cubic-bezier(.2,.7,.2,1)" }} />
          </b>
          <span>/ 100</span>
        </div>
        <div className="meter"><i style={{ width: `${score}%` }} /></div>
        <div className="relative">
          <ScrollArea className="h-[230px]">
            <ul className="issues">
              {res && res.issues.length === 0 && <li style={{ gridTemplateColumns: "1fr" }}>No issues. Ship it.</li>}
              {res?.issues.map((it, j) => (
                <li key={`${text.length}-${j}`} style={stagger(Math.min(j, 12))}>
                  <span className="sl">slide {it.slide}</span>
                  <span className="kd">{it.kind}</span>
                  <span>{it.msg}</span>
                </li>
              ))}
            </ul>
          </ScrollArea>
          <ProgressiveBlur position="bottom" height="40px" blurAmount="2px" backgroundColor="var(--panel)" />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */
export default function Landing() {
  const { lang, names, setLang, t, h } = useI18n();
  const [copied, setCopied] = useState(false);
  useReveal();

  const copy = () => {
    navigator.clipboard?.writeText(INSTALL).then(
      () => { setCopied(true); setTimeout(() => setCopied(false), 1400); },
      () => {},
    );
  };
  const langs = useMemo(() => Object.entries(names), [names]);

  return (
    <MotionConfig reducedMotion="user">
      <ScrollProgressRing className="hidden md:block" />

      <nav className="pnav">
        <div className="wrap">
          <a className="brand" href="#">
            <img src="/logo.svg" alt="" />
            <span dir="ltr"><TextRoll className="leading-none">Plinth</TextRoll></span>
          </a>
          <div className="links">
            <Link000 href="#data">{t("n1")}</Link000>
            <Link000 href="#how">{t("n2")}</Link000>
            <Link000 href="#try">{t("n3")}</Link000>
            <Link000 href="#decks">{t("n4")}</Link000>
            <Link000 href="#video">{t("n5")}</Link000>
          </div>
          <label className="lang">
            <span className="vh">{t("lg")}</span>
            <select aria-label={t("lg")} value={lang} onChange={(e) => setLang(e.target.value, true)}>
              {langs.map(([k, v]) => (
                <option key={k} value={k} lang={k}>{v}</option>
              ))}
            </select>
          </label>
          <ThemeToggle label={t("th")} />
        </div>
      </nav>

      <header className="phead">
        <div className="wrap hero">
          <div>
            <div className="eyebrow">{t("h0")}</div>
            <h1 className="h1" {...h("h1")} />
            <p className="sub">{t("h2")}</p>
            <div className="cta">
              <a className="btn pri" href="#try">
                <span>{t("c1")}</span>
                <span className="ar" aria-hidden="true">&rarr;</span>
              </a>
              <a className="btn" href="https://github.com/bryankwandou/plinth">{t("c2")}</a>
            </div>
            <div className="install">
              <code>{INSTALL}</code>
              <Tooltip open={copied}>
                <TooltipTrigger asChild>
                  <button type="button" onClick={copy}>{t("cp")}</button>
                </TooltipTrigger>
                <TooltipContent side="top" sideOffset={6}>
                  <Check className="size-3.5" aria-label="Copied" />
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          <HeroStage t={t} />
        </div>
      </header>

      <section id="data" className="psec">
        <div className="wrap">
          <div className="eyebrow reveal" style={stagger(0)}>{t("d0")}</div>
          <h2 className="h2 reveal" style={stagger(1)}>{t("d1")}</h2>
          <p className="lead reveal" style={stagger(2)}>{t("d2")}</p>
          <div className="stats">
            <div className="stat reveal" style={stagger(0)}><b><InViewNumber value={5428} /></b><span>{t("s1")}</span></div>
            <div className="stat reveal" style={stagger(1)}><b><InViewNumber value={293} /></b><span>{t("s2")}</span></div>
            <div className="stat reveal" style={stagger(2)}><b><InViewNumber value={5.4} decimals={1} suffix="%" /></b><span>{t("s3")}</span></div>
            <div className="stat reveal" style={stagger(3)}><b><InViewNumber value={3} suffix=" min" /></b><span>{t("s4")}</span></div>
          </div>
          <CompareBars t={t} />
          <p className="src">{t("src")}</p>
        </div>
      </section>

      <section id="how" className="psec">
        <div className="wrap">
          <div className="eyebrow reveal" style={stagger(0)}>{t("w0")}</div>
          <h2 className="h2 reveal" style={stagger(1)}>{t("w1")}</h2>
          <div className="steps">
            {[["01 · spine", "t1", "p1"], ["02 · build", "t2", "p2"], ["03 · lint", "t3", "p3"]].map(([k, a, b], i) => (
              <div key={k} className="step hl reveal" style={stagger(i)} onPointerMove={onCardMove}>
                <div className="k">{k}</div>
                <h3>{t(a)}</h3>
                <p>{t(b)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="try" className="psec">
        <div className="wrap">
          <div className="eyebrow reveal" style={stagger(0)}>{t("l0")}</div>
          <h2 className="h2 reveal" style={stagger(1)}>{t("l1")}</h2>
          <p className="lead reveal" style={stagger(2)}>{t("l2")}</p>
          <Linter t={t} />
        </div>
      </section>

      <section id="decks" className="psec">
        <div className="wrap">
          <div className="eyebrow reveal" style={stagger(0)}>{t("k0")}</div>
          <h2 className="h2 reveal" style={stagger(1)}>{t("k1")}</h2>
          <div className="decks">
            <DeckCard i={0} href="decks/talk-5428-projects.html" title="Talk deck preview" name={t("e1")} sub={t("e2")} />
            <DeckCard i={1} href="decks/pitch-plinth.html" title="Pitch deck preview" name={t("e3")} sub={t("e4")} />
          </div>
          <p className="note reveal" style={stagger(3)}>
            Editable PowerPoint, speaker notes kept: <a href="decks/talk-5428-projects.pptx" download>talk.pptx</a> ·{" "}
            <a href="decks/pitch-plinth.pptx" download>pitch.pptx</a>. Both HTML decks are hashed on Solana devnet:{" "}
            <a href="anchor.html">check the receipts</a>. The skill ships 14 scenario spines, from a 3-minute hackathon
            video to a board pre-read, and lints copy in 17 languages.
          </p>
        </div>
      </section>

      <section id="video" className="psec">
        <div className="wrap">
          <div className="eyebrow reveal" style={stagger(0)}>{t("v0")}</div>
          <h2 className="h2 reveal" style={stagger(1)}>{t("v1")}</h2>
          <p className="lead reveal" style={stagger(2)}>{t("v2")}</p>
          <div className="vid reveal" style={stagger(3)}>
            <VideoPlayer>
              <VideoPlayerContent
                slot="media"
                src="walkthrough.mp4"
                poster="walkthrough-poster.png"
                preload="metadata"
                playsInline
                aria-label="Plinth walkthrough video"
              />
              <VideoPlayerControlBar>
                <VideoPlayerPlayButton />
                <VideoPlayerSeekBackwardButton />
                <VideoPlayerSeekForwardButton />
                <VideoPlayerTimeRange />
                <VideoPlayerTimeDisplay showDuration />
                <VideoPlayerMuteButton />
              </VideoPlayerControlBar>
            </VideoPlayer>
          </div>
          <p className="note reveal" style={stagger(4)}>{t("v3")}</p>
        </div>
      </section>

      <section id="rules" className="psec">
        <div className="wrap">
          <div className="eyebrow reveal" style={stagger(0)}>{t("r0")}</div>
          <h2 className="h2 reveal" style={stagger(1)}>{t("r1")}</h2>
          <div className="rules">
            {["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8"].map((k, i) => (
              <p key={k} className="reveal" style={stagger(i)}>{t(k)}</p>
            ))}
          </div>
        </div>
      </section>

      <footer className="pfoot">
        <div className="wrap">
          <a className="brand" href="#">
            <img src="/logo.svg" alt="" />
            Plinth
          </a>
          <span>{t("f1")}</span>
          <Link003 href="anchor.html">Devnet receipts</Link003>
          <Link001 href="https://github.com/bryankwandou/plinth">GitHub</Link001>
        </div>
      </footer>
    </MotionConfig>
  );
}
