import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
const { lintSlides, parseText } = createRequire(import.meta.url)('../skill/plinth/scripts/lint-core.js');
const kinds = r => r.issues.map(i => i.kind);

test('topic label headline is flagged', () => {
  assert.ok(kinds(lintSlides([{ headline: 'The Problem', body: '' }])).includes('headline'));
});
test('claim headline passes', () => {
  assert.equal(lintSlides([{ headline: 'Merchants lose a day waiting for card payouts', body: '' }]).score, 100);
});
test('filler words caught in all inflections', () => {
  for (const w of ['revolutionizing', 'Seamless', 'leveraging', 'next-gen', 'memberdayakan', 'innovation'])
    assert.ok(kinds(lintSlides([{ headline: `We are ${w} things`, body: '' }])).includes('voice'), w);
});
test('plain words are not false positives', () => {
  assert.equal(lintSlides([{ headline: 'We unlocked the door and robustly... no', body: '' }]).issues.filter(i => /robust/.test(i.msg)).length, 0);
});
test('numbers need a source', () => {
  assert.ok(kinds(lintSlides([{ headline: 'Fees are 3% per sale', body: '' }])).includes('evidence'));
  assert.ok(!kinds(lintSlides([{ headline: 'Fees are 3% per sale', body: '', source: 'source: BI' }])).includes('evidence'));
});
test('emoji and exclamation flagged', () => {
  const k = lintSlides([{ headline: 'We ship fast 🚀!', body: '' }]).issues.map(i => i.msg).join();
  assert.match(k, /Emoji/); assert.match(k, /Exclamation/);
});
test('density limits', () => {
  const r = lintSlides([{ headline: 'A claim that holds', body: '- a\n- b\n- c\n- d\n' + 'word '.repeat(45) }]);
  assert.equal(r.issues.filter(i => i.kind === 'density').length, 2);
});
test('parseText splits on --- and reads source lines', () => {
  const s = parseText('One claim\nbody\nsource: X\n---\nTwo claim');
  assert.equal(s.length, 2); assert.equal(s[0].source, 'source: X');
});
test('example decks score 90 or higher', () => {
  for (const d of ['pitch-plinth', 'talk-5428-projects'])
    execFileSync('node', ['skill/plinth/scripts/lint-deck.mjs', `site/decks/${d}.html`]);
});
