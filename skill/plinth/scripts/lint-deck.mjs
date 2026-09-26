#!/usr/bin/env node
// Usage: node lint-deck.mjs deck.html | slides.txt   [--json]
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const { lintSlides, parseText } = createRequire(import.meta.url)('./lint-core.js');

const file = process.argv[2];
if (!file) { console.error('usage: lint-deck.mjs <deck.html|slides.txt> [--json]'); process.exit(2); }
const raw = readFileSync(file, 'utf8');

const strip = s => s.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/[ \t]+/g, ' ').trim();
let slides;
if (/<section[\s>]/i.test(raw)) {
  slides = [...raw.matchAll(/<section[^>]*>([\s\S]*?)<\/section>/gi)].map(([, s]) => {
    // Notes are spoken, not shown; "specimen" blocks quote bad copy on purpose.
    s = s.replace(/<aside[\s\S]*?<\/aside>/gi, '').replace(/<div class="[^"]*specimen[^"]*">[\s\S]*?<\/div>/gi, '');
    const h = (s.match(/<h[12][^>]*>([\s\S]*?)<\/h[12]>/i) || s.match(/class="quote"[^>]*>([\s\S]*?)<\/p>/i) || [])[1] || '';
    const source = strip((s.match(/class="source"[^>]*>([\s\S]*?)<\//i) || [])[1] || '');
    const body = s.replace(/<h[12][^>]*>[\s\S]*?<\/h[12]>/i, '').replace(/class="(eyebrow|source)"[^>]*>[\s\S]*?</gi, '><')
      .replace(/<li[^>]*>/gi, '\n- ');
    return { headline: strip(h), body: strip(body), source };
  });
} else slides = parseText(raw);

const r = lintSlides(slides);
if (process.argv.includes('--json')) { console.log(JSON.stringify(r, null, 2)); process.exit(0); }
console.log(`${file}\n${r.slides} slides  score ${r.score}/100\n`);
for (const i of r.issues) console.log(`  slide ${String(i.slide).padStart(2)}  ${i.kind.padEnd(9)} ${i.msg}`);
if (!r.issues.length) console.log('  no issues');
// A deck ships as a PDF or .pptx that nobody will edit by hand, so a placeholder is a hard stop at any score.
const holes = r.issues.filter(i => i.kind === 'unfinished');
if (holes.length) console.log(`\nNOT READY: ${holes.length} placeholder(s). Research each one or rewrite the slide so it states only what is known.`);
process.exit(r.score >= 90 && !holes.length ? 0 : 1);
