#!/usr/bin/env node
// Usage: node check-layout.mjs deck.html [more.html...]
// Opens each slide in headless Chrome at 1280x720 and fails if any text or image
// runs off the slide, or if two blocks overlap. Needs puppeteer-core and Chrome.
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { existsSync } from 'node:fs';
const puppeteer = (await import('puppeteer-core').catch(() => null))?.default;
if (!puppeteer) { console.error('npm install puppeteer-core   (once)'); process.exit(2); }
const CHROME = [process.env.CHROME, 'C:/Program Files/Google/Chrome/Application/chrome.exe', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome', '/usr/bin/chromium'].find(p => p && existsSync(p));
const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
let bad = 0;
for (const f of process.argv.slice(2)) {
  const p = await b.newPage(); await p.setViewport({ width: 1280, height: 720 });
  await p.goto(pathToFileURL(resolve(f)).href + '?print', { waitUntil: 'networkidle0' });
  await p.evaluate(() => document.fonts.ready);
  const problems = await p.evaluate(() => {
    const out = [];
    document.querySelectorAll('section').forEach((s, n) => {
      s.classList.add('on');
      const box = s.getBoundingClientRect();
      // leaf blocks that carry visible content
      const els = [...s.querySelectorAll('h1,h2,p,li,img,svg,.big,.hbars,.tl>div,.flow>div,table,.frame,.stat,.phone,.rings,.quad,.foot,.cols,.donut,.iso,.kpis,.stack,.layers,.cards>div')]
        .filter(e => !e.closest('aside') && !e.closest('.pic,.bg') && e.getClientRects().length);
      // A full-bleed photo or screen (.pic, .bg) runs to the slide edge on purpose.
      // Labels drawn inside a picture (map dots, axis names, ring captions) can escape it or collide with each other.
      const labels = [...s.querySelectorAll('.quad .dot,.quad .ax,.rings b,.rings span')];
      for (const l of labels) {
        const r = l.getBoundingClientRect();
        if (r.right > box.right - 8 || r.left < box.left + 8) out.push(`slide ${n + 1}: label "${l.textContent.trim().slice(0, 30)}" runs off the slide`);
        const ring = l.closest('.rings>div');
        if (ring) { const c = ring.getBoundingClientRect(); if (r.left < c.left || r.right > c.right) out.push(`slide ${n + 1}: "${l.textContent.trim().slice(0, 30)}" is wider than its circle`); }
        for (const o of [...labels, ...s.querySelectorAll('h1,h2,p.source,table')]) {
          if (o === l || o.contains(l) || l.contains(o) || o.closest('.rings>div') && o.closest('.rings>div') === ring) continue;
          const c = o.getBoundingClientRect();
          if (Math.min(r.right, c.right) - Math.max(r.left, c.left) > 4 && Math.min(r.bottom, c.bottom) - Math.max(r.top, c.top) > 4)
            out.push(`slide ${n + 1}: label "${l.textContent.trim().slice(0, 30)}" overlaps "${o.textContent.trim().slice(0, 30)}"`);
        }
      }
      for (const e of els) {
        const r = e.getBoundingClientRect();
        if (r.right > box.right - 8 || r.bottom > box.bottom - 8 || r.left < box.left + 8 || r.top < box.top + 8)
          out.push(`slide ${n + 1}: ${e.tagName.toLowerCase()} "${(e.textContent || e.alt || '').trim().slice(0, 40)}" runs off the slide`);
        if (e.scrollWidth > e.clientWidth + 2 && getComputedStyle(e).overflow !== 'visible')
          out.push(`slide ${n + 1}: ${e.tagName.toLowerCase()} text is clipped`);
      }
      // Text a judge cannot read from the back of the room. Small print (sources, captions, axis ticks, labels drawn
      // inside a phone or map) is exempt; everything else is at least 18px.
      const SMALL = '.source,.eyebrow,.foot,.cap,.credit,.axis,.quad,.rings,.phone,th,.mono,.scale,#brandmark';
      for (const e of s.querySelectorAll('*')) {
        if (e.closest('aside') || e.closest(SMALL) || !e.getClientRects().length) continue;
        const own = [...e.childNodes].some(c => c.nodeType === 3 && c.textContent.trim());
        const fs = parseFloat(getComputedStyle(e).fontSize);
        if (own && fs < 18) { out.push(`slide ${n + 1}: "${e.textContent.trim().slice(0, 30)}" is ${fs}px; body text on a slide is 18px or more`); break; }
      }
      // A small visual floating in a large empty slide reads as a template. Measure everything that paints below the
      // headline (text, images, bars, cards) and compare it with the free space between headline and source line.
      if (!s.matches('.photo,.brand,.center')) {
        const h = s.querySelector('h1,h2'), src = s.querySelector('.source'), foot = s.querySelector('.foot');
        const y0 = h ? h.getBoundingClientRect().bottom + 16 : box.top + 64;
        const y1 = (src && src.textContent.trim() ? src.getBoundingClientRect().top : foot ? foot.getBoundingClientRect().top - 12 : box.bottom - 56) - 8;
        const x0 = box.left + 64, x1 = s.matches('.media') ? box.right : box.right - 64;
        let L = 1e9, T = 1e9, R = -1e9, B = -1e9;
        for (const e of s.querySelectorAll('*')) {
          if (e.closest('aside,.foot,.source,.eyebrow,h1,h2,.credit') || !e.getClientRects().length) continue;
          const cs = getComputedStyle(e), r = e.getBoundingClientRect();
          const paints = [...e.childNodes].some(c => c.nodeType === 3 && c.textContent.trim()) || /^(IMG|svg|CANVAS)$/i.test(e.tagName)
            || (cs.backgroundColor !== 'rgba(0, 0, 0, 0)' && r.height > 4) || cs.backgroundImage !== 'none' || parseFloat(cs.borderTopWidth) > 1;
          if (!paints || r.bottom < y0 || r.width < 2) continue;
          L = Math.min(L, r.left); T = Math.min(T, Math.max(r.top, y0)); R = Math.max(R, r.right); B = Math.max(B, r.bottom);
        }
        const free = (x1 - x0) * (y1 - y0), used = R > L ? (R - L) * (B - T) : 0;
        if (free > 60000 && used / free < 0.45)
          out.push(`slide ${n + 1}: the picture fills ${Math.round(used / free * 100)}% of the space under the headline; make it bigger or add the photo, screen or chart that proves it`);
      }
      const top = els.filter(e => !els.some(o => o !== e && o.contains(e)));
      // The footer draws its rule 10px above its own box; count the rule as part of it.
      const rect = e => { const r = e.getBoundingClientRect(); return e.matches('.foot') ? { left: r.left, right: r.right, top: r.top - 12, bottom: r.bottom } : r; };
      for (let i = 0; i < top.length; i++) for (let j = i + 1; j < top.length; j++) {
        const a = rect(top[i]), c = rect(top[j]);
        const ox = Math.min(a.right, c.right) - Math.max(a.left, c.left), oy = Math.min(a.bottom, c.bottom) - Math.max(a.top, c.top);
        if (ox > 4 && oy > 4) out.push(`slide ${n + 1}: "${top[i].textContent.trim().slice(0, 30)}" overlaps "${top[j].textContent.trim().slice(0, 30)}"`);
      }
    });
    return out;
  });
  console.log(`${f}: ${problems.length ? problems.length + ' layout problem(s)' : 'layout OK'}`);
  for (const x of problems) console.log('  ' + x);
  bad += problems.length; await p.close();
}
await b.close();
process.exit(bad ? 1 : 0);
