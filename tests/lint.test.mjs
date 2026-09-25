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

// ---- multilingual ----
const flagged = (h, body = '') => lintSlides([{ headline: h, body }]).issues.filter(i => i.kind === 'voice').map(i => i.msg);
test('filler caught across languages', () => {
  const cases = {
    id: 'Aplikasi canggih untuk UMKM', ms: 'Platform bertaraf dunia untuk peniaga', es: 'Una plataforma innovadora para tiendas',
    pt: 'Tecnologia de ponta para lojistas', fr: 'Une solution innovante pour les PME', de: 'Eine bahnbrechende Lösung für Händler',
    it: 'Una piattaforma rivoluzionaria per negozi', nl: 'Een baanbrekende app voor winkels', tr: 'Esnaf için yenilikçi bir uygulama',
    vi: 'Giải pháp đột phá cho cửa hàng', hi: 'दुकानदारों के लिए क्रांतिकारी ऐप', ar: 'تطبيق ثوري للتجار', ar2: 'الحل الثوري للتجار',
    ru: 'Революционная платформа для магазинов', ja: '店舗向けの革新的なアプリ', zh: '为商家赋能的平台', zhTW: '顛覆零售的平台',
    ko: '상점을 위한 혁신적인 앱',
  };
  for (const [lang, h] of Object.entries(cases)) assert.ok(flagged(h).length, `${lang}: ${h}`);
});
test('plain sentences in other languages are not flagged', () => {
  const plain = [
    'Pedagang menunggu dua hari untuk pencairan dana', 'Los comercios pagan 3 dólares por transferencia',
    'Les commerçants attendent deux jours leur argent', 'Händler warten zwei Tage auf ihr Geld',
  ];
  for (const h of [...plain, 'Inovasi kecil: kasir mencatat stok sendiri', 'Продавцы ждут деньги два дня', 'Người bán chờ hai ngày để nhận tiền',
    '商家等两天才能收到钱', '店舗は入金まで二日待つ', '상인은 정산까지 이틀을 기다린다', 'विक्रेता पैसे के लिए दो दिन इंतज़ार करते हैं', 'التجار ينتظرون يومين لاستلام المال'])
    assert.deepEqual(flagged(h), [], h);
});
test('word boundaries hold for accented and non-Latin scripts', () => {
  assert.deepEqual(flagged('Das Revolutionärsmuseum öffnet um neun'), []); // compound, not the adjective
  assert.deepEqual(flagged('Hojas de pontaria'), []); // "de ponta" must not match inside "de pontaria"
  assert.deepEqual(flagged('Передовица газеты вышла утром'), []); // "editorial", not "advanced"
  assert.equal(flagged('Передовые технологии для магазинов').length, 1);
});
test('CJK headline length counts characters', () => {
  const long = '我们的平台让小商家在一分钟内完成对账并且不需要任何会计知识就可以使用我们的产品';
  const r = lintSlides([{ headline: long, body: '' }]);
  assert.ok(r.issues.some(i => /characters/.test(i.msg)), 'long Chinese headline flagged');
  assert.equal(lintSlides([{ headline: '商家一分钟完成对账', body: '' }]).score, 100);
  assert.equal(lintSlides([{ headline: '店舗は入金まで二日待つ', body: '' }]).score, 100);
});
test('translated topic labels are flagged', () => {
  for (const h of ['Problema', 'Solución', 'Équipe', '市场', 'チーム', '문제']) assert.ok(kinds(lintSlides([{ headline: h, body: '' }])).includes('headline'), h);
});
test('full-width exclamation flagged', () => {
  assert.ok(lintSlides([{ headline: '今すぐ始めよう！', body: '' }]).issues.some(i => /Exclamation/.test(i.msg)));
});
